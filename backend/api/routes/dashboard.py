
from api import app
from api.models.producto_servicio import ProductoServicio
from api.utils import token_required, user_resource, producto_servicio_resource
from flask import request, jsonify
from api.db.db_config import mysql
from datetime import datetime
from collections import defaultdict

def reorganizar_datos(data):
    # Estructura de datos para almacenar la información reorganizada
    reorganizado = defaultdict(lambda: {"fechas": [], "cantidades": []})

    # Iterar sobre los datos originales y organizarlos
    for _, fecha, producto, cantidad in data:
        reorganizado[producto]["fechas"].append(str(fecha))
        reorganizado[producto]["cantidades"].append(cantidad)

    # Convertir la estructura de datos a una lista de diccionarios
    resultado = [{"producto": producto, "fechas": info["fechas"], "cantidades": info["cantidades"]} for producto, info in reorganizado.items()]

    return resultado





"""dashboard de stock"""
@app.route('/user/<int:id_user>/stock', methods=['GET'])
@token_required
@user_resource
def get_stock(id_user):
    cur = mysql.connection.cursor()
    cur.execute('SELECT nombre, stock FROM producto_servicio WHERE id_usuario = {0} and estado = 1 and categoria = "Producto"'.format(id_user))
    data = cur.fetchall()
    productList = []
    stockList = []
    for item in data:
        productList.append(item[0])
        stockList.append(item[1])
    return jsonify({'productos': productList, 'stock': stockList})



""" Dashboard de movimiento de stock """
@app.route('/user/<int:id_user>/movimiento_stock/<int:id_producto>', methods=['GET'])
@token_required
@user_resource
def get_movimiento_stock(id_user, id_producto):

    """ traer los movimientos de stock desde detalle_factura """
    cur = mysql.connection.cursor()
    cur.execute("""SELECT
                        detalle_factura.id_factura,
                        factura.fecha,
                        producto_servicio.nombre,
                        detalle_factura.cantidad
                    FROM
                        detalle_factura
                    JOIN
                        factura ON detalle_factura.id_factura = factura.id
                    JOIN
                        producto_servicio ON detalle_factura.id_producto_servicio = producto_servicio.id
                    WHERE
                        factura.id_usuario = {0} AND
                        detalle_factura.id_producto_servicio = {1}
                    ORDER BY
                        factura.fecha ASC;""".format(id_user, id_producto))
    data = cur.fetchall()
    

    # Llamar a la función con tu variable 'data'
    datos_reorganizados = reorganizar_datos(data)


    
    return jsonify({"data": datos_reorganizados})
    # productosList = []
    # for item in data:
    #     if item[2] not in productosList:
    #         productosList.append(item[2])

    # cantidadesList = []
    # fechasList = []


    # for producto in productosList:
    #     for item in data:
    #         if item[2] == producto:
    #             cantidadesList.append(item[3])
    #             fecha = item[1]
    #             if fecha is not None:
    #                 fecha = fecha.strftime("%d-%m-%Y")
    #                 fechasList.append(fecha)
    #             else:
    #                 fechasList.append('12-12-2099')

    # fechasList = []
    # cantidadesList = []
    # for item in data:
    #     fechasList.append(item[1].strftime("%d-%m-%Y"))
    #     productosList.append(item[2])
    #     cantidadesList.append(item[3])
        #     if item[2] not in productosList:
        #         productosList.append(item[2])

        # for producto in productosList:
        #     cantidadesList.append([])
        #     fechasList.append([])
        #     for item in data:
        #         if item[2] == producto:
        #             cantidadesList[productosList.index(producto)].append(item[3])
        #             fecha = item[1]
        #             if fecha is not None:
        #                 fecha = fecha.strftime("%d-%m-%Y")
        #                 fechasList[productosList.index(producto)].append(fecha)
        #             else:
        #                 fechasList[productosList.index(producto)].append('12-12-2099')
    # return jsonify({'productos': productosList, 'cantidades': cantidadesList, 'fechas': fechasList})
    # return jsonify({'data': data})


""" Dashboard de ranking de ventas por producto """
@app.route('/user/<int:id_user>/ranking_ventas_producto', methods=['GET'])
@token_required
@user_resource
def get_ranking_ventas_producto(id_user):
    """ traer los movimientos de stock desde detalle_factura """
    cur = mysql.connection.cursor()
    cur.execute("""SELECT
                        producto_servicio.nombre,
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
    listProductos = []
    listVentas = []
    for item in data:
        listProductos.append(item[0])
        listVentas.append(item[1])
    return (jsonify({'productos': listProductos, 'ventas': listVentas}))

""" Dashboard de ranking de ventas por servicio """
@app.route('/user/<int:id_user>/ranking_ventas_servicio', methods=['GET'])
@token_required
@user_resource
def get_ranking_ventas_servicio(id_user):
    """ traer los movimientos de stock desde detalle_factura """
    cur = mysql.connection.cursor()
    cur.execute("""SELECT
                        producto_servicio.nombre,
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
    listProductos = []
    listVentas = []
    for item in data:
        listProductos.append(item[0])
        listVentas.append(item[1])
    return (jsonify({'servicios': listProductos, 'ventas': listVentas}))


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
    listClientes = []
    listVentas = []
    for item in data:
        listClientes.append(item[0])
        listVentas.append(item[1])
    return (jsonify({'clientes': listClientes, 'ventas': listVentas}))


""" Dashboard de historial de ventas"""
@app.route('/user/<int:id_user>/historial_ventas', methods=['GET'])
@token_required
@user_resource
def get_ranking_ventas(id_user):
    """ traer los movimientos de stock desde detalle_factura """
    cur = mysql.connection.cursor()
    cur.execute("""SELECT
                        factura.id AS id_factura,
                        factura.fecha AS fecha_factura,
                        factura.total AS total_factura,
                        cliente.nombre AS nombre_cliente,
                        producto_servicio.nombre AS nombre_producto,
                        detalle_factura.cantidad,
                        detalle_factura.subtotal    
                    FROM
                        detalle_factura
                    JOIN
                        factura ON detalle_factura.id_factura = factura.id
                    JOIN
                        producto_servicio ON detalle_factura.id_producto_servicio = producto_servicio.id
                    JOIN
                        cliente ON factura.id_cliente = cliente.id
                    WHERE
                        factura.id_usuario = {0};""".format(id_user))
    data = cur.fetchall()

    return (jsonify({'data': data}))

