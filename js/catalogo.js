// Catálogo de Carnicería Rodri.

window.CATEGORIAS = [
  { id: 'vacuno', nombre: 'Vacuno y Ternera', lema: 'Ternera de confianza y vaca madurada, cortada al momento.' },
  { id: 'cerdo', nombre: 'Cerdo e Ibérico', lema: 'Del lomo de cebo a las piezas ibéricas más jugosas.' },
  { id: 'aves', nombre: 'Pollo, aves', lema: 'Pollo fresco, pavo y conejo limpios y listos para cocinar.' },
  { id: 'cordero', nombre: 'Cordero', lema: 'Cordero lechal tierno, para la plancha o el horno.' },
  { id: 'elaborados', nombre: 'Elaborados', lema: 'Hechos aquí cada mañana, con nuestra propia receta.' },
  { id: 'charcuteria', nombre: 'Charcutería', lema: 'Jamón, embutidos y quesos cortados a tu gusto.' },
  { id: 'bebidas', nombre: 'Refrescos y Bebidas', lema: 'Para acompañar la comida: todo bien frío.' },
  { id: 'despensa', nombre: 'Despensa y Barbacoa', lema: 'Lo que no puede faltar para cocinar o encender la brasa.' },
]

// 👇 EL TRUCO: Ponemos el precio final calculado directamente en el texto
const PESO = [
  '250 gr - 4,23 €', 
  '500 gr - 8,45 €', 
  '750 gr - 12,68 €', 
  '1 kg - 16,90 €', 
  '1.5 kg - 25,35 €', 
  '2 kg - 33,80 €'
];

const UNIDADES = [
  '1 unidad - 1,20 €', 
  '2 unidades - 2,40 €', 
  '3 unidades - 3,60 €', 
  '4 unidades - 4,80 €', 
  '6 unidades - 7,20 €'
];

