-- Cambiar a la base de datos 'proyecto_informatico'
USE `proyecto_informatico`;

-- Insertar datos de prueba en la tabla 'usuario'
INSERT INTO `usuario` (`username`, `password`, `razon_social`, `cuit_cuil`, `estado`) VALUES
('usuario1', 'clave_segura1', 'Empresa A', 12345678901, 1),
('usuario2', 'clave_segura2', 'Empresa B', 98765432109, 1),
('usuario3', 'clave_segura3', 'Empresa C', 34567890123, 0),


-- Insertar datos de prueba en la tabla 'cliente'
INSERT INTO `cliente` (`nombre`, `apellido`, `email`, `cuit_cuil`, `telefono`, `direccion`, `estado`, `id_usuario`) VALUES
('Juan', 'Perez', 'juan.perez@example.com', 12345678901, 5551234, 'Calle 123', 1, 1),
('Maria', 'Lopez', 'maria.lopez@example.com', 98765432109, 5555678, 'Avenida 456', 1, 2),
('Carlos', 'Rodriguez', 'carlos.rodriguez@example.com', 34567890123, 5559876, 'Boulevard 789', 0, 3),
('Jose', 'Gonzalez', 'jose.gonzalez@example.com', 45678901234, 5554321, 'Calle 321', 1, 1),
('Ana', 'Garcia', 'ana.garcia@example.com', 56789012345, 5558765, 'Avenida 654', 0, 2),
('Pedro', 'Martinez', 'pedro.martinez@example.com', 67890123456, 5552345, 'Boulevard 987', 1, 3),
('Lucia', 'Sanchez', 'lucia.sanchez@example.com', 78901234567, 5556789, 'Calle 876', 1, 1),
('Fernando', 'Gomez', 'fernando.gomez@example.com', 89012345678, 5558765, 'Avenida 543', 0, 2),
('Gabriela', 'Diaz', 'gabriela.diaz@example.com', 90123456789, 5554321, 'Boulevard 210', 1, 3),
('Miguel', 'Torres', 'miguel.torres@example.com', 12345678901, 5556789, 'Calle 987', 0, 1),
('Sofia', 'Rivera', 'sofia.rivera@example.com', 23456789012, 5552345, 'Avenida 012', 1, 2),
('Jorge', 'Romero', 'jorge.romero@example.com', 34567890123, 5558765, 'Boulevard 789', 1, 3),
('Andrea', 'Sosa', 'andrea.sosa@example.com', 45678901234, 5554321, 'Calle 456', 0, 1),
('Oscar', 'Alvarez', 'oscar.alvarez@example.com', 56789012345, 5556789, 'Avenida 123', 1, 2),
('Carolina', 'Ruiz', 'carolina.ruiz@example.com', 67890123456, 5552345, 'Boulevard 654', 0, 3);

-- Insertar datos de prueba en la tabla 'producto_servicio'
INSERT INTO `producto_servicio` (`nombre`, `descripcion`, `precio`, `stock`, `categoria`, `estado`, `id_usuario`) VALUES
('Tablet', 'Electronica', 107990, 25, 'Producto', 1, 1),
('Iphone', 'Electronica', 188880, 14, 'Producto', 0, 2),
('Mouse', 'Electronica', 5000, 36, 'Producto', 1, 3),
('Teclado', 'Electronica', 10000, 14, 'Producto', 0, 1),
('Monitor', 'Electronica', 20000, 36, 'Producto', 1, 2),
('Impresora', 'Electronica', 30000, 55, 'Producto', 1, 3),
('Laptop Lenovo', 'Portátil con procesador Intel i5 y 8GB RAM', 150000, 12, 'Producto', 1, 1),
('Laptop Dell', 'Portátil con procesador Intel i7 y 16GB RAM', 170000, 15, 'Producto', 0, 2),
('Laptop HP EliteBook', 'Portátil con procesador Intel i7 y 16GB RAM', 120000, 19, 'Producto', 1, 3),
('Placa de video', 'placa gamer', 70000, 12, 'Producto', 1, 1),
('Desarrollo de UX', 'Consultoría para desarrollo de sitios web', 12390, 1, 'Servicio', 0, 2),
('Desarrollo de Frontend', 'Consultoría para desarrollo de sitios web', 12397, 1, 'Servicio', 1, 3),
('Desarrollo de Backend', 'Consultoría para desarrollo de sitios web', 15780, 1, 'Servicio', 1, 1),
('Desarrollo Web', 'Desarrollo de sitios web', 14000, 1, 'Servicio', 0, 2),
('Desarrollo de Aplicaciones', 'Consultoría para desarrollo de aplicaciones', 13000, 1, 'Servicio', 0, 3),
('Desarrollo de Software', 'Consultoría para desarrollo de software', 11000, 1, 'Servicio', 1, 1),
('Desarrollo de Aplicaciones Móviles', 'Consultoría para desarrollo de aplicaciones móviles', 15963, 1, 'Servicio', 0, 2),
('Software Contable', 'Consultoría', 13050, 1, 'Servicio', 1, 3),
('Software de Ingeniería', 'Consultoría', 25000, 1, 'Servicio', 1, 1),
('Software Aula Virtual', 'Consultoría', 8000, 1, 'Servicio', 1, 2),
('Comunity Manager', 'Asesoría en redes sociales', 7000, 1, 'Servicio', 1, 2),
('Diseño', 'Contenido para redes sociales', 9500, 1, 'Servicio', 0, 3),
('ERP', 'Sofware de gestion integral', 12000, 1, 'Servicio', 1, 1),
('Servidor', 'Almacenamiento en la nube', 8500, 1, 'Servicio', 0, 2),
('Software a Medida', 'Consultoría', 12300, 1, 'Servicio', 1, 3);



