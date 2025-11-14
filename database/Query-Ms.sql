
CREATE DATABASE Messina;
USE Messina;

# ==============================
# 1) USUARIOS
# ==============================
CREATE TABLE Usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50),
  Apellido VARCHAR(50),
  Email VARCHAR(100) UNIQUE,
  Telefono VARCHAR(20),
  Direccion VARCHAR(100),
  Contrasenia VARCHAR(100)
);

# ==============================
# 2) CATEGORIA_PRODUCTOS
# ==============================
CREATE TABLE Categoria_productos (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  Nombre_categoria VARCHAR(50)
);

# ==============================
# 3) STOCK_PRODUCTOS
# ==============================
CREATE TABLE Stock_productos (
  id_stock INT AUTO_INCREMENT PRIMARY KEY,
  Cantidad_producto INT DEFAULT 0
);

# ==============================
# 4) PRODUCTOS  (usa Categoria_productos y Stock_productos)
# ==============================
CREATE TABLE Productos (
  id_producto INT AUTO_INCREMENT PRIMARY KEY,
  Nombre_producto VARCHAR(100),
  Descripcion TEXT,
  Marca VARCHAR(50),
  Modelo VARCHAR(50),
  Imagen VARCHAR(255),
  N_serie VARCHAR(50),
  Estado BOOLEAN DEFAULT TRUE,
  Precio DECIMAL(10,2),
  id_categoria INT,
  id_stock INT,
  FOREIGN KEY (id_categoria) REFERENCES Categoria_productos(id_categoria),
  FOREIGN KEY (id_stock) REFERENCES Stock_productos(id_stock)
);

# ==============================
# 5) DETALLES_CARRITOS (usa Productos)
# ==============================
CREATE TABLE Detalles_carritos (
  id_detallecarrito INT AUTO_INCREMENT PRIMARY KEY,
  Cantidad INT NOT NULL,
  Precio_unitario DECIMAL(10,2),
  id_producto INT,
  FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);

# ==============================
# 6) CARRITOS (usa Usuarios)
#    ⚠ Dejé id_detallecarrito SIN foreign key como lo tenías
# ==============================
CREATE TABLE Carritos (
  id_carrito INT AUTO_INCREMENT PRIMARY KEY,
  Fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Total DECIMAL(10,2) DEFAULT 0.00,
  Estado ENUM('activo', 'pendiente', 'pagado', 'cancelado') DEFAULT 'activo',
  id_usuario INT,
  id_detallecarrito INT,
  FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

# ==============================
# 7) PAGOS (usa Carritos)
# ==============================
CREATE TABLE Pagos (
  id_pago INT AUTO_INCREMENT PRIMARY KEY,
  Metodo_pago ENUM('efectivo','tarjeta','transferencia') NOT NULL,
  Monto DECIMAL(10,2) NOT NULL,
  Fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  Estado BOOLEAN DEFAULT TRUE,
  id_carrito INT,
  FOREIGN KEY (id_carrito) REFERENCES Carritos(id_carrito)
);

# ==============================
# 8) CATEGORIAS_REPUESTOS
# ==============================
CREATE TABLE Categorias_repuestos (
  id_categRepuesto INT AUTO_INCREMENT PRIMARY KEY,
  Nombre_categoriaResp VARCHAR(50)
);

# ==============================
# 9) STOCK_REPUESTOS
# ==============================
CREATE TABLE Stock_repuestos (
  id_stockRepuesto INT AUTO_INCREMENT PRIMARY KEY,
  Cantidad_repuesto INT DEFAULT 0
);

# ==============================
# 10) REPUESTOS (usa Categorias_repuestos y Stock_repuestos)
# ==============================
CREATE TABLE Repuestos (
  id_repuesto INT AUTO_INCREMENT PRIMARY KEY,
  Nombre_repuesto VARCHAR(100),
  Descripcion TEXT,
  Marca VARCHAR(50),
  Modelo VARCHAR(50),
  N_serie VARCHAR(50),
  Estado BOOLEAN DEFAULT TRUE,
  Precio DECIMAL(10,2),
  id_categRepuesto INT,
  id_stockRepuesto INT,
  FOREIGN KEY (id_categRepuesto) REFERENCES Categorias_repuestos(id_categRepuesto),
  FOREIGN KEY (id_stockRepuesto) REFERENCES Stock_repuestos(id_stockRepuesto)
);

# ==============================
# 11) CLIENTES
# ==============================
CREATE TABLE Clientes (
  id_cliente INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50),
  Apellido VARCHAR(50),
  Email VARCHAR(100),
  Telefono VARCHAR(20),
  Direccion VARCHAR(100)
);

