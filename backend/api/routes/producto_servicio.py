from api import app
from api.models.producto_servicio import ProductoServicio
from api.utils import token_required, user_resource, producto_servicio_resource
from flask import request, jsonify
from api.db.db_config import mysql

@app.route('/user/<int:id_user>/productos_servicios', methods=['GET'])
@token_required
@user_resource
def get_all_productos_servicios(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM producto_servicio WHERE id_usuario = {0} and estado = 1'.format(id_user))
    data = cur.fetchall()
    productList = []
    for row in data:
        objProduct = ProductoServicio(row)
        productList.append(objProduct.to_json())
    return jsonify( productList )

@app.route('/user/<int:id_user>/producto_servicio/<int:id_producto_servicio>', methods=['GET'])
@token_required
@user_resource
@producto_servicio_resource
def get_producto_servicio(id_user, id_producto_servicio):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM producto_servicio WHERE id_usuario = {0} AND id = {1} and estado = 1'.format(id_user, id_producto_servicio))
    data = cur.fetchone()
    if data:
        objProduct = ProductoServicio(data)
        return jsonify(objProduct.to_json())
    return jsonify({'message': 'No se encontro el producto o servicio'})

@app.route('/user/<int:id_user>/producto_servicio', methods=['POST'])
@token_required
@user_resource
def create_producto_servicio(id_user):
    nombre = request.get_json()['nombre'] 
    descripcion = request.get_json()['descripcion']
    precio = request.get_json()['precio']
    categoria = request.get_json()['categoria']
    if categoria == 'Producto':
        stock = request.get_json()['stock']
    else:
        stock = 1
    estado = request.get_json()['estado']
    id_usuario = id_user

    """acceso a BD --> INSERT INTO"""
    cur = mysql.connection.cursor()
    cur.execute('INSERT INTO producto_servicio (nombre, descripcion, precio, stock, categoria, estado, id_usuario) VALUES (%s, %s, %s, %s, %s, %s, %s)', (nombre, descripcion, precio, stock, categoria,estado, id_usuario))
    mysql.connection.commit()

    """obtener el id del registro creado (con MariaDB)"""
    cur.execute('SELECT LAST_INSERT_ID()') 
    row = cur.fetchone() 

    """obtener el registro creado (con MariaDB)"""
    cur.execute('SELECT * FROM producto_servicio WHERE id = {0}'.format(row[0]))
    data = cur.fetchone()
    if data:
        objProduct = ProductoServicio(data)
        return jsonify(objProduct.to_json())
    return jsonify({'message': 'Error en la creacion del producto o servicio'})


@app.route('/user/<int:id_user>/producto_servicio/<int:id_producto_servicio>', methods=['PUT'])
@token_required
@user_resource
@producto_servicio_resource
def update_producto_servicio(id_producto_servicio, id_user):
    id = id_producto_servicio
    nombre = request.get_json()['nombre'] 
    descripcion = request.get_json()['descripcion']
    precio = request.get_json()['precio']
    categoria = request.get_json()['categoria']
    if categoria == 'Producto':
        stock = request.get_json()['stock']
    else:
        stock = 1
    estado = request.get_json()['estado']
    id_usuario = id_user

    """acceso a BD --> UPDATE"""
    cur = mysql.connection.cursor()
    cur.execute('UPDATE producto_servicio SET nombre = %s, descripcion = %s, precio = %s, stock = %s, categoria = %s, estado = %s, id_usuario = %s WHERE id = %s', (nombre, descripcion, precio, stock, categoria, estado, id_usuario, id))
    mysql.connection.commit()

    """obtener el registro creado (con MariaDB)"""
    cur.execute('SELECT * FROM producto_servicio WHERE id = {0}'.format(id))
    data = cur.fetchone()
    if data:
        objProduct = ProductoServicio(data)
        return jsonify(objProduct.to_json())
    return jsonify({'message': 'Error en la actualizacion del producto o servicio'})


@app.route('/user/<int:id_user>/producto_servicio/<int:id_producto_servicio>', methods=['PATCH'])
@token_required
@user_resource
@producto_servicio_resource
def delete_producto_servicio(id_user, id_producto_servicio):
    try:
        cur = mysql.connection.cursor()

        cur.execute('SELECT estado FROM producto_servicio WHERE id_usuario = %s AND id = %s', (id_user, id_producto_servicio))
        row = cur.fetchone()
        estado_producto_servicio = row[0]

        if estado_producto_servicio:
            if estado_producto_servicio == 1:
                cur.execute('UPDATE producto_servicio SET estado = 0 WHERE id = %s', (id_producto_servicio,))
                mysql.connection.commit()
                return jsonify({'message': 'producto o servicio eliminado'})
            else:
                cur.execute('UPDATE producto_servicio SET estado = 1 WHERE id = %s', (id_producto_servicio,))
                mysql.connection.commit()
                return jsonify({'message': 'producto o servicio habilitado'})
        else:
            return jsonify({'message': 'producto o servicio no encontrado'})
    except Exception as e:
        return jsonify({'message': 'Error en la actualizacion del producto o servicio'})



@app.route('/user/<int:id_user>/historial_productos_servicios', methods=['GET'])
@token_required
@user_resource
def get_historial_productos_servicios(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM producto_servicio WHERE id_usuario = {0}'.format(id_user))
    data = cur.fetchall()
    productList = []
    for row in data:
        objProduct = ProductoServicio(row)
        productList.append(objProduct.to_json())
    return jsonify( productList )