window.PRODUCTOS = [
  {
    id: 'filetes-ternera', cat: 'vacuno', img: 'filetes-ternera', etiqueta: 'Más pedido',
    nombre: 'Filetes de Ternera', desc: 'Tiernos y magros, cortados al grosor que prefieras.',
    cantidades: PESO, opcionLabel: 'Tipo de corte', opciones: ['Muy finos (plancha)', 'Grosor normal', 'Para empanar', 'Tacos para guiso', 'Filetes de babilla', 'Filetes de cadera', 'Filetes de tapa', 'Filetes de contra', 'Escalopines', 'Carne para fondue'],
  },
  {
    id: 'chuleton', cat: 'vacuno', img: 'chuleton', etiqueta: 'Para brasa',
    nombre: 'Entrecot o Chuletón', desc: 'Vaca con buena infiltración de grasa, ideal a la parrilla.',
    cantidades: ['1 pieza - 28,90 €', '2 piezas - 57,80 €', '4 piezas - 115,60 €', 'Corte mayor (1 kg) - 28,90 €'], 
    opcionLabel: 'Tipo de corte', opciones: ['Entrecot jugoso', 'Chuletón madurado con hueso', 'Corte grueso para brasa', 'Chuleta de lomo alto', 'Chuleta de lomo bajo', 'T-bone', 'Tomahawk', 'Costilla de vaca', 'Corte para piedra'],
  },
  {
    id: 'solomillo', cat: 'vacuno', img: 'solomillo',
    nombre: 'Solomillo de Ternera', desc: 'La pieza más tierna, en medallones o entera para asar.',
    cantidades: ['2 medallones - 34,90 €', '4 medallones - 69,80 €', '500 gr - 17,45 €'], 
    opcionLabel: 'Preparación', opciones: ['Medallones gruesos', 'Turnedós finos', 'Pieza entera para asar', 'Cortado para carpaccio', 'Solomillo en tacos', 'Filetes de solomillo', 'Chateaubriand'],
  },
  {
    id: 'picada', cat: 'vacuno', img: 'picada',
    nombre: 'Carne Picada', desc: 'Picada al momento delante de ti, sin aditivos.',
    cantidades: ['250 gr - 2,63 €', '500 gr - 5,25 €', '750 gr - 7,88 €', '1 kg - 10,50 €', '1.5 kg - 15,75 €', '2 kg - 21,00 €'], 
    opcionLabel: 'Variedad', opciones: ['Ternera 100%', 'Mixta ternera y cerdo', 'Cerdo 100%', 'Especial para albóndigas', 'Especial para boloñesa', 'Vacuno magro', 'Vacuno con más grasa', 'Picada para hamburguesas', 'Picada gruesa para rellenos'],
  },
  {
    id: 'guiso-ternera', cat: 'vacuno', img: 'guiso-ternera',
    nombre: 'Ternera para Guisar', desc: 'Cortes melosos para guisos lentos, estofados y cocidos.',
    cantidades: ['250 gr - 3,48 €', '500 gr - 6,95 €', '750 gr - 10,43 €', '1 kg - 13,90 €', '1.5 kg - 20,85 €', '2 kg - 27,80 €'], 
    opcionLabel: 'Pieza', opciones: ['Carrilleras de ternera', 'Rabo de toro troceado', 'Osobuco en rodajas', 'Morcillo en tacos', 'Aguja en tacos', 'Redondo de ternera', 'Huesos para caldo', 'Jarrete de ternera', 'Falda para guisar', 'Aleta para rellenar', 'Pecho de ternera', 'Espaldilla en tacos', 'Carne para cocido'],
  },
  {
    id: 'lomo-cerdo', cat: 'cerdo', img: 'lomo-cerdo', etiqueta: 'Más pedido',
    nombre: 'Lomo de Cerdo', desc: 'Fresco en filetes o con nuestro adobo casero de pimentón.',
    cantidades: ['250 gr - 2,48 €', '500 gr - 4,95 €', '750 gr - 7,43 €', '1 kg - 9,90 €', '1.5 kg - 14,85 €', '2 kg - 19,80 €'], 
    opcionLabel: 'Variedad', opciones: ['Fresco en filetes', 'Adobado casero', 'Cinta de lomo entera', 'Lomo para asar'],
  },
  {
    id: 'costillas', cat: 'cerdo', img: 'costillas',
    nombre: 'Costillas de Cerdo', desc: 'Costilla carnosa, en tiras para el horno o troceada.',
    cantidades: ['1 tira - 7,50 €', '1 kg - 7,50 €', '1.5 kg - 11,25 €', '2 kg - 15,00 €'], 
    opcionLabel: 'Preparación', opciones: ['Enteras en tiras', 'Troceadas para guiso / horno', 'Adobadas caseras', 'Marinadas barbacoa'],
  },
  {
    id: 'iberico', cat: 'cerdo', img: 'iberico', etiqueta: 'Ibérico',
    nombre: 'Ibérico Selecto', desc: 'Secreto, presa y pluma: las joyas del cerdo ibérico.',
    cantidades: ['500 gr - 12,45 €', '1 kg - 24,90 €', '1.5 kg - 37,35 €'], 
    opcionLabel: 'Pieza', opciones: ['Secreto ibérico', 'Presa ibérica', 'Pluma ibérica', 'Abanico ibérico', 'Lagarto ibérico', 'Carrillada ibérica'],
  },
  {
    id: 'chuletas-cerdo', cat: 'cerdo', img: 'chuletas-cerdo',
    nombre: 'Chuletas, Panceta y Solomillo', desc: 'Los clásicos del cerdo para el día a día.',
    cantidades: ['250 gr - 2,23 €', '500 gr - 4,45 €', '750 gr - 6,68 €', '1 kg - 8,90 €', '1.5 kg - 13,35 €', '2 kg - 17,80 €'], 
    opcionLabel: 'Pieza', opciones: ['Chuletas de aguja', 'Chuletas de lomo', 'Panceta en tiras', 'Panceta para torreznos', 'Solomillo de cerdo', 'Codillo', 'Manitas de cerdo'],
  },
  {
    id: 'pollo', cat: 'aves', img: 'pollo', etiqueta: 'Más pedido',
    nombre: 'Pollo Fresco', desc: 'Pollo entero o en piezas, limpio y preparado a tu gusto.',
    cantidades: ['500 gr - 3,25 €', '1 kg - 6,50 €', '1.5 kg - 9,75 €', '2 kg - 13,00 €', '1 pollo entero - 6,50 €', '1 pollo de corral - 6,50 €'], 
    opcionLabel: 'Preparación', opciones: ['Pechugas en filetes', 'Pechugas enteras', 'Muslos y contramuslos', 'Contramuslo deshuesado', 'Troceado para guisar', 'Abierto para asar'],
  },
  {
    id: 'alitas', cat: 'aves', img: 'alitas',
    nombre: 'Alitas, Jamoncitos y Pavo', desc: 'Para picar, para el horno o para una cena ligera.',
    cantidades: ['250 gr - 1,48 €', '500 gr - 2,95 €', '750 gr - 4,43 €', '1 kg - 5,90 €', '1.5 kg - 8,85 €', '2 kg - 11,80 €'], 
    opcionLabel: 'Pieza', opciones: ['Alitas enteras', 'Alitas partidas', 'Alitas adobadas picantes', 'Jamoncitos de pollo', 'Filetes de pechuga de pavo', 'Contramuslo de pavo'],
  },
  {
    id: 'conejo', cat: 'aves', img: 'conejo',
    nombre: 'Conejo y Codorniz', desc: 'Imprescindibles para la paella, el arroz o el ajillo.',
    cantidades: ['4 codornices - 11,50 €', '6 codornices - 11,50 €'], 
    opcionLabel: 'Preparación', opciones: ['Troceado para paella', 'Troceado para guisar', 'Entero sin trocear', 'Abierto para la plancha'],
  },
  {
    id: 'cordero', cat: 'cordero', img: 'cordero',
    nombre: 'Cordero Lechal', desc: 'Chuletas, pierna o paletilla de cordero tierno.',
    cantidades: ['500 gr de chuletas - 11,00 €', '1 kg de chuletas - 22,00 €'], 
    opcionLabel: 'Preparación', opciones: ['Chuletas para plancha', 'Chuletas gruesas para brasa', 'Costillar entero', 'Pierna para asar', 'Paletilla para asar', 'Troceado para guisar'],
  },
  {
    id: 'hamburguesas', cat: 'elaborados', img: 'hamburguesas', etiqueta: 'De la casa',
    nombre: 'Hamburguesas Artesanas', desc: 'Formadas a mano cada mañana con carne recién picada.',
    cantidades: ['2 unidades - 4,20 €', '4 unidades - 8,40 €', '6 unidades - 12,60 €', '8 unidades - 16,80 €', '12 unidades - 25,20 €'], 
    opcionLabel: 'Tipo / sabor', opciones: ['Vacuno 100%', 'Buey madurado', 'Ibérica', 'Pollo y espinacas', 'Mixta con especias', 'Rellena de queso de cabra', 'Con bacon y cheddar'],
  },
  {
    id: 'embutido-fresco', cat: 'elaborados', img: 'embutido-fresco', etiqueta: 'De la casa',
    nombre: 'Chorizo, Salchichas y Morcilla', desc: 'Embutido fresco de elaboración propia, perfecto a la brasa.',
    cantidades: ['250 gr - 2,38 €', '500 gr - 4,75 €', '1 kg - 9,50 €', '6 unidades - 9,50 €', '12 unidades - 19,00 €'], 
    opcionLabel: 'Variedad', opciones: ['Chorizo fresco dulce', 'Chorizo fresco picante', 'Chorizo criollo', 'Salchichas frescas de cerdo', 'Salchichas de pollo', 'Longaniza fresca', 'Butifarra', 'Morcilla de cebolla', 'Morcilla de arroz'],
  },
  {
    id: 'pinchos', cat: 'elaborados', img: 'pinchos',
    nombre: 'Pinchos Morunos y Brochetas', desc: 'Marinados con nuestras especias, listos para la plancha.',
    cantidades: ['4 unidades - 6,40 €', '8 unidades - 12,80 €', '12 unidades - 19,20 €', '1 kg - 25,60 €'], 
    opcionLabel: 'Variedad', opciones: ['Pincho moruno de cerdo', 'Pincho moruno de pollo', 'Pincho de cordero', 'Brocheta de ternera con verduras', 'Brocheta mixta', 'Brocheta de pollo al limón'],
  },
  {
    id: 'albondigas', cat: 'elaborados', img: 'albondigas',
    nombre: 'Albóndigas, Flamenquines y Empanados', desc: 'Preparados caseros listos para freír u hornear.',
    cantidades: ['6 unidades - 12,50 €', '12 unidades - 25,00 €', '500 gr - 6,25 €', '1 kg - 12,50 €'], 
    opcionLabel: 'Producto', opciones: ['Albóndigas de ternera', 'Albóndigas mixtas', 'Flamenquines de jamón y queso', 'San Jacobos', 'Filetes rusos', 'Cordon bleu de pollo', 'Pechugas de pollo empanadas', 'Nuggets caseros'],
  },
  {
    id: 'jamon', cat: 'charcuteria', img: 'jamon', etiqueta: 'Ibérico',
    nombre: 'Jamón Serrano e Ibérico', desc: 'Cortado a cuchillo o a máquina, en lonchas finísimas.',
    cantidades: ['100 gr - 5,50 €', '250 gr - 13,75 €', '500 gr - 27,50 €', '1 kg - 55,00 €'], 
    opcionLabel: 'Producto', opciones: ['Jamón serrano en lonchas', 'Jamón ibérico de cebo', 'Jamón ibérico de bellota', 'Paleta ibérica', 'Taquitos de jamón', 'Huesos de jamón para caldo'],
  },
  {
    id: 'embutidos', cat: 'charcuteria', img: 'embutidos',
    nombre: 'Embutidos Curados', desc: 'Chorizo, salchichón y lomo ibérico de curación lenta.',
    cantidades: ['150 gr - 4,80 €', '250 gr - 8,00 €', '500 gr - 16,00 €'], 
    opcionLabel: 'Producto', opciones: ['Chorizo ibérico', 'Salchichón ibérico', 'Lomo embuchado ibérico', 'Fuet', 'Sobrasada', 'Morcón', 'Cecina de León'],
  },
  {
    id: 'quesos', cat: 'charcuteria', img: 'quesos',
    nombre: 'Quesos', desc: 'Una selección de quesos nacionales para cortar a tu gusto.',
    cantidades: ['250 gr - 5,25 €', '500 gr - 10,50 €', '1 kg - 21,00 €', '1 cuña - 21,00 €'], 
    opcionLabel: 'Variedad', opciones: ['Manchego curado', 'Manchego semicurado', 'Queso de cabra', 'Queso viejo en aceite', 'Queso tierno', 'Queso azul / Cabrales', 'Torta del Casar'],
  },
  {
    id: 'fiambres', cat: 'charcuteria', img: 'fiambres',
    nombre: 'Fiambres y Loncheados', desc: 'Para bocadillos, desayunos y meriendas.',
    cantidades: ['150 gr - 2,10 €', '250 gr - 3,50 €', '500 gr - 7,00 €', '1 kg - 14,00 €'], 
    opcionLabel: 'Producto', opciones: ['Jamón cocido extra', 'Pechuga de pavo', 'Mortadela', 'Chopped', 'Queso en lonchas', 'Bacon ahumado', 'Salami'],
  },
  {
    id: 'refrescos', cat: 'bebidas', img: 'refrescos', etiqueta: 'Bien frío',
    nombre: 'Refrescos', desc: 'Latas y botellas de tus refrescos de siempre.',
    cantidades: ['1 lata - 1,20 €', 'Pack 6 latas - 7,20 €', 'Pack 12 latas - 14,40 €', '1 botella 2 L - 1,20 €', '2 botellas 2 L - 2,40 €'], 
    opcionLabel: 'Sabor', opciones: ['Coca-Cola', 'Coca-Cola Zero', 'Fanta Naranja', 'Fanta Limón', 'Sprite', 'Kas Naranja', 'Pepsi', 'Aquarius Limón', 'Aquarius Naranja', 'Nestea', 'Schweppes Tónica', 'Bebida energética'],
  },
  {
    id: 'cervezas-vinos', cat: 'bebidas', img: 'cervezas-vinos',
    nombre: 'Cervezas y Vinos', desc: 'Para la barbacoa, la comida del domingo o una celebración.',
    cantidades: ['1 unidad - 1,50 €', 'Pack 6 - 9,00 €', 'Pack 12 - 18,00 €', 'Caja 24 - 36,00 €'], 
    opcionLabel: 'Bebida', opciones: ['Cerveza Mahou 5 Estrellas', 'Cerveza Estrella Galicia', 'Cerveza Cruzcampo', 'Cerveza sin alcohol', 'Cerveza 0,0 tostada', 'Vino tinto Rioja crianza', 'Vino tinto Ribera del Duero', 'Vino blanco Rueda', 'Vino rosado', 'Tinto de verano', 'Sangría'],
  },
  {
    id: 'agua-zumos', cat: 'bebidas', img: 'agua-zumos',
    nombre: 'Agua y Zumos', desc: 'Agua mineral, con gas y zumos para toda la familia.',
    cantidades: ['1 unidad - 1,00 €', 'Pack 6 - 6,00 €', 'Pack 6 x 1,5 L - 6,00 €', 'Garrafa 5 L - 1,00 €'], 
    opcionLabel: 'Bebida', opciones: ['Agua mineral 0,5 L', 'Agua mineral 1,5 L', 'Agua con gas', 'Zumo de naranja', 'Zumo de melocotón', 'Zumo de piña', 'Mosto'],
  },
  {
    id: 'despensa', cat: 'despensa', img: 'despensa',
    nombre: 'Huevos, Pan y Aceite', desc: 'Básicos de despensa para completar tu compra.',
    cantidades: ['1 unidad - 4,50 €', '2 unidades - 9,00 €', '3 unidades - 13,50 €', '4 unidades - 18,00 €', '6 unidades - 27,00 €'], 
    opcionLabel: 'Producto', opciones: ['Huevos camperos (docena)', 'Huevos camperos (media docena)', 'Pan de pueblo', 'Barra de pan', 'Aceite de oliva virgen extra 1 L', 'Aceite de oliva virgen extra 5 L', 'Pimentón de la Vera', 'Sal gorda'],
  },
  {
    id: 'barbacoa', cat: 'despensa', img: 'barbacoa', etiqueta: 'Para brasa',
    nombre: 'Carbón y Barbacoa', desc: 'Todo para encender la brasa sin complicaciones.',
    cantidades: ['1 unidad - 7,50 €', '2 unidades - 15,00 €', '3 unidades - 22,50 €', '4 unidades - 30,00 €', '6 unidades - 45,00 €'], 
    opcionLabel: 'Producto', opciones: ['Saco de carbón vegetal 3 kg', 'Saco de carbón vegetal 5 kg', 'Pastillas de encendido', 'Leña de encina', 'Bandejas de aluminio', 'Palillos para brochetas'],
  },
  {
    id: 'salsas', cat: 'despensa', img: 'salsas',
    nombre: 'Salsas y Adobos', desc: 'El toque final para tus carnes.',
    cantidades: ['1 unidad - 3,20 €', '2 unidades - 6,40 €', '3 unidades - 9,60 €', '4 unidades - 12,80 €', '6 unidades - 19,20 €'], 
    opcionLabel: 'Producto', opciones: ['Alioli casero', 'Mojo picón', 'Chimichurri', 'Salsa barbacoa', 'Adobo para pinchos', 'Sazonador para carne', 'Mostaza antigua'],
  },
]