# ==============================
# 12) SUCURSALES
# ==============================
CREATE TABLE Sucursales (
  id_sucursal INT AUTO_INCREMENT PRIMARY KEY,
  Nombre_sucursal VARCHAR(50),
  Direccion VARCHAR(100),
  Email VARCHAR(100),
  Telefono VARCHAR(20),
  Ciudad VARCHAR(50)
);

# ==============================
# 13) EMPLEADOS
# ==============================
CREATE TABLE Empleados (
  id_empleado INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(50),
  Apellido VARCHAR(50),
  Email VARCHAR(100),
  Telefono VARCHAR(20),
  Direccion VARCHAR(100),
  Rol VARCHAR(50),
  Contrasenia VARCHAR(100)
);

# ==============================
# 14) REMITOS (usa Clientes, Sucursales, Empleados)
# ==============================
CREATE TABLE Remitos (
  id_remito INT AUTO_INCREMENT PRIMARY KEY,
  N_remito VARCHAR(50),
  Fecha_recepcion DATE,
  id_cliente INT,
  id_sucursal INT,
  id_empleado INT,
  FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
  FOREIGN KEY (id_sucursal) REFERENCES Sucursales(id_sucursal),
  FOREIGN KEY (id_empleado) REFERENCES Empleados(id_empleado)
);

# ==============================
# 15) PRESUPUESTOS (usa Repuestos y Remitos)
# ==============================
CREATE TABLE Presupuestos (
  id_presupuesto INT AUTO_INCREMENT PRIMARY KEY,
  Detalle TEXT,
  Cantidad_repuesto INT,
  Costo DECIMAL(10,2),
  id_repuesto INT,
  id_remito INT,
  FOREIGN KEY (id_repuesto) REFERENCES Repuestos(id_repuesto),
  FOREIGN KEY (id_remito) REFERENCES Remitos(id_remito)
);

# ==============================
# 16) EQUIPOS_SERVTEC (independiente)
# ==============================
CREATE TABLE Equipos_ServTec (
   id_equipo INT AUTO_INCREMENT PRIMARY KEY,
   Tipo VARCHAR(50),
   Marca VARCHAR(50),
   Modelo VARCHAR(50),
   N_serie VARCHAR(50),
   Falla_declarada TEXT,
   Observaciones TEXT,
   Estado VARCHAR(50)
);

# ==============================
# INSERTS
# ==============================

SELECT * FROM Usuarios;

INSERT INTO Usuarios (Nombre, Apellido, Email, Telefono, Direccion, Contrasenia)
VALUES
('Laura', 'Gómez', 'laura.gomez@example.com', '1156782345', 'Av. Corrientes 2456, CABA', 'laura123'),
('Martín', 'Pérez', 'martin.perez@example.com', '1123456789', 'Calle Belgrano 1520, Rosario', 'martin456'),
('Sofía', 'Ruiz', 'sofia.ruiz@example.com', '1134567890', 'Av. San Martín 380, Córdoba', 'sofia789'),
('Diego', 'López', 'diego.lopez@example.com', '1167890123', 'Mitre 920, Mendoza', 'diego321'),
('Camila', 'Fernández', 'camila.fernandez@example.com', '1145678901', 'Sarmiento 1840, La Plata', 'camila654');

