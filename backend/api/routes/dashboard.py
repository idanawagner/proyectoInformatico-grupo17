
from api import app
from api.models.producto_servicio import ProductoServicio
from api.utils import token_required, user_resource, producto_servicio_resource
from flask import request, jsonify
from api.db.db_config import mysql
from datetime import datetime


"""dashboard de stock"""
@app.route('/user/<int:id_user>/stock', methods=['GET'])
@token_required
@user_resource
def get_stock(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT descripcion, stock FROM producto_servicio WHERE id_usuario = {0} and estado = 1 and categoria = "Producto"'.format(id_user))
    data = cur.fetchall()
    productList = []
    stockList = []
    for item in data:
        productList.append(item[0])
        stockList.append(item[1])
    return jsonify({'productos': productList, 'stock': stockList})



""" Dashboard de movimiento de stock """
@app.route('/user/<int:id_user>/movimiento_stock', methods=['GET'])
@token_required
@user_resource
def get_movimiento_stock(id_user):

    """ traer los movimientos de stock desde detalle_factura """
    cur = mysql.connection.cursor()
    cur.execute("""SELECT
                        detalle_factura.id_factura,
                        factura.fecha,
                        producto_servicio.descripcion AS nombre_producto,
                        detalle_factura.cantidad
                    FROM
                        detalle_factura
                    JOIN
                        factura ON detalle_factura.id_factura = factura.id
                    JOIN
                        producto_servicio ON detalle_factura.id_producto_servicio = producto_servicio.id
                    WHERE
                        factura.id_usuario = {0};""".format(id_user))
    data = cur.fetchall()
    fechasList = []
    productosList = []
    cantidadesList = []
    for item in data:
        if item[2] not in productosList:
            productosList.append(item[2])

    for producto in productosList:
        cantidadesList.append([])
        fechasList.append([])
        for item in data:
            if item[2] == producto:
                cantidadesList[productosList.index(producto)].append(item[3])
                fecha = item[1]
                if fecha is not None:
                    fecha = fecha.strftime("%d-%m-%Y")
                    fechasList[productosList.index(producto)].append(fecha)
                else:
                    fechasList[productosList.index(producto)].append('12-12-2099')
    return jsonify({'productos': productosList, 'cantidades': cantidadesList, 'fechas': fechasList})


""" Dashboard de ranking de ventas por producto """
@app.route('/user/<int:id_user>/ranking_ventas_producto', methods=['GET'])
@token_required
@user_resource
def get_ranking_ventas_producto(id_user):
    """ traer los movimientos de stock desde detalle_factura """
    cur = mysql.connection.cursor()
    cur.execute("""SELECT
                        producto_servicio.descripcion AS nombre_producto,
                        SUM(detalle_factura.subtotal) AS total_ventas
                    FROM
                        detalle_factura
                    JOIN
                        producto_servicio ON detalle_factura.id_producto_servicio = producto_servicio.id
                    WHERE
                        producto_servicio.id_usuario = {0} AND
                        producto_servicio.categoria = "Producto"
                    GROUP BY
                        producto_servicio.descripcion
                    ORDER BY
                        total_ventas DESC;""".format(id_user))
    data = cur.fetchall()
    print(data)
    return (jsonify({'data': data}))

""" Dashboard de ranking de ventas por servicio """
@app.route('/user/<int:id_user>/ranking_ventas_servicio', methods=['GET'])
@token_required
@user_resource
def get_ranking_ventas_servicio(id_user):
    """ traer los movimientos de stock desde detalle_factura """
    cur = mysql.connection.cursor()
    cur.execute("""SELECT
                        producto_servicio.descripcion AS nombre_servicio,
                        SUM(detalle_factura.subtotal) AS total_ventas
                    FROM
                        detalle_factura
                    JOIN
                        producto_servicio ON detalle_factura.id_producto_servicio = producto_servicio.id
                    WHERE
                        producto_servicio.id_usuario = {0} AND
                        producto_servicio.categoria = "Servicio"
                    GROUP BY
                        producto_servicio.descripcion
                    ORDER BY
                        total_ventas DESC;""".format(id_user))
    data = cur.fetchall()
    print(data)
    return (jsonify({'data': data}))


""" Dashboard de ranking de ventas por cliente """
@app.route('/user/<int:id_user>/ranking_ventas_cliente', methods=['GET'])
@token_required
@user_resource
def get_ranking_ventas_cliente(id_user):
    """ traer los movimientos de stock desde detalle_factura """
    cur = mysql.connection.cursor()
    cur.execute("""SELECT
                        cliente.nombre,
                        SUM(detalle_factura.subtotal) AS total_ventas
                    FROM
                        detalle_factura
                    JOIN
                        factura ON detalle_factura.id_factura = factura.id
                    JOIN
                        cliente ON factura.id_cliente = cliente.id
                    WHERE
                        factura.id_usuario = {0}
                    GROUP BY
                        cliente.nombre
                    ORDER BY
                        total_ventas DESC;""".format(id_user))
    data = cur.fetchall()
    print(data)
    return (jsonify({'data': data}))


""" Dashboard de historial de ventas"""
@app.route('/user/<int:id_user>/historial_ventas', methods=['GET'])
@token_required
@user_resource
def get_ranking_ventas(id_user):
    """ traer los movimientos de stock desde detalle_factura """
    cur = mysql.connection.cursor()
    cur.execute("""SELECT
                        factura.id AS id_factura,
                        factura.fecha,
                        factura.total,
                        producto_servicio.descripcion AS nombre_producto,
                        detalle_factura.cantidad,
                        detalle_factura.subtotal    
                    FROM
                        detalle_factura
                    JOIN
                        factura ON detalle_factura.id_factura = factura.id
                    JOIN
                        producto_servicio ON detalle_factura.id_producto_servicio = producto_servicio.id
                    WHERE
                        factura.id_usuario = {0};""".format(id_user))
    data = cur.fetchall()
    print(data)
    return (jsonify({'data': data}))