-- Insertar datos de prueba en la tabla 'factura' para usuario 1
INSERT INTO `factura` (`fecha`, `id_cliente`, `id_usuario`, `total`) VALUES
('2023-01-01', 1, 1, 2300),
('2023-01-02', 1, 1, 560),
('2023-01-02', 13, 1, 5200),
('2023-01-10', 13, 1, 5800),
('2023-01-08', 4, 1, 1300),
('2023-01-02', 4, 1, 500),
('2023-03-10', 4, 1, 1000),
('2023-04-10', 4, 1, 5600),
('2023-08-10', 10, 1, 750),
('2023-07-10', 10, 1, 6000),
('2023-06-20', 10, 1, 740),
('2023-11-08', 7, 1, 5200),
('2023-01-06', 7, 1, 4500),
('2023-03-10', 7, 1, 800);


-- Insertar datos de prueba en la tabla 'factura' para usuario 2
INSERT INTO `factura` (`fecha`, `id_cliente`, `id_usuario`, `total`) VALUES
('2023-01-06', 14, 2, 520),
('2023-01-04', 14, 2, 3690),
('2023-05-02', 14, 2, 4500),
('2023-01-10', 11, 2, 7850),
('2023-04-08', 11, 2, 4563),
('2023-01-04', 11, 2, 7850),
('2023-04-12', 8, 2, 1200),
('2023-04-10', 8, 2, 7400),
('2023-09-10', 5, 2, 9600),
('2023-07-23', 5, 2, 8300),
('2023-07-20', 5, 2, 7400),
('2023-11-15', 2, 2, 6800),
('2023-03-06', 2, 2, 9700),
('2023-11-10', 2, 2, 7600);


-- Insertar datos de prueba en la tabla 'factura' para usuario 3
INSERT INTO `factura` (`fecha`, `id_cliente`, `id_usuario`, `total`) VALUES
('2023-01-05', 9, 3, 7460),
('2023-06-04', 9, 3, 8500),
('2023-05-15', 9, 3, 1200),
('2023-12-10', 6, 3, 3900),
('2023-03-07', 6, 3, 4760),
('2023-01-05', 12, 3, 7400),
('2023-12-12', 12, 3, 5200),
('2023-04-25', 12, 3, 9500),
('2023-07-10', 3, 3, 1200),
('2023-07-01', 3, 3, 7900),
('2023-06-20', 3, 3, 4100),
('2023-11-19', 15, 3, 3600),
('2023-004-06', 15, 3, 8000),
('2023-11-12', 15, 3, 7000);



-- Insertar datos de prueba en la tabla 'detalle_factura' para usuario 1
INSERT INTO `detalle_factura` (`id_factura`, `id_producto_servicio`, `cantidad`, `subtotal`) VALUES
(32, 1, 2, 215980),
(32, 23, 1, 12000),
(45, 19, 1, 14000),
(45, 16, 1, 11000),
(44, 4, 8, 1230),
(44, 7, 6, 5300),
(40, 19, 1, 25000),
(40, 10, 2, 2560),
(37, 13, 1, 15780);


-- Insertar datos de prueba en la tabla 'detalle_factura' para usuario 1
INSERT INTO `detalle_factura` (`id_factura`, `id_producto_servicio`, `cantidad`, `subtotal`) VALUES
(74, 1, 2, 215980),
(74, 13, 1, 12000),
(74, 10, 1, 14000),
(74, 7, 2, 215980),
(74, 4, 1, 12000),
(75, 1, 4, 215980),
(75, 13, 9, 12000),
(76, 10, 4, 14000),
(76, 7, 8, 215980),
(77, 4, 6, 12000),
(78, 1, 2, 215980),
(78, 13, 1, 12000),
(79, 10, 1, 14000),
(80, 7, 2, 215980),
(80, 4, 1, 12000),
(81, 1, 3, 215980),
(81, 13, 2, 12000),
(81, 10, 4, 14000),
(81, 7, 10, 215980),
(82, 4, 12, 12000),
(83, 1, 14, 215980),
(83, 13, 15, 12000),
(84, 10, 8, 14000),
(84, 7, 6, 215980),
(85, 4, 7, 12000),
(86, 1, 1, 215980),
(87, 13, 4, 12000),
(87, 10, 6, 14000),
(87, 7, 3, 215980);



-- Insertar datos de prueba en la tabla 'detalle_factura' para usuario 2
INSERT INTO `detalle_factura` (`id_factura`, `id_producto_servicio`, `cantidad`, `subtotal`) VALUES
(56, 2, 3, 40000),
(56, 24, 1, 8500),
(56, 5, 10, 200000),
(48, 11, 1, 12390),
(48, 8, 8, 150000),
(47, 11, 1, 12390),
(57, 21, 1, 7000);