INSERT INTO Categoria_productos (Nombre_categoria)
VALUES
('Calculadoras'),
('Controladores Fiscales'),
('Gavetas y Cajas Fuertes'),
('Scanner y PC Industrial'),
('Control y Gestión'),
('Balanzas'),
('Comanderas'),
('Insumos');

SELECT * FROM Categoria_productos;

INSERT INTO Stock_productos (Cantidad_producto)
VALUES
(15),  -- 1
(8),   -- 2
(12),  -- 3
(20),  -- 4
(10),  -- 5
(6),   -- 6
(9),   -- 7
(14),  -- 8
(25),  -- 9
(30);  -- 10

SELECT * FROM Stock_productos;




INSERT INTO Productos 
(Nombre_producto, Descripcion, Marca, Modelo, Imagen, N_serie, Estado, Precio, id_categoria, id_stock)
VALUES

-- Calculadoras con impresión
('Olivetti Logos 802',
 'Calculadora de escritorio con impresión en cinta, ideal para estudios contables y puntos de venta.',
 'Olivetti',
 'Logos 802',
 'https://i.pinimg.com/736x/c1/6b/97/c16b97c4eaaca55413389100b6b12a80.jpg',
 'CALC001',
 TRUE,
 185000.00,
 1,
 1),

('Cifra PR-235',
 'Calculadora impresora de 12 dígitos, doble color de impresión y funciones financieras básicas.',
 'Cifra',
 'PR-235',
 'https://i.pinimg.com/736x/2d/03/c2/2d03c250841c50b16d3142dbb4c91ed3.jpg',
 'CALC002',
 TRUE,
 172000.00,
 1,
 2),

('Cifra PR-26',
 'Calculadora portátil con impresión, compacta y liviana para uso en mostrador o visitas a clientes.',
 'Cifra',
 'PR-26',
 'https://i.pinimg.com/736x/28/40/93/284093640b11dcc5440a004e5b784a03.jpg',
 'CALC003',
 TRUE,
 149000.00,
 1,
 3),

-- Calculadoras de escritorio sin impresión
('Cifra DT-68',
 'Calculadora de escritorio de 12 dígitos con visor grande y teclas cómodas para uso intensivo.',
 'Cifra',
 'DT-68',
 'https://i.pinimg.com/736x/40/e1/35/40e1356a51cadefdf4a73843bf8c2465.jpg',
 'CALC004',
 TRUE,
 38500.00,
 1,
 4),

('Cifra DT-67',
 'Calculadora compacta de 8 dígitos, ideal para uso diario en oficina o comercio.',
 'Cifra',
 'DT-67',
 'https://i.pinimg.com/736x/e7/b1/03/e7b103f8c9497518358176571200aee3.jpg',
 'CALC005',
 TRUE,
 24500.00,
 1,
 5),

-- Registradoras fiscales
('Kretz Lega',
 'Registradora fiscal compacta, ideal para comercios minoristas con alto volumen de tickets.',
 'Kretz',
 'Lexa',
 'https://i.pinimg.com/736x/33/13/d6/3313d651044413c7f77153d662908062.jpg',
 'CF001',
 TRUE,
 495000.00,
 2,
 6),

('Hasar 6100-F',
 'Controlador fiscal con teclado completo y reporte X/Z, apto para sistemas de gestión.',
 'Hasar',
 '6100-F',
 'https://i.pinimg.com/736x/21/b6/69/21b669ee9297b54a77d4278c80199944.jpg',
 'CF002',
 TRUE,
 510000.00,
 2,
 7),

('Samsung NR-330F',
 'Registradora fiscal de alto rendimiento, teclado programable y múltiples formas de pago.',
 'Samsung',
 'NR-330F',
 'https://i.pinimg.com/736x/d5/dc/3d/d5dc3d72f02e8a5bd9c178ba347164ca.jpg',
 'CF003',
 TRUE,
 480000.00,
 2,
 8),

