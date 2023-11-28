from api.db.db_config import mysql
from api import app
from flask import request, jsonify
from api.utils import token_required, user_resource
from api.models.producto_servicio import Producto
from api.models.cliente import Cliente
from api.models.factura import Factura
from api.models.detalle import DetalleFactura
import datetime
import jwt


"""Dashboar de control de stock"""
@app.route('/dashboard/stock', methods=['GET'])
@token_required
def get_stock():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM producto')
    data = cur.fetchall()
    productos = []
    for row in data:
        objProducto = Producto(row)
        productos.append(objProducto.to_json())
    return jsonify(productos)