// Factores orientativos por opción para pruebas. 1 = precio base del producto.
window.FACTORES_OPCIONES = {
  'filetes-ternera': {'Tacos para guiso': 0.90},
  chuleton: {'Entrecot jugoso': 1, 'Chuletón madurado con hueso': 1.18, 'Corte grueso para brasa': 1.08, 'Chuleta de lomo alto': 0.95},
  solomillo: {'Medallones gruesos': 1, 'Turnedós finos': 1, 'Pieza entera para asar': 0.96, 'Cortado para carpaccio': 1.05},
  'guiso-ternera': {'Carrilleras de ternera': 1.25, 'Rabo de toro troceado': 1.15, 'Osobuco en rodajas': 1.05, 'Morcillo en tacos': 0.95, 'Aguja en tacos': 0.90, 'Redondo de ternera': 1.05, 'Huesos para caldo': 0.35},
  'lomo-cerdo': {'Fresco en filetes': 1, 'Adobado casero': 1.08, 'Cinta de lomo entera': 1.02, 'Lomo para asar': 1.05},
  costillas: {'Enteras en tiras': 1, 'Troceadas para guiso / horno': 1, 'Adobadas caseras': 1.08, 'Marinadas barbacoa': 1.12},
  iberico: {'Secreto ibérico': 1.15, 'Presa ibérica': 1.30, 'Pluma ibérica': 1.25, 'Abanico ibérico': 1.05, 'Lagarto ibérico': 0.95, 'Carrillada ibérica': 0.90},
  'chuletas-cerdo': {'Chuletas de aguja': 0.95, 'Chuletas de lomo': 1.05, 'Panceta en tiras': 0.90, 'Panceta para torreznos': 0.95, 'Solomillo de cerdo': 1.45, 'Codillo': 0.85, 'Manitas de cerdo': 0.65},
  pollo: {'Pechugas en filetes': 1.20, 'Pechugas enteras': 1.15, 'Muslos y contramuslos': 0.90, 'Contramuslo deshuesado': 1.10, 'Troceado para guisar': 0.95, 'Abierto para asar': 1},
  alitas: {'Alitas enteras': 1, 'Alitas partidas': 1, 'Alitas adobadas picantes': 1.10, 'Jamoncitos de pollo': 1.05, 'Filetes de pechuga de pavo': 1.30, 'Contramuslo de pavo': 1.15},
  conejo: {'Troceado para paella': 1, 'Troceado para guisar': 1, 'Entero sin trocear': 1, 'Abierto para la plancha': 1.05},
  cordero: {'Chuletas para plancha': 1, 'Chuletas gruesas para brasa': 1.10, 'Costillar entero': 0.95, 'Pierna para asar': 0.95, 'Paletilla para asar': 1.05, 'Troceado para guisar': 0.90},
  hamburguesas: {'Vacuno 100%': 1, 'Buey madurado': 1.35, 'Ibérica': 1.25, 'Pollo y espinacas': 0.90, 'Mixta con especias': 0.95, 'Rellena de queso de cabra': 1.15, 'Con bacon y cheddar': 1.15},
  'embutido-fresco': {'Chorizo fresco dulce': 1, 'Chorizo fresco picante': 1, 'Chorizo criollo': 1.05, 'Salchichas frescas de cerdo': 0.95, 'Salchichas de pollo': 0.95, 'Longaniza fresca': 1, 'Butifarra': 1.05, 'Morcilla de cebolla': 0.90, 'Morcilla de arroz': 0.90},
  pinchos: {'Pincho moruno de cerdo': 1, 'Pincho moruno de pollo': 0.90, 'Pincho de cordero': 1.25, 'Brocheta de ternera con verduras': 1.20, 'Brocheta mixta': 1.05, 'Brocheta de pollo al limón': 0.95},
  albondigas: {'Albóndigas de ternera': 1.10, 'Albóndigas mixtas': 1, 'Flamenquines de jamón y queso': 1.15, 'San Jacobos': 1.05, 'Filetes rusos': 1, 'Cordon bleu de pollo': 1.15, 'Pechugas de pollo empanadas': 1.05, 'Nuggets caseros': 0.95},
  jamon: {'Jamón serrano en lonchas': 1, 'Jamón ibérico de cebo': 1.65, 'Jamón ibérico de bellota': 2.70, 'Paleta ibérica': 1.35, 'Taquitos de jamón': 0.95, 'Huesos de jamón para caldo': 0.25},
  embutidos: {'Chorizo ibérico': 1, 'Salchichón ibérico': 1, 'Lomo embuchado ibérico': 1.35, 'Fuet': 0.80, 'Sobrasada': 0.85, 'Morcón': 1.20, 'Cecina de León': 1.50},
  quesos: {'Manchego curado': 1.15, 'Manchego semicurado': 1, 'Queso de cabra': 1.05, 'Queso viejo en aceite': 1.20, 'Queso tierno': 0.85, 'Queso azul / Cabrales': 1.10, 'Torta del Casar': 1.35},
  fiambres: {'Jamón cocido extra': 1, 'Pechuga de pavo': 1.05, 'Mortadela': 0.80, 'Chopped': 0.75, 'Queso en lonchas': 1.10, 'Bacon ahumado': 1.15, 'Salami': 0.95},
  refrescos: {'Coca-Cola': 1, 'Coca-Cola Zero': 1, 'Fanta Naranja': 0.95, 'Fanta Limón': 0.95, 'Sprite': 0.95, 'Kas Naranja': 0.90, 'Pepsi': 0.90, 'Aquarius Limón': 1.10, 'Aquarius Naranja': 1.10, 'Nestea': 1.10, 'Schweppes Tónica': 1.15, 'Bebida energética': 1.40},
  'cervezas-vinos': {'Cerveza Mahou 5 Estrellas': 1, 'Cerveza Estrella Galicia': 1.10, 'Cerveza Cruzcampo': 0.90, 'Cerveza sin alcohol': 0.95, 'Cerveza 0,0 tostada': 1.05, 'Vino tinto Rioja crianza': 2.20, 'Vino tinto Ribera del Duero': 2.60, 'Vino blanco Rueda': 2, 'Vino rosado': 1.80, 'Tinto de verano': 1.10, 'Sangría': 1.20},
  'agua-zumos': {'Agua mineral 0,5 L': 0.65, 'Agua mineral 1,5 L': 1, 'Agua con gas': 1.10, 'Zumo de naranja': 1.35, 'Zumo de melocotón': 1.15, 'Zumo de piña': 1.15, 'Mosto': 1.20},
  despensa: {'Huevos camperos (docena)': 1.35, 'Huevos camperos (media docena)': 0.70, 'Pan de pueblo': 1.25, 'Barra de pan': 0.30, 'Aceite de oliva virgen extra 1 L': 2.20, 'Aceite de oliva virgen extra 5 L': 8.50, 'Pimentón de la Vera': 0.90, 'Sal gorda': 0.35},
  barbacoa: {'Saco de carbón vegetal 3 kg': 0.85, 'Saco de carbón vegetal 5 kg': 1.35, 'Pastillas de encendido': 0.25, 'Leña de encina': 0.75, 'Bandejas de aluminio': 0.20, 'Palillos para brochetas': 0.10},
  salsas: {'Alioli casero': 1, 'Mojo picón': 1, 'Chimichurri': 1.05, 'Salsa barbacoa': 0.90, 'Adobo para pinchos': 0.85, 'Sazonador para carne': 0.75, 'Mostaza antigua': 1.10}
};