('Kretz Numa',
 'Caja registradora fiscal robusta, diseñada para supermercados y grandes comercios.',
 'Kretz',
 'Numa',
 'https://i.pinimg.com/736x/ee/af/f4/eeaff4938af484fb04a86dc7ddab1f90.jpg',
 'CF004',
 TRUE,
 530000.00,
 2,
 9),

-- Impresoras fiscales
('Epson T-900',
 'Impresora fiscal térmica de alta velocidad, ideal para puntos de venta con sistema POS.',
 'Epson',
 'T-900',
 'https://i.pinimg.com/736x/6a/17/65/6a17651e796a7d010900d4ae79964ae5.jpg',
 'CF005',
 TRUE,
 450000.00,
 2,
 10),

('Sam Elio40',
 'Impresora fiscal compacta, silenciosa y confiable para locales con espacio reducido.',
 'Sam',
 'Elio40',
 'https://i.pinimg.com/736x/52/00/82/5200821fb94e7d8159a74e40523004d0.jpg',
 'CF006',
 TRUE,
 430000.00,
 2,
 6),

('Hasar 250T',
 'Impresora fiscal térmica con conexión a PC, compatible con la mayoría de sistemas de gestión.',
 'Hasar',
 '250T',
 'https://i.pinimg.com/736x/c5/e7/5d/c5e75d70428e24f54e35f68948146037.jpg',
 'CF007',
 TRUE,
 470000.00,
 2,
 7),


-- Gavetas de dinero
('Gaveta de dinero esmaltada',
 'Gaveta de dinero metálica esmaltada, con divisiones para billetes y monedas. Ideal para puntos de venta.',
 'Genérico',
 'GDE-01',
 'https://i.pinimg.com/736x/7a/24/0b/7a240bc47fd853d2fbefc007357e40ff.jpg',
 'GAV001',
 TRUE,
 85000.00,
 3,
 1),

('Gaveta de dinero acero inoxidable',
 'Gaveta reforzada en acero inoxidable, alta resistencia al uso intensivo en comercios.',
 'Genérico',
 'GDI-02',
 'https://i.pinimg.com/736x/5d/b9/29/5db9293fb28e9ae581c01e6d53790286.jpg',
 'GAV002',
 TRUE,
 112000.00,
 3,
 2),

('Gaveta de dinero apertura automática',
 'Gaveta de dinero con apertura automática por señal del controlador fiscal o sistema POS.',
 'Genérico',
 'GAA-03',
 'https://i.pinimg.com/736x/0a/6d/7c/0a6d7cec6aa2a3d654312c44ae1dd999.jpg',
 'GAV003',
 TRUE,
 129000.00,
 3,
 3),

-- Cajas fuertes de aplicar
('Caja fuerte de aplicar con buzón',
 'Caja fuerte de aplicar a pared con buzón frontal para depósito de sobres o recaudación.',
 'Genérico',
 'CFA-B01',
 'https://i.pinimg.com/736x/35/42/97/3542978ff19b956e3fa6cd53a4b12d20.jpg',
 'CFAP001',
 TRUE,
 210000.00,
 3,
 4),

('Caja fuerte de aplicar sin buzón',
 'Caja fuerte de aplicar de alta seguridad, cerradura mecánica y llave reforzada.',
 'Genérico',
 'CFA-S02',
 'https://i.pinimg.com/736x/28/74/eb/2874ebad3c6c768a04d4f85d98649bf3.jpg',
 'CFAP002',
 TRUE,
 195000.00,
 3,
 5),

-- Cajas fuertes de empotrar
('Caja fuerte de empotrar con buzón',
 'Caja fuerte para empotrar en pared, con buzón para depósito y puerta reforzada.',
 'Genérico',
 'CFE-B01',
 'https://i.pinimg.com/736x/fd/c1/af/fdc1af99b1cf24cef1a9dc85be0c0f3f.jpg',
 'CFEM001',
 TRUE,
 235000.00,
 3,
 6),

