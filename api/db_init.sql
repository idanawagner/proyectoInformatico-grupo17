CREATE database IF NOT EXISTS `proyecto_informatico`;
USE `proyecto_informatico`;
CREATE TABLE IF NOT EXISTS `proyecto_informatico`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `razon_social` VARCHAR(45) NOT NULL,
  `CUIT` INT NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE IF NOT EXISTS `proyecto_informatico`.`cliente` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `apellido` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `cuit_cuil` INT NOT NULL,
    `telefono` INT NOT NULL,
    `direccion` VARCHAR(45) NOT NULL,
    `id_usuario` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_usuario`) REFERENCES `proyecto_informatico`.`usuario`(`id`));

CREATE TABLE IF NOT EXISTS `proyecto_informatico`.`producto_servicio`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `descripcion` VARCHAR(45) NOT NULL,
    `precio` INT NOT NULL,
    `stock` INT NOT NULL,
    `categoria` VARCHAR(45) NOT NULL,
    `id_usuario` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_usuario`) REFERENCES `proyecto_informatico`.`usuario`(`id`));

CREATE TABLE IF NOT EXISTS `proyecto_informatico`.`factura`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `fecha` DATE NOT NULL,
    `id_cliente` INT NOT NULL,
    `id_usuario` INT NOT NULL,
    `total` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_cliente`) REFERENCES `proyecto_informatico`.`cliente`(`id`),
    FOREIGN KEY (`id_usuario`) REFERENCES `proyecto_informatico`.`usuario`(`id`));

CREATE TABLE IF NOT EXISTS `proyecto_informatico`.`detalle_factura`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_factura` INT NOT NULL,
    `id_producto_servicio` INT NOT NULL,
    `cantidad` INT NOT NULL,
    `subtotal` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_factura`) REFERENCES `proyecto_informatico`.`factura`(`id`),
    FOREIGN KEY (`id_producto_servicio`) REFERENCES `proyecto_informatico`.`producto_servicio`(`id`));



