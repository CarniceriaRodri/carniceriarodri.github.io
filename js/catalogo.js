// Catálogo de Carnicería Rodri.
// Para añadir o quitar productos basta con editar este archivo: cada producto
// pertenece a una categoría, tiene una foto en /img/productos/<img>.jpg,
// una lista de cantidades y una lista de opciones (corte, preparación, sabor…).

window.CATEGORIAS = [
  { id: 'vacuno', nombre: 'Vacuno y Ternera', lema: 'Ternera de confianza y vaca madurada, cortada al momento.' },
  { id: 'cerdo', nombre: 'Cerdo e Ibérico', lema: 'Del lomo de cebo a las piezas ibéricas más jugosas.' },
  { id: 'aves', nombre: 'Pollo, Aves y Conejo', lema: 'Pollo fresco, pavo y conejo limpios y listos para cocinar.' },
  { id: 'cordero', nombre: 'Cordero', lema: 'Cordero lechal tierno, para la plancha o el horno.' },
  { id: 'elaborados', nombre: 'Elaborados de la Casa', lema: 'Hechos aquí cada mañana, con nuestra propia receta.' },
  { id: 'charcuteria', nombre: 'Charcutería', lema: 'Jamón, embutidos y quesos cortados a tu gusto.' },
  { id: 'bebidas', nombre: 'Refrescos y Bebidas', lema: 'Para acompañar la comida: todo bien frío.' },
  { id: 'despensa', nombre: 'Despensa y Barbacoa', lema: 'Lo que no puede faltar para cocinar o encender la brasa.' },
]

// Cantidades predefinidas por peso y unidad
const PESO = [
  { texto: '250 gr', valor: 0.25, unidad: 'kg' },
  { texto: '500 gr', valor: 0.5, unidad: 'kg' },
  { texto: '750 gr', valor: 0.75, unidad: 'kg' },
  { texto: '1 kg', valor: 1, unidad: 'kg' },
  { texto: '1.5 kg', valor: 1.5, unidad: 'kg' },
  { texto: '2 kg', valor: 2, unidad: 'kg' }
];

const UNIDADES = [
  { texto: '1 unidad', valor: 1, unidad: 'ud' },
  { texto: '2 unidades', valor: 2, unidad: 'ud' },
  { texto: '3 unidades', valor: 3, unidad: 'ud' },
  { texto: '4 unidades', valor: 4, unidad: 'ud' }
];