('Caja fuerte de empotrar sin buzón',
 'Caja fuerte de empotrar compacta, ideal para resguardar documentación y valores.',
 'Genérico',
 'CFE-S02',
 'https://i.pinimg.com/736x/2e/28/c8/2e28c8e537fb5d7499d099897174a07f.jpg',
 'CFEM002',
 TRUE,
 220000.00,
 3,
 7),


-- Scanner de mano
('Elcode 9300B',
 'Scanner de mano inalámbrico, lectura rápida de códigos de barras 1D y 2D, ideal para puntos de venta y depósitos.',
 'Elcode',
 '9300B',
 'https://i.pinimg.com/736x/a2/a1/b2/a2a1b26d070fee9deab7c510dd7bdaca.jpg',
 'SCN001',
 TRUE,
 98000.00,
 4,
 8),

('ELICODE RH105',
 'Scanner de mano ergonómico con base, conexión USB y lectura continua para alto volumen de operaciones.',
 'Elicode',
 'RH105',
 'https://i.pinimg.com/736x/33/b7/fb/33b7fbe68a97cec834e26ec1319d33b5.jpg',
 'SCN002',
 TRUE,
 112000.00,
 4,
 9),

-- Scanner de mesa
('SYBLE XB-8080H',
 'Scanner de mesa omnidireccional, ideal para supermercados y comercios con alta rotación de productos.',
 'Syble',
 'XB-8080H',
 'https://i.pinimg.com/474x/79/54/1d/79541de0d2671af5237b33a63b854eba.jpg',
 'SCN003',
 TRUE,
 185000.00,
 4,
 10),

-- PC industriales
('PC Industrial POS 15"',
 'PC industrial tipo POS con pantalla táctil de 15", pensado para funcionamiento continuo en entornos comerciales.',
 'Genérico',
 'POS15I',
 'https://i.pinimg.com/736x/d0/a4/d5/d0a4d578ec3e587d8655b05db1451c78.jpg',
 'PCIND001',
 TRUE,
 495000.00,
 4,
 6),


-- Contadoras de billetes
('Eltronic EI-190',
 'Contadora de billetes con detección de billetes falsos, ideal para cajas y tesorerías.',
 'Eltronic',
 'EI-190',
 'https://i.pinimg.com/736x/fd/ba/37/fdba373374b5f11f5556fa54b584c1b3.jpg',
 'CG001',
 TRUE,
 320000.00,
 5,
 1),

('Global Bill Counter',
 'Contadora y verificadora de billetes, alta velocidad y pantalla digital clara.',
 'Global',
 'Bill Counter',
 'https://i.pinimg.com/736x/85/41/1b/85411bfb7357c71f3f7e6dc3458472a3.jpg',
 'CG002',
 TRUE,
 295000.00,
 5,
 2),

-- Relojes biométricos y tarifadores de playa
('ZKTeco SPEEDFACE V4L',
 'Reloj biométrico de control de acceso y asistencia con reconocimiento facial y tarjeta.',
 'ZKTeco',
 'SPEEDFACE V4L',
 'https://i.pinimg.com/736x/f0/d9/59/f0d959e42e799b55b961449135272d42.jpg',
 'CG003',
 TRUE,
 260000.00,
 5,
 3),

('ZKTeco SF-100',
 'Reloj biométrico compacto para control horario, lectura de huella y RFID.',
 'ZKTeco',
 'SF-100',
 'https://i.pinimg.com/736x/26/f6/6b/26f66b5663b55bbc4add2bf4cbb31765.jpg',
 'CG004',
 TRUE,
 210000.00,
 5,
 4),

