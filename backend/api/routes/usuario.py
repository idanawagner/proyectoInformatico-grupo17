from api import app
from flask import request, jsonify
from api.db.db_config import mysql
import jwt
import datetime



@app.route('/login', methods=['POST'])
def login():
    auth = request.authorization
    print(auth)
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
    print(row)
    if row:
        return jsonify({'message': 'El usuario existe en la base de datos'}), 401 
    cur.execute('INSERT INTO usuario (username, password, razon_social, cuit_cuil, estado) VALUES (%s, %s, %s, %s, %s)', (username, password, razonSocial, cuit, estado))
    mysql.connection.commit()
    return jsonify({'message': 'Usuario creado correctamente'}), 201