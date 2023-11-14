from functools import wraps
from flask import request, jsonify
import jwt
from api import app
from api.db import mysql
 

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        print(kwargs) 
        token = None
        if 'x-access-token' in request.headers: # si en los headers del request viene el token
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'Falta el token'}), 401
        
        user_id = None
        if 'user_id' in request.headers:
            user_id = request.headers['user_id']

        if not user_id:
            return jsonify({'message': 'Falta el usuario'}), 401


        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"]) # decodifica el token
            token_id = data['id'] # obtiene el id del usuario

            if int(user_id) != int(token_id):
                return jsonify({'message': 'Usuario incorrecto'}), 401

        except Exception as e:
            print(e)
            return jsonify({'message': str(e)}), 401
            
        return func(*args, **kwargs)
    return decorated

def client_resource(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        print("Argumentos en client_resource: ", kwargs)
        id_cliente = kwargs['id_client']
        cur = mysql.connection.cursor() # conexión con la base de datos
        cur.execute('SELECT id_user FROM client WHERE id = {0}'.format(id_cliente)) # ejecuta la consulta  
        data = cur.fetchone()
        if data:
            """print(data)""" # el propietario de cada registro
            id_prop = data[0]
            user_id = request.headers['user_id']
            if int(user_id) != int(id_prop):
                return jsonify({'message': 'No tiene permisos para acceder a este recurso'}), 401


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