('Tarifador para playa de estacionamiento',
 'Terminal tarifador para playa de estacionamiento, cálculo automático de estadía y emisión de ticket.',
 'Genérico',
 'TAR-PLAYA',
 'https://i.pinimg.com/736x/eb/67/af/eb67affcec7849df1941bfe2ce5fdd5a.jpg',
 'CG005',
 TRUE,
 180000.00,
 5,
 5),

('ET-7 Reloj biométrico',
 'Reloj biométrico de asistencia con pantalla a color y reporte de fichadas.',
 'Genérico',
 'ET-7',
 'https://i.pinimg.com/736x/77/57/69/77576948f8ee44e912f022c9778a04d3.jpg',
 'CG006',
 TRUE,
 230000.00,
 5,
 6),

#balanzas
('Systel Croma Bat',
 'Balanza electrónica de mostrador con visor frontal, ideal para comercios minoristas.',
 'Systel',
 'Cronos Est',
 'https://i.pinimg.com/736x/73/f6/0a/73f60a00c2aaa89ec6cae06d2b54bb42.jpg',
 'BAL001',
 TRUE,
 145000.00,
 6,
 1),

('Systel Clipas Est 30 kg',
 'Balanza electrónica de plataforma con capacidad de hasta 30 kg y gran precisión.',
 'Systel',
 'Clipas Est 30 kg',
 'https://i.pinimg.com/736x/f6/90/23/f690235e99b3599f77d9a5d92e904ccb.jpg',
 'BAL002',
 TRUE,
 165000.00,
 6,
 2),

('Systel Bumer Est',
 'Balanza de mostrador robusta, apta para uso intensivo en comercios y autoservicios.',
 'Systel',
 'Bumer Est',
 'https://i.pinimg.com/736x/92/c0/7f/92c07f60e30330872fa874e9cf9871f6.jpg',
 'BAL003',
 TRUE,
 158000.00,
 6,
 3),

('Systel Komba',
 'Balanza de pie con columna, ideal para control de peso en depósitos y sectores de carga.',
 'Systel',
 'Kamba',
 'https://i.pinimg.com/736x/c7/b0/15/c7b01545f71a8166ac80fd7bdb6993f3.jpg',
 'BAL004',
 TRUE,
 210000.00,
 6,
 4),

('Systel Nexus',
 'Balanza de plataforma baja, diseñada para recibir cargas medianas con gran estabilidad.',
 'Systel',
 'Nexus',
 'https://i.pinimg.com/736x/ab/9c/d2/ab9cd27d53d1391f1154418d5a178690.jpg',
 'BAL005',
 TRUE,
 230000.00,
 6,
 5),

('Systel Pilen',
 'Balanza colgante tipo gancho, ideal para carnicerías, mercados y depósitos.',
 'Systel',
 'Pilen',
 'https://i.pinimg.com/474x/ef/5e/60/ef5e6057992b641c123316a25f7f2274.jpg',
 'BAL006',
 TRUE,
 175000.00,
 6,
 6),

('Systel Urbe Full',
 'Balanza de columna con visor elevado y funciones avanzadas de conteo y totalización.',
 'Systel',
 'Urbe Full',
 'https://i.pinimg.com/736x/50/42/e7/5042e7a0c97d802aa7ff44abdb498b8b.jpg',
 'BAL007',
 TRUE,
 245000.00,
 6,
 7),

('Systel Urbe',
 'Versión estándar de la línea Urbe, práctica para control de peso en comercios y depósitos.',
 'Systel',
 'Urbe',
 'https://i.pinimg.com/736x/52/9e/dc/529edc425f0bad986584f02b042c8bb3.jpg',
 'BAL008',
 TRUE,
 220000.00,
 6,
 8),

('Systel Clipas Retail 5 kg',
 'Balanza de mostrador para comercio minorista, ideal para mostradores de atención al público.',
 'Systel',
 'Clipas Retail 5 kg',
 'https://i.pinimg.com/474x/c6/e9/c0/c6e9c0b734400d224254de426e9d2ec9.jpg',
 'BAL009',
 TRUE,
 155000.00,
 6,
 9),

