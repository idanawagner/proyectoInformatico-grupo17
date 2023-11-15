class Cliente():
    def __init__(self, row):
        self._id = row[0]
        self._nombre = row[1]
        self._apellido = row[2]
        self._email = row[3]
        self._cuit_cuil = row[4]
        self._telefono = row[5]
        self._direccion = row[6]
        self._estado = row[7]
        self._id_usuario = row[8]

    def to_json(self):
        return {
            'id': self._id,
            'nombre': self._nombre,
            'apellido': self._apellido,
            'email': self._email,
            'cuit_cuil': self._cuit_cuil,
            'telefono': self._telefono,
            'direccion': self._direccion,
            'estado': self._estado,
            'id_usuario': self._id_usuario
        }

