from api import app
from api.models.factura import Factura
from api.utils import token_required, user_resource, factura_resource
from flask import request, jsonify
from api.db.db_config import mysql
from api.models.detalle import DetalleFactura

@app.route('/user/<int:id_user>/facturas', methods=['GET'])
@token_required
@user_resource
def get_all_facturas(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM factura WHERE id_usuario = {0}'.format(id_user))
    data = cur.fetchall()
    facturaList = []
    for row in data:
        detalleList = []
        cur.execute('SELECT * FROM detalle_factura WHERE id_factura = {0}'.format(row[0]))
        detalles = cur.fetchall()
        for detalle in detalles:
            objDetalle = DetalleFactura(detalle)
            detalleList.append(objDetalle.to_json())
        objFactura = Factura(row)
        objFactura = objFactura.to_json()
        objFactura["detalle_factura"] = detalleList
        facturaList.append(objFactura)
    return jsonify( facturaList )

@app.route('/user/<int:id_user>/factura/<int:id_factura>', methods=['GET'])
@token_required
@user_resource
@factura_resource
def get_factura(id_user, id_factura):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM factura WHERE id_usuario = {0} AND id = {1}'.format(id_user, id_factura))
    data = cur.fetchone()
    if data:
        detalleList = []
        cur.execute('SELECT * FROM detalle_factura WHERE id_factura = {0}'.format(id_factura))
        detalles = cur.fetchall()
        for detalle in detalles:
            objDetalle = DetalleFactura(detalle)
            detalleList.append(objDetalle.to_json())
        objFactura = Factura(data)
        objFactura = objFactura.to_json()
        objFactura["detalle_factura"] = detalleList
        return jsonify(objFactura)
    return jsonify({'message': 'No se encontro la factura'})

@app.route('/user/<int:id_user>/factura', methods=['POST'])
@token_required
@user_resource
def create_factura(id_user):

    """Obtener los datos del request para la creacion de la factura"""
    fecha = request.get_json()['fecha']
    id_cliente = request.get_json()['id_cliente']
    id_usuario = id_user
    total = request.get_json()['total']
    

    """acceso a BD --> INSERT INTO"""
    cur = mysql.connection.cursor()
    cur.execute('INSERT INTO factura (fecha, id_cliente, id_usuario, total) VALUES (%s, %s, %s, %s)', (fecha, id_cliente, id_usuario, total))
    mysql.connection.commit()

    """obtener el id del registro creado (con MariaDB)"""
    cur.execute('SELECT LAST_INSERT_ID()')
    row = cur.fetchone()
    id = row[0]

    """Obtener los datos del request para la creacion del detalle de la factura"""
    detalle = request.get_json()['detalle_factura']
    if detalle:
        for item in detalle:
            id_producto_servicio = item['id_producto_servicio']
            cantidad = item['cantidad']
            subtotal = item['subtotal']

            """Checkear si es un producto o un servicio"""
            cur.execute('SELECT categoria FROM producto_servicio WHERE id = {0}'.format(id_producto_servicio))
            categoria = cur.fetchone()
            if categoria[0] == 'Producto':
                """Checkear el stock del producto vendido"""
                cur.execute('SELECT stock FROM producto_servicio WHERE id = {0}'.format(id_producto_servicio))
                stock = cur.fetchone()
                if stock[0] < cantidad:
                    return jsonify({'message': 'No hay stock suficiente para realizar la venta', "stock": stock[0]})
            
                """acceso a BD --> INSERT INTO"""
                cur.execute('INSERT INTO detalle_factura (id_factura, id_producto_servicio, cantidad, subtotal) VALUES (%s, %s, %s, %s)', (id, id_producto_servicio, cantidad, subtotal))
                mysql.connection.commit()

                cur.execute('UPDATE producto_servicio SET stock = stock - {0} WHERE id = {1}'.format(cantidad, id_producto_servicio))
                mysql.connection.commit()

            if categoria[0] == 'Servicio':
                """acceso a BD --> INSERT INTO"""
                cur.execute('INSERT INTO detalle_factura (id_factura, id_producto_servicio, cantidad, subtotal) VALUES (%s, %s, %s, %s)', (id, id_producto_servicio, cantidad, subtotal))
                mysql.connection.commit()
    else:
        return jsonify({'message': 'No se puede crear una factura sin detalle'})



    return jsonify({'message': 'factura creada', 'id': id})


#Metodo desarrollado con fines academicos pero no es posible modificar una factura una vez confeccionada, por lo tanto no se implmentara desde el lado del cliente. Se realizaron las pruebas correspondientes en Thunder Client y se obtuvo el resultado esperado.
@app.route('/user/<int:id_user>/factura/<int:id_factura>', methods=['PUT'])
@token_required
@user_resource
@factura_resource
def update_factura(id_user, id_factura):
    fecha = request.get_json()['fecha']
    id_cliente = request.get_json()['id_cliente']
    id_usuario = id_user
    total = request.get_json()['total']

    """acceso a BD --> UPDATE"""
    cur = mysql.connection.cursor()
    cur.execute('UPDATE factura SET fecha = %s, id_cliente = %s, id_usuario = %s, total = %s WHERE id = %s', (fecha, id_cliente, id_usuario, total, id_factura))
    mysql.connection.commit()

    return jsonify({'message': 'factura actualizada'})

#Metodo desarrollado con fines academicos pero no es posible eliminar una factura una vez confeccionada, por lo tanto no se implmentara desde el lado del cliente. Además, esta operación será rechazada por la base de datos debido a que la tabla factura tiene varias claves foraneas. Por este motivo, tampoco se realizaron las pruebas correspondientes en Thunder Client.
@app.route('/user/<int:id_user>/factura/<int:id_factura>', methods=['PATCH'])
@token_required
@user_resource
@factura_resource
def delete_factura(id_user, id_factura):
    cur = mysql.connection.cursor()
    cur.execute('DELETE FROM factura WHERE id = {0}'.format(id_factura))
    mysql.connection.commit()
    return jsonify({'message': 'factura eliminada'})


@app.route('/user/<int:id_user>/nota-credito', methods=['POST'])
@token_required
@user_resource
@factura_resource
def create_nota_de_credito(id_user):

    # y si usamos el crear factura pero desde el front le pasamos estado = 0 para la factura id = xx y los montos en negativo?
     

    """Obtener los datos del request para la creacion de la factura"""
    fecha = request.get_json()['fecha']
    id_cliente = request.get_json()['id_cliente']
    id_usuario = id_user
    total = request.get_json()['total']
    

    """acceso a BD --> INSERT INTO"""
    cur = mysql.connection.cursor()
    cur.execute('INSERT INTO factura (fecha, id_cliente, id_usuario, total) VALUES (%s, %s, %s, %s)', (fecha, id_cliente, id_usuario, total))
    mysql.connection.commit()

    """obtener el id del registro creado (con MariaDB)"""
    cur.execute('SELECT LAST_INSERT_ID()')
    row = cur.fetchone()
    id = row[0]

    """Obtener los datos del request para la creacion del detalle de la factura"""
    detalle = request.get_json()['detalle_factura']
    if detalle:
        for item in detalle:
            id_producto_servicio = item['id_producto_servicio']
            cantidad = item['cantidad']
            subtotal = item['subtotal']

            """Checkear si es un producto o un servicio"""
            cur.execute('SELECT categoria FROM producto_servicio WHERE id = {0}'.format(id_producto_servicio))
            categoria = cur.fetchone()
            if categoria[0] == 'Producto':
                """Checkear el stock del producto vendido"""
                cur.execute('SELECT stock FROM producto_servicio WHERE id = {0}'.format(id_producto_servicio))
                stock = cur.fetchone()
                if stock[0] < cantidad:
                    return jsonify({'message': 'No hay stock suficiente para realizar la venta', "stock": stock[0]})
            
                """acceso a BD --> INSERT INTO"""
                cur.execute('INSERT INTO detalle_factura (id_factura, id_producto_servicio, cantidad, subtotal) VALUES (%s, %s, %s, %s)', (id, id_producto_servicio, cantidad, subtotal))
                mysql.connection.commit()

                cur.execute('UPDATE producto_servicio SET stock = stock - {0} WHERE id = {1}'.format(cantidad, id_producto_servicio))
                mysql.connection.commit()

            if categoria[0] == 'Servicio':
                """acceso a BD --> INSERT INTO"""
                cur.execute('INSERT INTO detalle_factura (id_factura, id_producto_servicio, cantidad, subtotal) VALUES (%s, %s, %s, %s)', (id, id_producto_servicio, cantidad, subtotal))
                mysql.connection.commit()
    else:
        return jsonify({'message': 'No se puede crear una factura sin detalle'})



    return jsonify({'message': 'factura creada', 'id': id})