('Systel Flaier Plus',
 'Balanza etiquetadora con torre, permite imprimir tickets y etiquetas con información de producto.',
 'Systel',
 'Pilar Plus',
 'https://i.pinimg.com/736x/dc/30/b9/dc30b947eb435cdacd8a31a8144937ac.jpg',
 'BAL010',
 TRUE,
 360000.00,
 6,
 10),

('Systel Cuora Max con mástil',
 'Balanza computadora de mostrador con mástil y gran visor, ideal para supermercados.',
 'Systel',
 'Cuora Max con mástil',
 'https://i.pinimg.com/736x/52/d4/a2/52d4a208b7593366aeef38aac497bdc8.jpg',
 'BAL011',
 TRUE,
 390000.00,
 6,
 1),

('Systel Cuora Max sin mastil',
 'Balanza para comercio multipropósito, integra funciones de precio por kilo y etiquetado.',
 'Systel',
 'Cuora Merchan multi',
 'https://i.pinimg.com/474x/69/ce/c6/69cec670fe6c73f2bd2ac41ead44a82f.jpg',
 'BAL012',
 TRUE,
 375000.00,
 6,
 2),

('Systel Vita',
 'Balanza de diseño compacto y bajo perfil, ideal para mostradores reducidos.',
 'Systel',
 'Vita',
 'https://i.pinimg.com/474x/77/fe/fb/77fefb255deb2207452fb81ad50786ea.jpg',
 'BAL013',
 TRUE,
 135000.00,
 6,
 3),

('Systel Cuora Neo',
 'Balanza computadora con torre y pantalla a color para gestión de precios y ofertas.',
 'Systel',
 'Cuora Neo',
 'https://i.pinimg.com/474x/27/d2/b9/27d2b97c80417bfc2938d8c5272e71a2.jpg',
 'BAL014',
 TRUE,
 410000.00,
 6,
 4),




-- Comanderas / impresoras de tickets
('Epson TM-P20',
 'Impresora térmica portátil, ideal para comandas móviles y puntos de venta con Bluetooth.',
 'Epson',
 'TM-P20',
 'https://i.pinimg.com/736x/08/1b/f4/081bf4c6df50cc32c062eeef921411f9.jpg',
 'CMD001',
 TRUE,
 210000.00,
 7,
 1),

('Zebra ZD220T',
 'Impresora térmica compacta para etiquetas y tickets, ideal para comercios y logística.',
 'Zebra',
 'ZD220T',
 'https://i.pinimg.com/474x/4b/e9/d5/4be9d53f67eb1b9bdee4060cf9fcc2bf.jpg',
 'CMD002',
 TRUE,
 265000.00,
 7,
 2),

('Kretz Lexa Multipuerto',
 'Impresora de tickets multipuerto, permite conexión con varios dispositivos de punto de venta.',
 'Kretz',
 'Lexa Multipuerto',
 'https://i.pinimg.com/736x/b9/46/86/b946863448ec3d02b678d2cf54d26b0d.jpg',
 'CMD003',
 TRUE,
 295000.00,
 7,
 3),

('Global TP-POS80',
 'Impresora térmica de 80 mm para comandas de cocina y tickets de caja.',
 'Global',
 'TP-POS80',
 'https://i.pinimg.com/736x/6b/9a/25/6b9a2532dac33eab9ac312be507b78ed.jpg',
 'CMD004',
 TRUE,
 185000.00,
 7,
 4),

('Hasar HAS-181',
 'Impresora térmica de alta velocidad, ideal para restaurantes y comercios con alto volumen.',
 'Hasar',
 'HAS-181',
 'https://i.pinimg.com/474x/4f/73/80/4f7380e391f126d7e438b793bb18cbb9.jpg',
 'CMD005',
 TRUE,
 230000.00,
 7,
 5),

