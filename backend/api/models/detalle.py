class DetalleFactura():
    def __init__(self, row):
        self.id = row[0]
        self.id_factura = row[1]
        self.id_producto_servicio = row[2]
        self.cantidad = row[3]
        self.subtotal = row[4]

    def to_json(self):
        return {
            'id': self.id,
            'id_factura': self.id_factura,
            'id_producto_servicio': self.id_producto_servicio,
            'cantidad': self.cantidad,
            'subtotal': self.subtotal
        }