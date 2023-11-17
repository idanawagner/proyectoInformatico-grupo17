from functools import wraps
from flask import request, jsonify
import jwt
from api import app
from api.db.db_config import mysql
 

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        print(kwargs) 
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Falta el token'}), 401
        
        user_id = None
        if 'user_id' in request.headers:
            user_id = request.headers['user_id']

        if not user_id:
            return jsonify({'message': 'Falta el usuario'}), 401


        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"]) 
            token_id = data['id'] 

            if int(user_id) != int(token_id):
                return jsonify({'message': 'Usuario incorrecto'}), 401

        except Exception as e:
            print(e)
            return jsonify({'message': str(e)}), 401
            
        return func(*args, **kwargs)
    return decorated

def user_resource(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        print("Argumentos en user_resources: ", kwargs)
        id_user_route = kwargs['id_user']
        user_id = request.headers['user_id']
        if int(user_id) != int(id_user_route):
            return jsonify({'message': 'No tiene permisos para acceder a este recurso'}), 401
        return func(*args, **kwargs)
    return decorated

def client_resource(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        print("Argumentos en client_resource: ", kwargs)
        id_cliente = kwargs['id_cliente']
        cur = mysql.connection.cursor()
        cur.execute('SELECT id_usuario FROM cliente WHERE id = {0}'.format(id_cliente)) 
        data = cur.fetchone()
        if data:
            id_prop = data[0]
            user_id = request.headers['user_id']
            if int(user_id) != int(id_prop):
                return jsonify({'message': 'No tiene permisos para acceder a este recurso'}), 401
        return func(*args, **kwargs)
    return decorated

def  producto_servicio_resource(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        print("Argumentos en producto_servicio_resource: ", kwargs)
        id_producto_servicio = kwargs['id_producto_servicio']
        cur = mysql.connection.cursor()
        cur.execute('SELECT id_usuario FROM producto_servicio WHERE id = {0}'.format(id_producto_servicio)) 
        data = cur.fetchone()
        if data:
            id_prop = data[0]
            user_id = request.headers['user_id']
            if int(user_id) != int(id_prop):
                return jsonify({'message': 'No tiene permisos para acceder a este recurso'}), 401
        return func(*args, **kwargs)
    return decorated

def factura_resource(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        print("Argumentos en factura_resource: ", kwargs)
        id_factura = kwargs['id_factura']
        cur = mysql.connection.cursor()
        cur.execute('SELECT id_usuario FROM factura WHERE id = {0}'.format(id_factura)) 
        data = cur.fetchone()
        if data:
            id_prop = data[0]
            user_id = request.headers['user_id']
            if int(user_id) != int(id_prop):
                return jsonify({'message': 'No tiene permisos para acceder a este recurso'}), 401
        return func(*args, **kwargs)
    return decorated

def detalle_resource(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        print("Argumentos en detalle_resource: ", kwargs)
        id_detalle = kwargs['id_detalle']
        cur = mysql.connection.cursor()
        cur.execute('SELECT id_usuario FROM detalle WHERE id = {0}'.format(id_detalle)) 
        data = cur.fetchone()
        if data:
            id_prop = data[0]
            user_id = request.headers['user_id']
            if int(user_id) != int(id_prop):
                return jsonify({'message': 'No tiene permisos para acceder a este recurso'}), 401
        return func(*args, **kwargs)
    return decorated