('Zebra ZT411',
 'Impresora industrial de etiquetas, robusta y diseñada para trabajo continuo.',
 'Zebra',
 'ZT411',
 'https://i.pinimg.com/736x/ad/a7/21/ada72156800739cdbb6a3ef5f5773f79.jpg',
 'CMD006',
 TRUE,
 610000.00,
 7,
 6),

('SATO 4B0TT ETIQUETAS',
 'Impresora de etiquetas para identificación de productos, logística y stock.',
 'SATO',
 '4B0TT',
 'https://i.pinimg.com/736x/41/6f/1b/416f1b0c119b8aac6ed1eeee34e0daf8.jpg',
 'CMD007',
 TRUE,
 390000.00,
 7,
 7),

('POS80-CX',
 'Impresora térmica de 80 mm, compacta, ideal para comandas y tickets en mostrador.',
 'Genérico',
 'POS80-CX',
 'https://i.pinimg.com/474x/60/b7/2e/60b72e51ab512106ce0ca44f8db89521.jpg',
 'CMD008',
 TRUE,
 170000.00,
 7,
 8),

-- Comanderas integradas
('Eltronic QTOUCH-10',
 'Terminal táctil QTOUCH de 10", integra sistema POS y emisión de comandas.',
 'Eltronic',
 'QTOUCH-10',
 'https://i.pinimg.com/474x/ac/d6/db/acd6dbaee999137bbf23aabcb2543c45.jpg',
 'CMD009',
 TRUE,
 520000.00,
 7,
 9),

('Eltronic QTOUCH-8',
 'Comandera táctil de 8", ideal para salones gastronómicos y autoservicios.',
 'Eltronic',
 'QTOUCH-8',
 'https://i.pinimg.com/736x/59/3f/57/593f57ebe3303989450d401f21d54498.jpg',
 'CMD010',
 TRUE,
 465000.00,
 7,
 10),




-- Papelería
('Papel térmico 80x80 mm',
 'Rollo de papel térmico 80 mm x 80 mm para impresoras POS de 80 mm. Alta sensibilidad y blanco intenso.',
 'Genérico',
 'ROL-80x80',
 'https://i.pinimg.com/736x/ac/b9/c5/acb9c5a12050695a0282910a9fe8442b.jpg',
 'INS001',
 TRUE,
 6500.00,
 8,
 1),

('Papel térmico 57x40 mm',
 'Rollo térmico de 57 mm x 40 mm para impresoras portátiles y calculadoras con impresión.',
 'Genérico',
 'ROL-57x40',
 'https://i.pinimg.com/736x/ac/b9/c5/acb9c5a12050695a0282910a9fe8442b.jpg',
 'INS002',
 TRUE,
 3200.00,
 8,
 2),

-- Etiquetas autoadhesivas e insumos
('Etiquetas autoadhesivas para balanzas 58x40',
 'Paquete de etiquetas térmicas directas 58x40 mm, compatibles con etiquetadoras de balanza.',
 'Genérico',
 'ETQ-58x40-BAL',
 'https://i.pinimg.com/474x/97/05/05/970505e54b203ed5c65c90275dedb8a2.jpg',
 'INS003',
 TRUE,
 18500.00,
 8,
 3),

('Etiquetas térmicas 100x50 mm',
 'Rollo de etiquetas térmicas directas 100x50 mm para impresoras de etiquetas.',
 'Genérico',
 'ETQ-100x50',
 'https://i.pinimg.com/736x/b8/22/7c/b8227c5ff0693513b83d884620bb1fdb.jpg',
 'INS004',
 TRUE,
 21000.00,
 8,
 4),

('Ribbon cera 110mm x 74m',
 'Cinta de transferencia térmica (cera) 110 mm x 74 m para etiquetas papel mate.',
 'Genérico',
 'RBN-110-74-CERA',
 'https://i.pinimg.com/736x/34/b1/5b/34b15bb11370038cf831e4e57ea15c7c.jpg',
 'INS005',
 TRUE,
 14500.00,
 8,
 5);

