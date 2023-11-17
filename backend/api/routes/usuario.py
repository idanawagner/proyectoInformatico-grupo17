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