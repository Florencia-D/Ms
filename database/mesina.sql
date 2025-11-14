-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: messina
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id_carrito` int NOT NULL AUTO_INCREMENT,
  `Fecha_compra` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Total` decimal(10,2) DEFAULT '0.00',
  `Estado` enum('activo','pendiente','pagado','cancelado') DEFAULT 'activo',
  `id_usuario` int DEFAULT NULL,
  `id_detallecarrito` int DEFAULT NULL,
  PRIMARY KEY (`id_carrito`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `carritos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_productos`
--

DROP TABLE IF EXISTS `categoria_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_productos` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `Nombre_categoria` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_productos`
--

LOCK TABLES `categoria_productos` WRITE;
/*!40000 ALTER TABLE `categoria_productos` DISABLE KEYS */;
INSERT INTO `categoria_productos` VALUES (1,'Calculadoras'),(2,'Controladores Fiscales'),(3,'Gavetas y Cajas Fuertes'),(4,'Scanner y PC Industrial'),(5,'Control y Gestión'),(6,'Balanzas'),(7,'Comanderas'),(8,'Insumos');
/*!40000 ALTER TABLE `categoria_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias_repuestos`
--

DROP TABLE IF EXISTS `categorias_repuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias_repuestos` (
  `id_categRepuesto` int NOT NULL AUTO_INCREMENT,
  `Nombre_categoriaResp` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_categRepuesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias_repuestos`
--

LOCK TABLES `categorias_repuestos` WRITE;
/*!40000 ALTER TABLE `categorias_repuestos` DISABLE KEYS */;
/*!40000 ALTER TABLE `categorias_repuestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalles_carritos`
--

DROP TABLE IF EXISTS `detalles_carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_carritos` (
  `id_detallecarrito` int NOT NULL AUTO_INCREMENT,
  `Cantidad` int NOT NULL,
  `Precio_unitario` decimal(10,2) DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  PRIMARY KEY (`id_detallecarrito`),
  KEY `id_producto` (`id_producto`),
  CONSTRAINT `detalles_carritos_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_carritos`
--

LOCK TABLES `detalles_carritos` WRITE;
/*!40000 ALTER TABLE `detalles_carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalles_carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id_empleado` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Rol` varchar(50) DEFAULT NULL,
  `Contrasenia` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipos_servtec`
--

DROP TABLE IF EXISTS `equipos_servtec`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipos_servtec` (
  `id_equipo` int NOT NULL AUTO_INCREMENT,
  `Tipo` varchar(50) DEFAULT NULL,
  `Marca` varchar(50) DEFAULT NULL,
  `Modelo` varchar(50) DEFAULT NULL,
  `N_serie` varchar(50) DEFAULT NULL,
  `Falla_declarada` text,
  `Observaciones` text,
  `Estado` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_equipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipos_servtec`
--

LOCK TABLES `equipos_servtec` WRITE;
/*!40000 ALTER TABLE `equipos_servtec` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipos_servtec` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pagos`
--

DROP TABLE IF EXISTS `pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pagos` (
  `id_pago` int NOT NULL AUTO_INCREMENT,
  `Metodo_pago` enum('efectivo','tarjeta','transferencia') NOT NULL,
  `Monto` decimal(10,2) NOT NULL,
  `Fecha_pago` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Estado` tinyint(1) DEFAULT '1',
  `id_carrito` int DEFAULT NULL,
  PRIMARY KEY (`id_pago`),
  KEY `id_carrito` (`id_carrito`),
  CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`id_carrito`) REFERENCES `carritos` (`id_carrito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pagos`
--

LOCK TABLES `pagos` WRITE;
/*!40000 ALTER TABLE `pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `presupuestos`
--

DROP TABLE IF EXISTS `presupuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `presupuestos` (
  `id_presupuesto` int NOT NULL AUTO_INCREMENT,
  `Detalle` text,
  `Cantidad_repuesto` int DEFAULT NULL,
  `Costo` decimal(10,2) DEFAULT NULL,
  `id_repuesto` int DEFAULT NULL,
  `id_remito` int DEFAULT NULL,
  PRIMARY KEY (`id_presupuesto`),
  KEY `id_repuesto` (`id_repuesto`),
  KEY `id_remito` (`id_remito`),
  CONSTRAINT `presupuestos_ibfk_1` FOREIGN KEY (`id_repuesto`) REFERENCES `repuestos` (`id_repuesto`),
  CONSTRAINT `presupuestos_ibfk_2` FOREIGN KEY (`id_remito`) REFERENCES `remitos` (`id_remito`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `presupuestos`
--

LOCK TABLES `presupuestos` WRITE;
/*!40000 ALTER TABLE `presupuestos` DISABLE KEYS */;
/*!40000 ALTER TABLE `presupuestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `Nombre_producto` varchar(100) DEFAULT NULL,
  `Descripcion` text,
  `Marca` varchar(50) DEFAULT NULL,
  `Modelo` varchar(50) DEFAULT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  `N_serie` varchar(50) DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT '1',
  `Precio` decimal(10,2) DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  `id_stock` int DEFAULT NULL,
  PRIMARY KEY (`id_producto`),
  KEY `id_categoria` (`id_categoria`),
  KEY `id_stock` (`id_stock`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria_productos` (`id_categoria`),
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`id_stock`) REFERENCES `stock_productos` (`id_stock`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Olivetti Logos 802','Calculadora de escritorio con impresión en cinta, ideal para estudios contables y puntos de venta.','Olivetti','Logos 802','/img/productos/calculadoras/olivetti-logos-802.jpg','CALC001',1,185000.00,1,1),(2,'Cifra PR-235','Calculadora impresora de 12 dígitos, doble color de impresión y funciones financieras básicas.','Cifra','PR-235','/img/productos/calculadoras/cifra-pr235.jpg','CALC002',1,172000.00,1,2),(3,'Cifra PR-26','Calculadora portátil con impresión, compacta y liviana para uso en mostrador o visitas a clientes.','Cifra','PR-26','/img/productos/calculadoras/cifra-pr26.jpg','CALC003',1,149000.00,1,3),(4,'Cifra DT-68','Calculadora de escritorio de 12 dígitos con visor grande y teclas cómodas para uso intensivo.','Cifra','DT-68','/img/productos/calculadoras/cifra-dt68.jpg','CALC004',1,38500.00,1,4),(5,'Cifra DT-67','Calculadora compacta de 8 dígitos, ideal para uso diario en oficina o comercio.','Cifra','DT-67','/img/productos/calculadoras/cifra-dt67.jpg','CALC005',1,24500.00,1,5),(6,'Kretz Lexa','Registradora fiscal compacta, ideal para comercios minoristas con alto volumen de tickets.','Kretz','Lexa','/img/productos/controladores/kretz-lexa.jpg','CF001',1,495000.00,2,6),(7,'Hasar 6100-F','Controlador fiscal con teclado completo y reporte X/Z, apto para sistemas de gestión.','Hasar','6100-F','/img/productos/controladores/hasar-6100f.jpg','CF002',1,510000.00,2,7),(8,'Samsung NR-330F','Registradora fiscal de alto rendimiento, teclado programable y múltiples formas de pago.','Samsung','NR-330F','/img/productos/controladores/samsung-nr330f.jpg','CF003',1,480000.00,2,8),(9,'Kretz Numa','Caja registradora fiscal robusta, diseñada para supermercados y grandes comercios.','Kretz','Numa','/img/productos/controladores/kretz-numa.jpg','CF004',1,530000.00,2,9),(10,'Epson T-900','Impresora fiscal térmica de alta velocidad, ideal para puntos de venta con sistema POS.','Epson','T-900','/img/productos/controladores/epson-t900.jpg','CF005',1,450000.00,2,10),(11,'Sam Elio40','Impresora fiscal compacta, silenciosa y confiable para locales con espacio reducido.','Sam','Elio40','/img/productos/controladores/sam-elio40.jpg','CF006',1,430000.00,2,6),(12,'Hasar 250T','Impresora fiscal térmica con conexión a PC, compatible con la mayoría de sistemas de gestión.','Hasar','250T','/img/productos/controladores/hasar-250t.jpg','CF007',1,470000.00,2,7),(13,'Gaveta de dinero esmaltada','Gaveta de dinero metálica esmaltada, con divisiones para billetes y monedas. Ideal para puntos de venta.','Genérico','GDE-01','/img/productos/gavetas/gaveta-esmaltada.jpg','GAV001',1,85000.00,3,1),(14,'Gaveta de dinero acero inoxidable','Gaveta reforzada en acero inoxidable, alta resistencia al uso intensivo en comercios.','Genérico','GDI-02','/img/productos/gavetas/gaveta-acero-inoxidable.jpg','GAV002',1,112000.00,3,2),(15,'Gaveta de dinero apertura automática','Gaveta de dinero con apertura automática por señal del controlador fiscal o sistema POS.','Genérico','GAA-03','/img/productos/gavetas/gaveta-apertura-automatica.jpg','GAV003',1,129000.00,3,3),(16,'Caja fuerte de aplicar con buzón','Caja fuerte de aplicar a pared con buzón frontal para depósito de sobres o recaudación.','Genérico','CFA-B01','/img/productos/cajasfuertes/caja-aplicar-buzon.jpg','CFAP001',1,210000.00,3,4),(17,'Caja fuerte de aplicar sin buzón','Caja fuerte de aplicar de alta seguridad, cerradura mecánica y llave reforzada.','Genérico','CFA-S02','/img/productos/cajasfuertes/caja-aplicar-sin-buzon.jpg','CFAP002',1,195000.00,3,5),(18,'Caja fuerte de empotrar con buzón','Caja fuerte para empotrar en pared, con buzón para depósito y puerta reforzada.','Genérico','CFE-B01','/img/productos/cajasfuertes/caja-empotrar-buzon.jpg','CFEM001',1,235000.00,3,6),(19,'Caja fuerte de empotrar sin buzón','Caja fuerte de empotrar compacta, ideal para resguardar documentación y valores.','Genérico','CFE-S02','/img/productos/cajasfuertes/caja-empotrar-sin-buzon.jpg','CFEM002',1,220000.00,3,7),(20,'Elcode 9300B','Scanner de mano inalámbrico, lectura rápida de códigos de barras 1D y 2D, ideal para puntos de venta y depósitos.','Elcode','9300B','/img/productos/scanner/elcode-9300b.jpg','SCN001',1,98000.00,4,8),(21,'ELICODE RH105','Scanner de mano ergonómico con base, conexión USB y lectura continua para alto volumen de operaciones.','Elicode','RH105','/img/productos/scanner/elicode-rh105.jpg','SCN002',1,112000.00,4,9),(22,'SYBLE XB-8080H','Scanner de mesa omnidireccional, ideal para supermercados y comercios con alta rotación de productos.','Syble','XB-8080H','/img/productos/scanner/syble-xb8080h.jpg','SCN003',1,185000.00,4,10),(23,'PC Industrial POS 15\"','PC industrial tipo POS con pantalla táctil de 15\", pensado para funcionamiento continuo en entornos comerciales.','Genérico','POS15I','/img/productos/pcindustriales/pc-pos15.jpg','PCIND001',1,495000.00,4,6),(24,'Mini PC Industrial Fanless','Mini PC industrial fanless, bajo consumo y sin ventiladores, ideal para líneas de producción y cajas POS.','Genérico','MPC-FN01','/img/productos/pcindustriales/mini-pc-fanless.jpg','PCIND002',1,520000.00,4,7),(25,'Eltronic EI-190','Contadora de billetes con detección de billetes falsos, ideal para cajas y tesorerías.','Eltronic','EI-190','/img/productos/controlgestion/eltronic-ei190.jpg','CG001',1,320000.00,5,1),(26,'Global Bill Counter','Contadora y verificadora de billetes, alta velocidad y pantalla digital clara.','Global','Bill Counter','/img/productos/controlgestion/global-bill-counter.jpg','CG002',1,295000.00,5,2),(27,'ZKTeco SPEEDFACE V4L','Reloj biométrico de control de acceso y asistencia con reconocimiento facial y tarjeta.','ZKTeco','SPEEDFACE V4L','/img/productos/controlgestion/zkteco-speedface-v4l.jpg','CG003',1,260000.00,5,3),(28,'ZKTeco SF-100','Reloj biométrico compacto para control horario, lectura de huella y RFID.','ZKTeco','SF-100','/img/productos/controlgestion/zkteco-sf100.jpg','CG004',1,210000.00,5,4),(29,'Tarifador para playa de estacionamiento','Terminal tarifador para playa de estacionamiento, cálculo automático de estadía y emisión de ticket.','Genérico','TAR-PLAYA','/img/productos/controlgestion/tarifador-playa.jpg','CG005',1,180000.00,5,5),(30,'ET-7 Reloj biométrico','Reloj biométrico de asistencia con pantalla a color y reporte de fichadas.','Genérico','ET-7','/img/productos/controlgestion/et7-biometrico.jpg','CG006',1,230000.00,5,6),(31,'Systel Cronos Est','Balanza electrónica de mostrador con visor frontal, ideal para comercios minoristas.','Systel','Cronos Est','/img/productos/balanzas/systel-cronos-est.jpg','BAL001',1,145000.00,6,1),(32,'Systel Clipas Est 30 kg','Balanza electrónica de plataforma con capacidad de hasta 30 kg y gran precisión.','Systel','Clipas Est 30 kg','/img/productos/balanzas/systel-clipas-est-30kg.jpg','BAL002',1,165000.00,6,2),(33,'Systel Bumer Est','Balanza de mostrador robusta, apta para uso intensivo en comercios y autoservicios.','Systel','Bumer Est','/img/productos/balanzas/systel-bumer-est.jpg','BAL003',1,158000.00,6,3),(34,'Systel Kamba','Balanza de pie con columna, ideal para control de peso en depósitos y sectores de carga.','Systel','Kamba','/img/productos/balanzas/systel-kamba.jpg','BAL004',1,210000.00,6,4),(35,'Systel Nexus','Balanza de plataforma baja, diseñada para recibir cargas medianas con gran estabilidad.','Systel','Nexus','/img/productos/balanzas/systel-nexus.jpg','BAL005',1,230000.00,6,5),(36,'Systel Pilen','Balanza colgante tipo gancho, ideal para carnicerías, mercados y depósitos.','Systel','Pilen','/img/productos/balanzas/systel-pilen.jpg','BAL006',1,175000.00,6,6),(37,'Systel Urbe Full','Balanza de columna con visor elevado y funciones avanzadas de conteo y totalización.','Systel','Urbe Full','/img/productos/balanzas/systel-urbe-full.jpg','BAL007',1,245000.00,6,7),(38,'Systel Urbe','Versión estándar de la línea Urbe, práctica para control de peso en comercios y depósitos.','Systel','Urbe','/img/productos/balanzas/systel-urbe.jpg','BAL008',1,220000.00,6,8),(39,'Systel Clipas Retail 5 kg','Balanza de mostrador para comercio minorista, ideal para mostradores de atención al público.','Systel','Clipas Retail 5 kg','/img/productos/balanzas/systel-clipas-retail-5kg.jpg','BAL009',1,155000.00,6,9),(40,'Systel Pilar Plus','Balanza etiquetadora con torre, permite imprimir tickets y etiquetas con información de producto.','Systel','Pilar Plus','/img/productos/balanzas/systel-pilar-plus.jpg','BAL010',1,360000.00,6,10),(41,'Systel Cuora Max con mástil','Balanza computadora de mostrador con mástil y gran visor, ideal para supermercados.','Systel','Cuora Max con mástil','/img/productos/balanzas/systel-cuora-max-mastil.jpg','BAL011',1,390000.00,6,1),(42,'Systel Cuora Merchan multi','Balanza para comercio multipropósito, integra funciones de precio por kilo y etiquetado.','Systel','Cuora Merchan multi','/img/productos/balanzas/systel-cuora-merchan-multi.jpg','BAL012',1,375000.00,6,2),(43,'Systel Vita','Balanza de diseño compacto y bajo perfil, ideal para mostradores reducidos.','Systel','Vita','/img/productos/balanzas/systel-vita.jpg','BAL013',1,135000.00,6,3),(44,'Systel Cuora Neo','Balanza computadora con torre y pantalla a color para gestión de precios y ofertas.','Systel','Cuora Neo','/img/productos/balanzas/systel-cuora-neo.jpg','BAL014',1,410000.00,6,4),(45,'Epson TM-P20','Impresora térmica portátil, ideal para comandas móviles y puntos de venta con Bluetooth.','Epson','TM-P20','/img/productos/comanderas/epson-tm-p20.jpg','CMD001',1,210000.00,7,1),(46,'Zebra ZD220T','Impresora térmica compacta para etiquetas y tickets, ideal para comercios y logística.','Zebra','ZD220T','/img/productos/comanderas/zebra-zd220t.jpg','CMD002',1,265000.00,7,2),(47,'Kretz Lexa Multipuerto','Impresora de tickets multipuerto, permite conexión con varios dispositivos de punto de venta.','Kretz','Lexa Multipuerto','/img/productos/comanderas/kretz-lexa-multipuerto.jpg','CMD003',1,295000.00,7,3),(48,'Global TP-POS80','Impresora térmica de 80 mm para comandas de cocina y tickets de caja.','Global','TP-POS80','/img/productos/comanderas/global-tp-pos80.jpg','CMD004',1,185000.00,7,4),(49,'Hasar HAS-181','Impresora térmica de alta velocidad, ideal para restaurantes y comercios con alto volumen.','Hasar','HAS-181','/img/productos/comanderas/hasar-has181.jpg','CMD005',1,230000.00,7,5),(50,'Zebra ZT411','Impresora industrial de etiquetas, robusta y diseñada para trabajo continuo.','Zebra','ZT411','/img/productos/comanderas/zebra-zt411.jpg','CMD006',1,610000.00,7,6),(51,'SATO 4B0TT ETIQUETAS','Impresora de etiquetas para identificación de productos, logística y stock.','SATO','4B0TT','/img/productos/comanderas/sato-4b0tt-etiquetas.jpg','CMD007',1,390000.00,7,7),(52,'POS80-CX','Impresora térmica de 80 mm, compacta, ideal para comandas y tickets en mostrador.','Genérico','POS80-CX','/img/productos/comanderas/pos80-cx.jpg','CMD008',1,170000.00,7,8),(53,'Eltronic QTOUCH-10','Terminal táctil QTOUCH de 10\", integra sistema POS y emisión de comandas.','Eltronic','QTOUCH-10','/img/productos/comanderas/eltronic-qtouch10.jpg','CMD009',1,520000.00,7,9),(54,'Eltronic QTOUCH-8','Comandera táctil de 8\", ideal para salones gastronómicos y autoservicios.','Eltronic','QTOUCH-8','/img/productos/comanderas/eltronic-qtouch8.jpg','CMD010',1,465000.00,7,10),(55,'Papel térmico 80x80 mm','Rollo de papel térmico 80 mm x 80 mm para impresoras POS de 80 mm. Alta sensibilidad y blanco intenso.','Genérico','ROL-80x80','/img/productos/insumos/papel-termico-80x80.jpg','INS001',1,6500.00,8,1),(56,'Papel térmico 57x40 mm','Rollo térmico de 57 mm x 40 mm para impresoras portátiles y calculadoras con impresión.','Genérico','ROL-57x40','/img/productos/insumos/papel-termico-57x40.jpg','INS002',1,3200.00,8,2),(57,'Etiquetas autoadhesivas para balanzas 58x40','Paquete de etiquetas térmicas directas 58x40 mm, compatibles con etiquetadoras de balanza.','Genérico','ETQ-58x40-BAL','/img/productos/insumos/etiquetas-balanza-58x40.jpg','INS003',1,18500.00,8,3),(58,'Etiquetas térmicas 100x50 mm','Rollo de etiquetas térmicas directas 100x50 mm para impresoras de etiquetas.','Genérico','ETQ-100x50','/img/productos/insumos/etiquetas-termicas-100x50.jpg','INS004',1,21000.00,8,4),(59,'Ribbon cera 110mm x 74m','Cinta de transferencia térmica (cera) 110 mm x 74 m para etiquetas papel mate.','Genérico','RBN-110-74-CERA','/img/productos/insumos/ribbon-cera-110x74.jpg','INS005',1,14500.00,8,5),(60,'Cinta entintada para impresora fiscal','Cartucho/cinta entintada negra compatible con impresoras fiscales matriciales (Hasar/Epson).','Genérico','CINTA-FISCAL-NG','/img/productos/insumos/cinta-entintada-fiscal.jpg','INS006',1,11000.00,8,6),(61,'Cable USB para impresora térmica','Cable USB-A a USB-B de alta calidad, compatible con impresoras POS e impresoras de etiquetas.','Genérico','USB-IMP-2M','/img/productos/insumos/cable-usb-impresora.jpg','INS007',1,6000.00,8,7),(62,'Cable RS-232 para impresora fiscal','Cable serie DB9 para conexión RS-232 de controladores/impresoras fiscales.','Genérico','RS232-IMP-2M','/img/productos/insumos/cable-rs232-impresora.jpg','INS008',1,8500.00,8,8),(63,'Fuente 24V 2.5A para POS','Fuente de alimentación 24V 2.5A con conector para impresoras térmicas POS.','Genérico','FUENTE-24V-2.5A','/img/productos/insumos/fuente-24v-25a.jpg','INS009',1,23000.00,8,9);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `remitos`
--

DROP TABLE IF EXISTS `remitos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `remitos` (
  `id_remito` int NOT NULL AUTO_INCREMENT,
  `N_remito` varchar(50) DEFAULT NULL,
  `Fecha_recepcion` date DEFAULT NULL,
  `id_cliente` int DEFAULT NULL,
  `id_sucursal` int DEFAULT NULL,
  `id_empleado` int DEFAULT NULL,
  PRIMARY KEY (`id_remito`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_sucursal` (`id_sucursal`),
  KEY `id_empleado` (`id_empleado`),
  CONSTRAINT `remitos_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `remitos_ibfk_2` FOREIGN KEY (`id_sucursal`) REFERENCES `sucursales` (`id_sucursal`),
  CONSTRAINT `remitos_ibfk_3` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `remitos`
--

LOCK TABLES `remitos` WRITE;
/*!40000 ALTER TABLE `remitos` DISABLE KEYS */;
/*!40000 ALTER TABLE `remitos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repuestos`
--

DROP TABLE IF EXISTS `repuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repuestos` (
  `id_repuesto` int NOT NULL AUTO_INCREMENT,
  `Nombre_repuesto` varchar(100) DEFAULT NULL,
  `Descripcion` text,
  `Marca` varchar(50) DEFAULT NULL,
  `Modelo` varchar(50) DEFAULT NULL,
  `N_serie` varchar(50) DEFAULT NULL,
  `Estado` tinyint(1) DEFAULT '1',
  `Precio` decimal(10,2) DEFAULT NULL,
  `id_categRepuesto` int DEFAULT NULL,
  `id_stockRepuesto` int DEFAULT NULL,
  PRIMARY KEY (`id_repuesto`),
  KEY `id_categRepuesto` (`id_categRepuesto`),
  KEY `id_stockRepuesto` (`id_stockRepuesto`),
  CONSTRAINT `repuestos_ibfk_1` FOREIGN KEY (`id_categRepuesto`) REFERENCES `categorias_repuestos` (`id_categRepuesto`),
  CONSTRAINT `repuestos_ibfk_2` FOREIGN KEY (`id_stockRepuesto`) REFERENCES `stock_repuestos` (`id_stockRepuesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repuestos`
--

LOCK TABLES `repuestos` WRITE;
/*!40000 ALTER TABLE `repuestos` DISABLE KEYS */;
/*!40000 ALTER TABLE `repuestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_productos`
--

DROP TABLE IF EXISTS `stock_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_productos` (
  `id_stock` int NOT NULL AUTO_INCREMENT,
  `Cantidad_producto` int DEFAULT '0',
  PRIMARY KEY (`id_stock`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_productos`
--

LOCK TABLES `stock_productos` WRITE;
/*!40000 ALTER TABLE `stock_productos` DISABLE KEYS */;
INSERT INTO `stock_productos` VALUES (1,15),(2,8),(3,12),(4,20),(5,10),(6,6),(7,9),(8,14),(9,25),(10,30);
/*!40000 ALTER TABLE `stock_productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_repuestos`
--

DROP TABLE IF EXISTS `stock_repuestos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_repuestos` (
  `id_stockRepuesto` int NOT NULL AUTO_INCREMENT,
  `Cantidad_repuesto` int DEFAULT '0',
  PRIMARY KEY (`id_stockRepuesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_repuestos`
--

LOCK TABLES `stock_repuestos` WRITE;
/*!40000 ALTER TABLE `stock_repuestos` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock_repuestos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursales`
--

DROP TABLE IF EXISTS `sucursales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursales` (
  `id_sucursal` int NOT NULL AUTO_INCREMENT,
  `Nombre_sucursal` varchar(50) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Ciudad` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_sucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursales`
--

LOCK TABLES `sucursales` WRITE;
/*!40000 ALTER TABLE `sucursales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sucursales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) DEFAULT NULL,
  `Apellido` varchar(50) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Direccion` varchar(100) DEFAULT NULL,
  `Contrasenia` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Laura','Gómez','laura.gomez@example.com','1156782345','Av. Corrientes 2456, CABA','laura123'),(2,'Martín','Pérez','martin.perez@example.com','1123456789','Calle Belgrano 1520, Rosario','martin456'),(3,'Sofía','Ruiz','sofia.ruiz@example.com','1134567890','Av. San Martín 380, Córdoba','sofia789'),(4,'Diego','López','diego.lopez@example.com','1167890123','Mitre 920, Mendoza','diego321'),(5,'Camila','Fernández','camila.fernandez@example.com','1145678901','Sarmiento 1840, La Plata','camila654'),(6,'sofia','jimenez','anasofia@gmail.com','uyyvvhg','khbkuvyv','$2b$10$GzZfi2wJ8PP4cZPWER1i8eMOlIGbSzjLlSXbGmPWZWAkcENryDCZ.');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-13 22:50:22