// Precios base para la cesta (€ por kg o por unidad)
const PRECIOS = {
  'filetes-ternera': '16,90 €/kg', chuleton: '28,90 €/kg', solomillo: '34,90 €/kg', picada: '10,50 €/kg',
  'guiso-ternera': '13,90 €/kg', 'lomo-cerdo': '9,90 €/kg', costillas: '7,50 €/kg', iberico: '24,90 €/kg',
  'chuletas-cerdo': '8,90 €/kg', pollo: '6,50 €/kg', alitas: '5,90 €/kg', conejo: '11,50 €/kg',
  cordero: '22,00 €/kg', hamburguesas: '2,10 €/ud', 'embutido-fresco': '9,50 €/kg', pinchos: '1,60 €/ud',
  albondigas: '12,50 €/kg', jamon: '55,00 €/kg', embutidos: '32,00 €/kg', quesos: '21,00 €/kg',
  fiambres: '14,00 €/kg', refrescos: '1,20 €/ud', 'cervezas-vinos': '1,50 €/ud', 'agua-zumos': '1,00 €/ud',
  despensa: '4,50 €/ud', barbacoa: '7,50 €/ud', salsas: '3,20 €/ud',
}
window.PRODUCTOS.forEach((p) => { p.precio = PRECIOS[p.id] })
