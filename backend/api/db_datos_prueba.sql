-- Cambiar a la base de datos 'proyecto_informatico'
USE `proyecto_informatico`;

-- Insertar datos de prueba en la tabla 'usuario'
INSERT INTO `usuario` (`username`, `password`, `razon_social`, `cuit_cuil`, `estado`) VALUES
('nsaTecnologia', '1', 'NSA Tecnologia SRL', 30254938211, 1),
('witoTecnologia', '2', 'Wito Tecnologia SA', 30212465433, 1),
('bunerTecnologia', '3', 'Buener Tecnologia SA', 30258596248, 0);


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
INSERT INTO `producto_servicio` (`nombre`, `descripcion`,`imagen`, `precio`, `stock`, `categoria`, `estado`, `id_usuario`) VALUES
('Tablet', 'Electronica','../assets/images_productos/tablet.webp', 107990, 25, 'Producto', 1, 1),
('Iphone', 'Electronica','../assets/images_productos/iphone.jpg', 188880, 14, 'Producto', 1, 2),
('Mouse', 'Electronica','../assets/images_productos/mouse.jpeg', 5000, 36, 'Producto', 1, 3),
('Teclado', 'Electronica','../assets/images_productos/teclado.jpeg', 10000, 14, 'Producto', 0, 1),
('Monitor', 'Electronica','../assets/images_productos/monitor.jpg', 20000, 36, 'Producto', 1, 2),
('Impresora', 'Electronica','../assets/images_productos/impresora.jpg', 30000, 55, 'Producto', 1, 3),
('Laptop Lenovo', 'Portátil con procesador Intel i5 y 8GB RAM','../assets/images_productos/laptopLenovo.jpg', 150000, 12, 'Producto', 1, 1),
('Laptop Dell', 'Portátil con procesador Intel i7 y 16GB RAM','../assets/images_productos/LaptopDell.jpg', 170000, 15, 'Producto', 0, 2),
('Laptop HP EliteBook', 'Portátil con procesador Intel i7 y 16GB RAM','../assets/images_productos/laptopHPEliteBook.jpg', 120000, 19, 'Producto', 1, 3),
('Placa de video', 'placa gamer','../assets/images_productos/placaDeVideo.jpg', 70000, 12, 'Producto', 1, 1),
('UX', 'Consultoría para desarrollo de sitios web','../assets/images_productos/ux.jpg', 12390, 1, 'Servicio', 0, 2),
('Frontend', 'Consultoría para desarrollo de sitios web','../assets/images_productos/frontend.jpg', 12397, 1, 'Servicio', 1, 3),
('Backend', 'Consultoría para desarrollo de sitios web','../assets/images_productos/backend.png', 15780, 1, 'Servicio', 1, 1),
('Desarrollo Web', 'Desarrollo de sitios web','../assets/images_productos/desarrolloWeb.png', 14000, 1, 'Servicio', 0, 2),
('Aplicaciones', 'Consultoría para desarrollo de aplicaciones','../assets/images_productos/aplicaciones.png', 13000, 1, 'Servicio', 0, 3),
('Software', 'Consultoría para desarrollo de software','../assets/images_productos', 11000, 1, 'Servicio', 1, 1),
('Aplicaciones Móviles', 'Consultoría para desarrollo de aplicaciones móviles','../assets/images_productos/aplicaciones.png', 15963, 1, 'Servicio', 0, 2),
('Contable', 'Consultoría','../assets/images_productos/contable.jpg', 13050, 1, 'Servicio', 1, 3),
('Ingeniería', 'Consultoría','../assets/images_productos/ingenieria.jpg', 25000, 1, 'Servicio', 1, 1),
('Aula Virtual', 'Consultoría','../assets/images_productos/aulaVirtual.jpg', 8000, 1, 'Servicio', 1, 2),
('CM', 'Asesoría en redes sociales','../assets/images_productos/communityManager.jpg', 7000, 1, 'Servicio', 1, 2),
('Diseño', 'Contenido para redes sociales','../assets/images_productos/diseño.webp', 9500, 1, 'Servicio', 0, 3),
('ERP', 'Sofware de gestion integral','../assets/images_productos/erp.webp', 12000, 1, 'Servicio', 1, 1),
('Servidor', 'Almacenamiento en la nube','../assets/images_productos/servidor.jpg', 8500, 1, 'Servicio', 0, 2),
('A Medida', 'Consultoría','../assets/images_productos/aMedida.jpg', 12300, 1, 'Servicio', 1, 3);



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
('2023-01-06', 2, 2, 520),
('2023-01-04', 5, 2, 3690),
('2023-05-02', 8, 2, 4500),
('2023-01-10', 14, 2, 7850),
('2023-04-08', 2, 2, 4563),
('2023-01-04', 5, 2, 7850),
('2023-04-12', 8, 2, 1200),
('2023-04-10', 14, 2, 7400),
('2023-09-10', 2, 2, 9600),
('2023-07-23', 2, 2, 8300),
('2023-07-20', 8, 2, 7400),
('2023-11-15', 14, 2, 6800),
('2023-03-06', 14, 2, 9700),
('2023-11-10', 5, 2, 7600);


-- Insertar datos de prueba en la tabla 'detalle_factura' para usuario 1
INSERT INTO `detalle_factura` (`id_factura`, `id_producto_servicio`, `cantidad`, `subtotal`) VALUES
(1, 1, 2, 215980),
(1, 23, 5, 12000),
(1, 10, 9, 2560),
(1, 19, 6, 14000),
(2, 19, 1, 14000),
(3, 16, 2, 11000),
(3, 4, 8, 1230),
(4, 7, 6, 5300),
(4, 19, 7, 25000),
(4, 1, 6, 215980),
(4, 10, 2, 2560),
(5, 13, 1, 15780),
(5, 1, 6, 215980),
(6, 23, 2, 12000),
(6, 19, 9, 14000),
(7, 1, 5, 215980),
(7, 16, 5, 11000),
(7, 4, 4, 1230),
(8, 7, 2, 5300),
(9, 19, 3, 25000),
(9, 1, 4, 215980),
(10, 10, 4, 2560),
(11, 13, 4, 15780),
(12, 1, 8, 215980),
(12, 23, 4, 12000),
(12, 19, 5, 14000),
(13, 16, 4, 11000),
(13, 4, 6, 1230),
(13, 7, 9, 5300),
(13, 19, 7, 25000),
(14, 10, 7, 2560),
(14, 13, 9, 15780);




-- Insertar datos de prueba en la tabla 'detalle_factura' para usuario 2
INSERT INTO `detalle_factura` (`id_factura`, `id_producto_servicio`, `cantidad`, `subtotal`) VALUES
(15, 2, 3, 40000),
(15, 5, 6, 8500),
(16, 8, 2, 200000),
(16, 11, 5, 12390),
(17, 2, 7, 150000),
(18, 2, 9, 12390),
(18, 5, 1, 7000),
(19, 8, 2, 40000),
(19, 11, 8, 8500),
(20, 2, 9, 200000),
(20, 2, 8, 12390),
(20, 5, 1, 150000),
(21, 5, 6, 12390),
(22, 8, 7, 7000),
(23, 8, 2, 40000),
(24, 11, 1, 8500),
(24, 2, 6, 200000),
(25, 5, 7, 12390),
(26, 2, 8, 150000),
(27, 2, 6, 12390),
(28, 8, 3, 7000);