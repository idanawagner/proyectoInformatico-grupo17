from api.models.detalle import DetalleFactura
class Factura():
    def __init__(self, row):
            self._id = row[0]
            self._fecha = row[1]
            self._id_cliente = row[2]
            self._id_usuario = row[3]
            self._total = row[4]
       
    
    def to_json(self):
        return {
            'id': self._id,
            'fecha': self._fecha,
            'id_cliente': self._id_cliente,
            'id_usuario': self._id_usuario,
            'total': self._total
        }