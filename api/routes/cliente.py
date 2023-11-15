from api import app
from api.models.cliente import Cliente
from api.utils import token_required, client_resource, user_resource
from flask import request, jsonify
from api.db.db_config import mysql

@app.route('/user/<int:id_user>/cliente', methods=['GET'])
@token_required
@user_resource
def get_all_clientes(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM cliente WHERE id_usuario = {0} AND estado = 1'.format(id_user))
    data = cur.fetchall()
    clientList = []
    for row in data:
        objClient = Cliente(row)
        clientList.append(objClient.to_json())
    return jsonify( clientList )

@app.route('/user/<int:id_user>/cliente/<int:id_cliente>', methods=['GET'])
@token_required
@user_resource
@client_resource
def get_cliente(id_user, id_cliente):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM cliente WHERE id_usuario = {0} AND id = {1} AND estado = 1'.format(id_user, id_cliente))
    data = cur.fetchone()
    if data:
        objClient = Cliente(data)
        return jsonify(objClient.to_json())
    return jsonify({'message': 'No se encontro el cliente'})

@app.route('/user/<int:id_user>/cliente', methods=['POST'])
@token_required
@user_resource
def create_cliente(id_user):
    nombre = request.get_json()['nombre'] 
    apellido = request.get_json()['apellido']
    email = request.get_json()['email']
    cuit_cuil = request.get_json()['cuit_cuil']
    telefono = request.get_json()['telefono']
    direccion = request.get_json()['direccion']
    estado = request.get_json()['estado']
    id_usuario = id_user

    """Control si existe el cuit_cuil  y su estado en la BD"""
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM cliente WHERE cuit_cuil = %s', (cuit_cuil,)) 
    row = cur.fetchone() 
    if row: 
        return jsonify({'message': 'cliente ya registrado'}) 
    
    """acceso a BD --> INSERT INTO"""
    cur.execute('INSERT INTO cliente (nombre, apellido, email, cuit_cuil, telefono, direccion,estado, id_usuario) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)', (nombre, apellido, email, cuit_cuil, telefono, direccion, estado, id_usuario))
    mysql.connection.commit()

    """obtener el id del registro creado (con MariaDB)"""
    cur.execute('SELECT LAST_INSERT_ID()') 
    row = cur.fetchone() 
    print(row) 
    id = row[0] 
    return jsonify({'message': 'cliente creado', 'id': id})

@app.route('/user/<int:id_user>/cliente/<int:id_cliente>', methods=['PUT'])
@token_required
@user_resource
@client_resource
def update_cliente(id_user, id_cliente):
    id = id_cliente
    nombre = request.get_json()['nombre'] 
    apellido = request.get_json()['apellido']
    email = request.get_json()['email']
    cuit_cuil = request.get_json()['cuit_cuil']
    telefono = request.get_json()['telefono']
    direccion = request.get_json()['direccion']
    estado = request.get_json()['estado']
    id_usuario = id_user

    """acceso a BD --> UPDATE"""
    cur = mysql.connection.cursor()
    cur.execute('UPDATE cliente SET nombre = %s, apellido = %s, email = %s, cuit_cuil = %s, telefono = %s, direccion = %s, estado = %s, id_usuario = %s WHERE id = %s', (nombre, apellido, email, cuit_cuil, telefono, direccion, estado, id_usuario, id))
    mysql.connection.commit()
    return jsonify({'message': 'cliente actualizado', "id": id, "nombre": nombre, "apellido": apellido, "email": email, "cuit_cuil": cuit_cuil, "telefono": telefono, "direccion": direccion, "estado": estado, "id_usuario": id_usuario})



@app.route('/user/<int:id_user>/cliente/<int:id_cliente>', methods=['PATCH'])
@token_required
@user_resource
@client_resource
def delete_cliente(id_user, id_cliente):
    try:
        cur = mysql.connection.cursor()

        cur.execute('SELECT estado FROM cliente WHERE id_usuario = %s AND id = %s', (id_user, id_cliente))
        row = cur.fetchone()
        estado_cliente = row[0]

        if estado_cliente:
            if estado_cliente == 1:
                cur.execute('UPDATE cliente SET estado = 0 WHERE id = %s', (id_cliente,))
                mysql.connection.commit()
                return jsonify({'message': 'Cliente eliminado', 'id': id_cliente})
            else:
                return jsonify({'message': 'El cliente ya se encuentra eliminado'})
        else:
            return jsonify({'message': 'No se encontro el cliente'})
    except Exception as e:
        return jsonify({'error': 'Ocurrió un error al procesar la solicitud.'})
    finally:
        cur.close()
