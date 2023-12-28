class ProductoServicio():
    def __init__(self, row):
            self._id = row[0]
            self._nombre = row[1]
            self._descripcion = row[2]
            self._imagen = row[3]
            self._precio = row[4]
            self._stock = row[5]
            self._categoria = row[6]
            self._estado = row[7]
            self._id_usuario = row[8]
       

    def to_json(self):
        return {
            'id': self._id,
            'nombre': self._nombre,
            'descripcion': self._descripcion,
            'imagen': self._imagen,
            'precio': self._precio,
            'stock': self._stock,
            'categoria': self._categoria,
            'estado': self._estado,
            'id_usuario': self._id_usuario
        }