window.PRODUCTOS = [
  // ——— Vacuno ———
  {
    id: 'filetes-ternera', cat: 'vacuno', img: 'filetes-ternera', etiqueta: 'Más pedido',
    nombre: 'Filetes de Ternera',
    desc: 'Tiernos y magros, cortados al grosor que prefieras.',
    cantidades: PESO,
    opcionLabel: 'Tipo de corte',
    opciones: ['Muy finos (plancha)', 'Grosor normal', 'Para empanar', 'Tacos para guiso'],
  },
  {
    id: 'chuleton', cat: 'vacuno', img: 'chuleton', etiqueta: 'Para brasa',
    nombre: 'Entrecot o Chuletón',
    desc: 'Vaca con buena infiltración de grasa, ideal a la parrilla.',
    cantidades: [
      { texto: '1 pieza (aprox. 400 g)', valor: 1, unidad: 'ud' },
      { texto: '2 piezas', valor: 2, unidad: 'ud' },
      { texto: '4 piezas', valor: 4, unidad: 'ud' },
      { texto: 'Corte mayor (1 kg)', valor: 1, unidad: 'kg' }
    ],
    opcionLabel: 'Tipo de corte',
    opciones: ['Entrecot jugoso', 'Chuletón madurado con hueso', 'Corte grueso para brasa', 'Chuleta de lomo alto'],
  },
  {
    id: 'solomillo', cat: 'vacuno', img: 'solomillo',
    nombre: 'Solomillo de Ternera',
    desc: 'La pieza más tierna, en medallones o entera para asar.',
    cantidades: [
      { texto: '2 medallones', valor: 2, unidad: 'ud' },
      { texto: '4 medallones', valor: 4, unidad: 'ud' },
      { texto: '500 gr', valor: 0.5, unidad: 'kg' },
      { texto: 'Pieza entera', valor: 1, unidad: 'ud' }
    ],
    opcionLabel: 'Preparación',
    opciones: ['Medallones gruesos', 'Turnedós finos', 'Pieza entera para asar', 'Cortado para carpaccio'],
  },
  {
    id: 'picada', cat: 'vacuno', img: 'picada',
    nombre: 'Carne Picada',
    desc: 'Picada al momento delante de ti, sin aditivos.',
    cantidades: PESO,
    opcionLabel: 'Mezcla',
    opciones: ['Ternera 100%', 'Mixta ternera y cerdo', 'Cerdo 100%', 'Especial para albóndigas', 'Especial para boloñesa'],
  },
  {
    id: 'guiso-ternera', cat: 'vacuno', img: 'guiso-ternera',
    nombre: 'Ternera para Guisar',
    desc: 'Cortes melosos para guisos lentos, estofados y cocidos.',
    cantidades: PESO,
    opcionLabel: 'Pieza',
    opciones: ['Carrilleras de ternera', 'Rabo de toro troceado', 'Osobuco en rodajas', 'Morcillo en tacos', 'Aguja en tacos', 'Redondo de ternera', 'Huesos para caldo'],
  },

  // ——— Cerdo ———
  {
    id: 'lomo-cerdo', cat: 'cerdo', img: 'lomo-cerdo', etiqueta: 'Más pedido',
    nombre: 'Lomo de Cerdo',
    desc: 'Fresco en filetes o con nuestro adobo casero de pimentón.',
    cantidades: PESO,
    opcionLabel: 'Variedad',
    opciones: ['Fresco en filetes', 'Adobado casero', 'Cinta de lomo entera', 'Lomo para asar'],
  },
  {
    id: 'costillas', cat: 'cerdo', img: 'costillas',
    nombre: 'Costillas de Cerdo',
    desc: 'Costilla carnosa, en tiras para el horno o troceada.',
    cantidades: [
      { texto: '1 tira (aprox. 600 g)', valor: 1, unidad: 'ud' },
      { texto: '1 kg', valor: 1, unidad: 'kg' },
      { texto: '1.5 kg', valor: 1.5, unidad: 'kg' },
      { texto: '2 kg', valor: 2, unidad: 'kg' }
    ],
    opcionLabel: 'Preparación',
    opciones: ['Enteras en tiras', 'Troceadas para guiso / horno', 'Adobadas caseras', 'Marinadas barbacoa'],
  },
  {
    id: 'iberico', cat: 'cerdo', img: 'iberico', etiqueta: 'Ibérico',
    nombre: 'Ibérico Selecto',
    desc: 'Secreto, presa y pluma: las joyas del cerdo ibérico.',
    cantidades: [
      { texto: '500 gr', valor: 0.5, unidad: 'kg' },
      { texto: '1 kg', valor: 1, unidad: 'kg' },
      { texto: '1.5 kg', valor: 1.5, unidad: 'kg' }
    ],
    opcionLabel: 'Pieza',
    opciones: ['Secreto ibérico', 'Presa ibérica', 'Pluma ibérica', 'Abanico ibérico', 'Lagarto ibérico', 'Carrillada ibérica'],
  },
  {
    id: 'chuletas-cerdo', cat: 'cerdo', img: 'chuletas-cerdo',
    nombre: 'Chuletas, Panceta y Solomillo',
    desc: 'Los clásicos del cerdo para el día a día.',
    cantidades: PESO,
    opcionLabel: 'Pieza',
    opciones: ['Chuletas de aguja', 'Chuletas de lomo', 'Panceta en tiras', 'Panceta para torreznos', 'Solomillo de cerdo', 'Codillo', 'Manitas de cerdo'],
  },

  // ——— Aves y conejo ———
  {
    id: 'pollo', cat: 'aves', img: 'pollo', etiqueta: 'Más pedido',
    nombre: 'Pollo Fresco',
    desc: 'Pollo entero o en piezas, limpio y preparado a tu gusto.',
    cantidades: [
      { texto: '500 gr', valor: 0.5, unidad: 'kg' },
      { texto: '1 kg', valor: 1, unidad: 'kg' },
      { texto: '1.5 kg', valor: 1.5, unidad: 'kg' },
      { texto: '2 kg', valor: 2, unidad: 'kg' },
      { texto: '1 pollo entero', valor: 1, unidad: 'ud' },
      { texto: '1 pollo de corral', valor: 1, unidad: 'ud' }
    ],
    opcionLabel: 'Preparación',
    opciones: ['Pechugas en filetes', 'Pechugas enteras', 'Muslos y contramuslos', 'Contramuslo deshuesado', 'Troceado para guisar', 'Abierto para asar'],
  },
  {
    id: 'alitas', cat: 'aves', img: 'alitas',
    nombre: 'Alitas, Jamoncitos y Pavo',
    desc: 'Para picar, para el horno o para una cena ligera.',
    cantidades: PESO,
    opcionLabel: 'Pieza',
    opciones: ['Alitas enteras', 'Alitas partidas', 'Alitas adobadas picantes', 'Jamoncitos de pollo', 'Filetes de pechuga de pavo', 'Contramuslo de pavo'],
  },
  {
    id: 'conejo', cat: 'aves', img: 'conejo',
    nombre: 'Conejo y Codorniz',
    desc: 'Imprescindibles para la paella, el arroz o el ajillo.',
    cantidades: [
      { texto: 'Medio conejo', valor: 1, unidad: 'ud' },
      { texto: '1 conejo entero', valor: 1, unidad: 'ud' },
      { texto: '4 codornices', valor: 4, unidad: 'ud' },
      { texto: '6 codornices', valor: 6, unidad: 'ud' }
    ],
    opcionLabel: 'Preparación',
    opciones: ['Troceado para paella', 'Troceado para guisar', 'Entero sin trocear', 'Abierto para la plancha'],
  },

  // ——— Cordero ———
  {
    id: 'cordero', cat: 'cordero', img: 'cordero',
    nombre: 'Cordero Lechal',
    desc: 'Chuletas, pierna o paletilla de cordero tierno.',
    cantidades: [
      { texto: '500 gr de chuletas', valor: 0.5, unidad: 'kg' },
      { texto: '1 kg de chuletas', valor: 1, unidad: 'kg' },
      { texto: '1 pierna entera', valor: 1, unidad: 'ud' },
      { texto: '1 paletilla entera', valor: 1, unidad: 'ud' },
      { texto: 'Medio cordero', valor: 1, unidad: 'ud' }
    ],
    opcionLabel: 'Preparación',
    opciones: ['Chuletas para plancha', 'Chuletas gruesas para brasa', 'Costillar entero', 'Pierna para asar', 'Paletilla para asar', 'Troceado para guisar'],
  },

  // ——— Elaborados ———
  {
    id: 'hamburguesas', cat: 'elaborados', img: 'hamburguesas', etiqueta: 'De la casa',
    nombre: 'Hamburguesas Artesanas',
    desc: 'Formadas a mano cada mañana con carne recién picada.',
    cantidades: [
      { texto: '2 unidades', valor: 2, unidad: 'ud' },
      { texto: '4 unidades', valor: 4, unidad: 'ud' },
      { texto: '6 unidades', valor: 6, unidad: 'ud' },
      { texto: '8 unidades', valor: 8, unidad: 'ud' },
      { texto: '12 unidades', valor: 12, unidad: 'ud' }
    ],
    opcionLabel: 'Tipo / sabor',
    opciones: ['Vacuno 100%', 'Buey madurado', 'Ibérica', 'Pollo y espinacas', 'Mixta con especias', 'Rellena de queso de cabra', 'Con bacon y cheddar'],
  },
  {
    id: 'embutido-fresco', cat: 'elaborados', img: 'embutido-fresco', etiqueta: 'De la casa',
    nombre: 'Chorizo, Salchichas y Morcilla',
    desc: 'Embutido fresco de elaboración propia, perfecto a la brasa.',
    cantidades: [
      { texto: '250 gr', valor: 0.25, unidad: 'kg' },
      { texto: '500 gr', valor: 0.5, unidad: 'kg' },
      { texto: '1 kg', valor: 1, unidad: 'kg' },
      { texto: '6 unidades', valor: 6, unidad: 'ud' },
      { texto: '12 unidades', valor: 12, unidad: 'ud' }
    ],
    opcionLabel: 'Variedad',
    opciones: ['Chorizo fresco dulce', 'Chorizo fresco picante', 'Chorizo criollo', 'Salchichas frescas de cerdo', 'Salchichas de pollo', 'Longaniza fresca', 'Butifarra', 'Morcilla de cebolla', 'Morcilla de arroz'],
  },
  {
    id: 'pinchos', cat: 'elaborados', img: 'pinchos',
    nombre: 'Pinchos Morunos y Brochetas',
    desc: 'Marinados con nuestras especias, listos para la plancha.',
    cantidades: [
      { texto: '4 unidades', valor: 4, unidad: 'ud' },
      { texto: '8 unidades', valor: 8, unidad: 'ud' },
      { texto: '12 unidades', valor: 12, unidad: 'ud' },
      { texto: '1 kg', valor: 1, unidad: 'kg' }
    ],
    opcionLabel: 'Variedad',
    opciones: ['Pincho moruno de cerdo', 'Pincho moruno de pollo', 'Pincho de cordero', 'Brocheta de ternera con verduras', 'Brocheta mixta', 'Brocheta de pollo al limón'],
  },
  {
    id: 'albondigas', cat: 'elaborados', img: 'albondigas',
    nombre: 'Albóndigas, Flamenquines y Empanados',
    desc: 'Preparados caseros listos para freír u hornear.',
    cantidades: [
      { texto: '6 unidades', valor: 6, unidad: 'ud' },
      { texto: '12 unidades', valor: 12, unidad: 'ud' },
      { texto: '500 gr', valor: 0.5, unidad: 'kg' },
      { texto: '1 kg', valor: 1, unidad: 'kg' }
    ],
    opcionLabel: 'Producto',
    opciones: ['Albóndigas de ternera', 'Albóndigas mixtas', 'Flamenquines de jamón y queso', 'San Jacobos', 'Filetes rusos', 'Cordon bleu de pollo', 'Pechugas de pollo empanadas', 'Nuggets caseros'],
  },

  // ——— Charcutería ———
  {
    id: 'jamon', cat: 'charcuteria', img: 'jamon', etiqueta: 'Ibérico',
    nombre: 'Jamón Serrano e Ibérico',
    desc: 'Cortado a cuchillo o a máquina, en lonchas finísimas.',
    cantidades: [
      { texto: '100 gr', valor: 0.1, unidad: 'kg' },
      { texto: '250 gr', valor: 0.25, unidad: 'kg' },
      { texto: '500 gr', valor: 0.5, unidad: 'kg' },
      { texto: '1 kg', valor: 1, unidad: 'kg' },
      { texto: 'Pieza entera', valor: 1, unidad: 'ud' }
    ],
    opcionLabel: 'Producto',
    opciones: ['Jamón serrano en lonchas', 'Jamón ibérico de cebo', 'Jamón ibérico de bellota', 'Paleta ibérica', 'Taquitos de jamón', 'Huesos de jamón para caldo'],
  },
  {
    id: 'embutidos', cat: 'charcuteria', img: 'embutidos',
    nombre: 'Embutidos Curados',
    desc: 'Chorizo, salchichón y lomo ibérico de curación lenta.',
    cantidades: [
      { texto: '150 gr', valor: 0.15, unidad: 'kg' },
      { texto: '250 gr', valor: 0.25, unidad: 'kg' },
      { texto: '500 gr', valor: 0.5, unidad: 'kg' },
      { texto: 'Pieza entera', valor: 1, unidad: 'ud' }
    ],
    opcionLabel: 'Producto',
    opciones: ['Chorizo ibérico', 'Salchichón ibérico', 'Lomo embuchado ibérico', 'Fuet', 'Sobrasada', 'Morcón', 'Cecina de León'],
  },
  {
    id: 'quesos', cat: 'charcuteria', img: 'quesos',
    nombre: 'Quesos',
    desc: 'Una selección de quesos nacionales para cortar a tu gusto.',
    cantidades: [
      { texto: '250 gr', valor: 0.25, unidad: 'kg' },
      { texto: '500 gr', valor: 0.5, unidad: 'kg' },
      { texto: '1 kg', valor: 1, unidad: 'kg' },
      { texto: '1 cuña', valor: 1, unidad: 'ud' },
      { texto: 'Pieza entera', valor: 1, unidad: 'ud' }
    ],
    opcionLabel: 'Variedad',
    opciones: ['Manchego curado', 'Manchego semicurado', 'Queso de cabra', 'Queso viejo en aceite', 'Queso tierno', 'Queso azul / Cabrales', 'Torta del Casar'],
  },
  {
    id: 'fiambres', cat: 'charcuteria', img: 'fiambres',
    nombre: 'Fiambres y Loncheados',
    desc: 'Para bocadillos, desayunos y meriendas.',
    cantidades: [
      { texto: '150 gr', valor: 0.15, unidad: 'kg' },
      { texto: '250 gr', valor: 0.25, unidad: 'kg' },
      { texto: '500 gr', valor: 0.5, unidad: 'kg' },
      { texto: '1 kg', valor: 1, unidad: 'kg' }
    ],
    opcionLabel: 'Producto',
    opciones: ['Jamón cocido extra', 'Pechuga de pavo', 'Mortadela', 'Chopped', 'Queso en lonchas', 'Bacon ahumado', 'Salami'],
  },

  // ——— Bebidas ———
  {
    id: 'refrescos', cat: 'bebidas', img: 'refrescos', etiqueta: 'Bien frío',
    nombre: 'Refrescos',
    desc: 'Latas y botellas de tus refrescos de siempre.',
    cantidades: [
      { texto: '1 lata', valor: 1, unidad: 'ud' },
      { texto: 'Pack 6 latas', valor: 6, unidad: 'ud' },
      { texto: 'Pack 12 latas', valor: 12, unidad: 'ud' },
      { texto: '1 botella 2 L', valor: 1, unidad: 'ud' },
      { texto: '2 botellas 2 L', valor: 2, unidad: 'ud' }
    ],
    opcionLabel: 'Sabor',
    opciones: ['Coca-Cola', 'Coca-Cola Zero', 'Fanta Naranja', 'Fanta Limón', 'Sprite', 'Kas Naranja', 'Pepsi', 'Aquarius Limón', 'Aquarius Naranja', 'Nestea', 'Schweppes Tónica', 'Bebida energética'],
  },
  {
    id: 'cervezas-vinos', cat: 'bebidas', img: 'cervezas-vinos',
    nombre: 'Cervezas y Vinos',
    desc: 'Para la barbacoa, la comida del domingo o una celebración.',
    cantidades: [
      { texto: '1 unidad', valor: 1, unidad: 'ud' },
      { texto: 'Pack 6', valor: 6, unidad: 'ud' },
      { texto: 'Pack 12', valor: 12, unidad: 'ud' },
      { texto: 'Caja 24', valor: 24, unidad: 'ud' }
    ],
    opcionLabel: 'Bebida',
    opciones: ['Cerveza Mahou 5 Estrellas', 'Cerveza Estrella Galicia', 'Cerveza Cruzcampo', 'Cerveza sin alcohol', 'Cerveza 0,0 tostada', 'Vino tinto Rioja crianza', 'Vino tinto Ribera del Duero', 'Vino blanco Rueda', 'Vino rosado', 'Tinto de verano', 'Sangría'],
  },
  {
    id: 'agua-zumos', cat: 'bebidas', img: 'agua-zumos',
    nombre: 'Agua y Zumos',
    desc: 'Agua mineral, con gas y zumos para toda la familia.',
    cantidades: [
      { texto: '1 unidad', valor: 1, unidad: 'ud' },
      { texto: 'Pack 6', valor: 6, unidad: 'ud' },
      { texto: 'Pack 6 x 1,5 L', valor: 6, unidad: 'ud' },
      { texto: 'Garrafa 5 L', valor: 1, unidad: 'ud' }
    ],
    opcionLabel: 'Bebida',
    opciones: ['Agua mineral 0,5 L', 'Agua mineral 1,5 L', 'Agua con gas', 'Zumo de naranja', 'Zumo de melocotón', 'Zumo de piña', 'Mosto'],
  },

  // ——— Despensa y barbacoa ———
  {
    id: 'despensa', cat: 'despensa', img: 'despensa',
    nombre: 'Huevos, Pan y Aceite',
    desc: 'Básicos de despensa para completar tu compra.',
    cantidades: UNIDADES,
    opcionLabel: 'Producto',
    opciones: ['Huevos camperos (docena)', 'Huevos camperos (media docena)', 'Pan de pueblo', 'Barra de pan', 'Aceite de oliva virgen extra 1 L', 'Aceite de oliva virgen extra 5 L', 'Pimentón de la Vera', 'Sal gorda'],
  },
  {
    id: 'barbacoa', cat: 'despensa', img: 'barbacoa', etiqueta: 'Para brasa',
    nombre: 'Carbón y Barbacoa',
    desc: 'Todo para encender la brasa sin complicaciones.',
    cantidades: UNIDADES,
    opcionLabel: 'Producto',
    opciones: ['Saco de carbón vegetal 3 kg', 'Saco de carbón vegetal 5 kg', 'Pastillas de encendido', 'Leña de encina', 'Bandejas de aluminio', 'Palillos para brochetas'],
  },
  {
    id: 'salsas', cat: 'despensa', img: 'salsas',
    nombre: 'Salsas y Adobos',
    desc: 'El toque final para tus carnes.',
    cantidades: UNIDADES,
    opcionLabel: 'Producto',
    opciones: ['Alioli casero', 'Mojo picón', 'Chimichurri', 'Salsa barbacoa', 'Adobo para pinchos', 'Sazonador para carne', 'Mostaza antigua'],
  },
]

