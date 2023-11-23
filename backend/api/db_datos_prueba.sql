-- Cambiar a la base de datos 'proyecto_informatico'
USE `proyecto_informatico`;

-- Insertar datos de prueba en la tabla 'usuario'
INSERT INTO `usuario` (`username`, `password`, `razon_social`, `cuit_cuil`, `estado`) VALUES
('usuario1', 'clave_segura1', 'Empresa A', 12345678901, 1),
('usuario2', 'clave_segura2', 'Empresa B', 98765432109, 1),
('usuario3', 'clave_segura3', 'Empresa C', 34567890123, 0);

-- Insertar datos de prueba en la tabla 'cliente'
INSERT INTO `cliente` (`nombre`, `apellido`, `email`, `cuit_cuil`, `telefono`, `direccion`, `estado`, `id_usuario`) VALUES
('Juan', 'Perez', 'juan.perez@example.com', 12345678901, 5551234, 'Calle 123', 1, 1),
('Maria', 'Lopez', 'maria.lopez@example.com', 98765432109, 5555678, 'Avenida 456', 1, 2),
('Carlos', 'Rodriguez', 'carlos.rodriguez@example.com', 34567890123, 5559876, 'Boulevard 789', 0, 3);

-- Insertar datos de prueba en la tabla 'producto_servicio'
INSERT INTO `producto_servicio` (`nombre`, `descripcion`, `precio`, `stock`, `categoria`, `estado`, `id_usuario`) VALUES
('Laptop HP EliteBook', 'Portátil con procesador Intel i7 y 16GB RAM', 1200, 30, 'Producto', 1, 1),
('Camisa de Algodón', 'Camisa color azul marino', 50, 100, 'Producto', 1, 2),
('Consultoría en Desarrollo Web', 'Consultoría para desarrollo de sitios web', 100, 1, 'Servicio', 0, 3);

-- Insertar datos de prueba en la tabla 'factura'
INSERT INTO `factura` (`fecha`, `id_cliente`, `id_usuario`, `total`) VALUES
('2023-01-01', 1, 1, 2400),
('2023-02-01', 2, 2, 150),
('2023-03-01', 3, 3, 50);

-- Insertar datos de prueba en la tabla 'detalle_factura'
INSERT INTO `detalle_factura` (`id_factura`, `id_producto_servicio`, `cantidad`, `subtotal`) VALUES
(1, 1, 2, 2400),
(2, 2, 3, 150),
(3, 3, 1, 50);
