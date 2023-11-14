-- Inserción de datos de prueba para la tabla 'usuario'
INSERT INTO `proyecto_informatico`.`usuario` (`username`, `password`, `razon_social`, `CUIT`) VALUES
('usuario1', 'contrasena1', 'RazonSocial1', 123456789),
('usuario2', 'contrasena2', 'RazonSocial2', 987654321),
('usuario3', 'contrasena3', 'RazonSocial3', 456789123);

-- Inserción de datos de prueba para la tabla 'cliente'
INSERT INTO `proyecto_informatico`.`cliente` (`nombre`, `apellido`, `email`, `cuit_cuil`, `telefono`, `direccion`, `id_usuario`) VALUES
('Cliente1', 'Apellido1', 'cliente1@email.com', 111111111, 1234567890, 'Direccion1', 1),
('Cliente2', 'Apellido2', 'cliente2@email.com', 222222222, 9876543210, 'Direccion2', 2),
('Cliente3', 'Apellido3', 'cliente3@email.com', 333333333, 4567890123, 'Direccion3', 3);

-- Inserción de datos de prueba para la tabla 'producto_servicio'
INSERT INTO `proyecto_informatico`.`producto_servicio` (`nombre`, `descripcion`, `precio`, `stock`, `categoria`, `id_usuario`) VALUES
('Producto1', 'Descripcion1', 50, 100, 'Categoria1', 1),
('Producto2', 'Descripcion2', 75, 150, 'Categoria2', 2),
('Producto3', 'Descripcion3', 100, 200, 'Categoria3', 3);

-- Inserción de datos de prueba para la tabla 'factura'
INSERT INTO `proyecto_informatico`.`factura` (`fecha`, `id_cliente`, `id_usuario`, `total`) VALUES
('2023-01-01', 1, 1, 150),
('2023-02-01', 2, 2, 225),
('2023-03-01', 3, 3, 300);

-- Inserción de datos de prueba para la tabla 'detalle_factura'
INSERT INTO `proyecto_informatico`.`detalle_factura` (`id_factura`, `id_producto_servicio`, `cantidad`, `subtotal`) VALUES
(1, 1, 2, 100),
(1, 2, 1, 50),
(2, 2, 3, 225),
(3, 3, 2, 200);