// Precios realistas (€ por kg o por unidad)
const PRECIOS = {
  'filetes-ternera': '16,90 €/kg', 
  chuleton: '28,90 €/kg', 
  solomillo: '34,90 €/kg', 
  picada: '10,50 €/kg',
  'guiso-ternera': '13,90 €/kg', 
  'lomo-cerdo': '9,90 €/kg', 
  costillas: '7,50 €/kg', 
  iberico: '24,90 €/kg',
  'chuletas-cerdo': '8,90 €/kg', 
  pollo: '6,50 €/kg', 
  alitas: '5,90 €/kg', 
  conejo: '11,50 €/kg',
  cordero: '22,00 €/kg', 
  hamburguesas: '2,10 €/ud', 
  'embutido-fresco': '9,50 €/kg', 
  pinchos: '1,60 €/ud',
  albondigas: '12,50 €/kg', 
  jamon: '55,00 €/kg', 
  embutidos: '32,00 €/kg', 
  quesos: '21,00 €/kg',
  fiambres: '14,00 €/kg', 
  refrescos: '1,20 €/ud', 
  'cervezas-vinos': '1,50 €/ud', 
  'agua-zumos': '1,00 €/ud', 
  despensa: '4,50 €/ud', 
  barbacoa: '7,50 €/ud', 
  salsas: '3,20 €/ud',
}
window.PRODUCTOS.forEach((p) => { p.precio = PRECIOS[p.id] })
