from api import app
from flask import request, jsonify
from api.db.db_config import mysql
import jwt
import datetime
from api.utils import token_required, user_resource

@app.route('/register', methods=['POST'])
def register():
    username = request.get_json()['username']
    password = request.get_json()['password']
    razonSocial = request.get_json()['razon_social']
    cuit = request.get_json()['cuit_cuil']
    estado = request.get_json()['estado']

    """Control: si existe el usuario en la BD"""
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM usuario WHERE cuit_cuil = %s', (cuit,))
    row = cur.fetchone()
    if row:
        return jsonify({'message': 'El usuario existe en la base de datos'}), 401 
    cur.execute('INSERT INTO usuario (username, password, razon_social, cuit_cuil, estado) VALUES (%s, %s, %s, %s, %s)', (username, password, razonSocial, cuit, estado))
    mysql.connection.commit()
    return jsonify({'message': 'Usuario creado correctamente'}), 201


@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    """Control si existe el usuario en la BD"""
    if not auth or not auth.username or not auth.password:
        return jsonify({'message': 'no autorizado'}), 401 
    """Control: existe y coincide en la BD"""
    cur = mysql.connection.cursor() 
    cur.execute('SELECT * FROM usuario WHERE username = %s AND password = %s', (auth.username, auth.password)) 
    row = cur.fetchone()
    if not row:
        return jsonify({'message': 'no autorizado'}), 401
    
    """ El usuario existe y coincide en la BD"""
    
    token = jwt.encode({'id': row[0],
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=100)
                        }, app.config['SECRET_KEY']) 
    return jsonify({'token': token, 'username': auth.username, 'id': row[0]})

@app.route('/user/<int:id_user>', methods=['GET'])
@token_required
@user_resource
def get_user(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM usuario WHERE id = {0}'.format(id_user))
    data = cur.fetchone()
    if data:
        return jsonify({'id': data[0], 'username': data[1], 'razon_social': data[3], 'cuit_cuil': data[4], 'estado': data[5]})
    return jsonify({'message': 'No se encontro el usuario'})

"""Actualizar contraseña"""
@app.route('/user/<int:id_user>/updatePassword', methods=['PATCH'])
@token_required
@user_resource
def updatePassword(id_user):
    password = request.get_json()['password']
    """Control: si existe el usuario en la BD"""
    cur = mysql.connection.cursor()
    cur.execute('SELECT password FROM usuario WHERE id = %s', (id_user,))
    row = cur.fetchone()
    if not row:
        return jsonify({'message': 'El usuario no existe en la base de datos'}), 401
    if password != row[0]:
        return jsonify({'message': 'La contraseña actual no es correcta'}), 401
    """Actualizar contraseña"""
    new_password = request.get_json()['new_password']
    confirm_password = request.get_json()['confirm_password']
    if new_password != confirm_password:
        return jsonify({'message': 'Las contraseñas no coinciden'}), 401
    cur = mysql.connection.cursor()
    cur.execute('UPDATE usuario SET password = %s WHERE id = %s', (new_password, id_user))
    mysql.connection.commit()
    return jsonify({'message': 'Contraseña actualizada correctamente'}), 201