from flask_mysqldb import MySQL
from api import app

# conexion con la base de datos

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'proyecto_informatico'
app.config['MYSQL_PASSWORD'] ='zE((Yd2fCcBjd![Q'
app.config['MYSQL_DB'] = 'proyecto_informatico'

mysql = MySQL(app)
