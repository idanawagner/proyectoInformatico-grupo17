class ProductoServicio():
    def __init__(self, row):
        try:
            self._id = row[0]
            self._nombre = row[1]
            self._descripcion = row[2]
            self._precio = row[3]
            if row[5] == 'Producto':
                self._stock = row[4]
            else:
                self._stock = 1
            self._categoria = row[5]
            self._estado = row[6]
            self._id_usuario = row[7]
        except IndexError as e:
            print(f"Error al inicializar Cliente con row: {row}")
            print(f"Detalles del error: {e}")
            raise

    def to_json(self):
        return {
            'id': self._id,
            'nombre': self._nombre,
            'descripcion': self._descripcion,
            'precio': self._precio,
            'stock': self._stock,
            'categoria': self._categoria,
            'estado': self._estado,
            'id_usuario': self._id_usuario
        }
