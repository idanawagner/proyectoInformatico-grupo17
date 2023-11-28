class Usuario():
    def __init__(self, username, password, razon_social, cuit, estado):
        self.username = username
        self.password = password
        self.razon_social = razon_social
        self.cuit = cuit
        self.estado = estado

    def to_json(self):
        return {
            'username': self._username,
            'password': self._password,
            'razon_social': self._razon_social,
            'cuit': self._cuit,
            'estado': self._estado,
        }