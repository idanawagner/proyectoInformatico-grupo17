class DetalleFactura():
    def __init__(self, row):
        self._id = row[0]
        self._id_factura = row[1]
        self._id_producto_servicio = row[2]
        self._cantidad = row[3]
        self._subtotal = row[4]

    def to_json(self):
        return {
            'id': self._id,
            'id_factura': self._id_factura,
            'id_producto_servicio': self._id_producto_servicio,
            'cantidad': self._cantidad,
            'subtotal': self._subtotal
        }