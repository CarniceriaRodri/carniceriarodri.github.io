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

const PESO = ['500 gr', '1 kg', '1.5 kg', '2 kg']
const UNIDADES = ['1 unidad', '2 unidades', '3 unidades', '4 unidades']

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
    cantidades: ['1 pieza (aprox. 400 g)', '2 piezas', '4 piezas', 'Al corte grueso (1 kg)'],
    opcionLabel: 'Tipo de corte',
    opciones: ['Entrecot jugoso', 'Chuletón madurado con hueso', 'Corte grueso para brasa', 'Chuleta de lomo alto'],
  },
  {
    id: 'solomillo', cat: 'vacuno', img: 'solomillo',
    nombre: 'Solomillo de Ternera',
    desc: 'La pieza más tierna, en medallones o entera para asar.',
    cantidades: ['2 medallones', '4 medallones', '500 gr', 'Pieza entera'],
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
    cantidades: ['1 tira (aprox. 600 g)', '1 kg', '1.5 kg', '2 kg'],
    opcionLabel: 'Preparación',
    opciones: ['Enteras en tiras', 'Troceadas para guiso / horno', 'Adobadas caseras', 'Marinadas barbacoa'],
  },
  {
    id: 'iberico', cat: 'cerdo', img: 'iberico', etiqueta: 'Ibérico',
    nombre: 'Ibérico Selecto',
    desc: 'Secreto, presa y pluma: las joyas del cerdo ibérico.',
    cantidades: ['500 gr', '1 kg', '1.5 kg'],
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
    cantidades: ['500 gr', '1 kg', '1.5 kg', '2 kg', '1 pollo entero', '1 pollo de corral'],
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
    cantidades: ['Medio conejo', '1 conejo entero', '4 codornices', '6 codornices'],
    opcionLabel: 'Preparación',
    opciones: ['Troceado para paella', 'Troceado para guisar', 'Entero sin trocear', 'Abierto para la plancha'],
  },

  // ——— Cordero ———
  {
    id: 'cordero', cat: 'cordero', img: 'cordero',
    nombre: 'Cordero Lechal',
    desc: 'Chuletas, pierna o paletilla de cordero tierno.',
    cantidades: ['500 gr de chuletas', '1 kg de chuletas', '1 pierna entera', '1 paletilla entera', 'Medio cordero'],
    opcionLabel: 'Preparación',
    opciones: ['Chuletas para plancha', 'Chuletas gruesas para brasa', 'Costillar entero', 'Pierna para asar', 'Paletilla para asar', 'Troceado para guisar'],
  },

  // ——— Elaborados ———
  {
    id: 'hamburguesas', cat: 'elaborados', img: 'hamburguesas', etiqueta: 'De la casa',
    nombre: 'Hamburguesas Artesanas',
    desc: 'Formadas a mano cada mañana con carne recién picada.',
    cantidades: ['2 unidades', '4 unidades', '6 unidades', '8 unidades', '12 unidades'],
    opcionLabel: 'Tipo / sabor',
    opciones: ['Vacuno 100%', 'Buey madurado', 'Ibérica', 'Pollo y espinacas', 'Mixta con especias', 'Rellena de queso de cabra', 'Con bacon y cheddar'],
  },
  {
    id: 'embutido-fresco', cat: 'elaborados', img: 'embutido-fresco', etiqueta: 'De la casa',
    nombre: 'Chorizo, Salchichas y Morcilla',
    desc: 'Embutido fresco de elaboración propia, perfecto a la brasa.',
    cantidades: ['250 gr', '500 gr', '1 kg', '6 unidades', '12 unidades'],
    opcionLabel: 'Variedad',
    opciones: ['Chorizo fresco dulce', 'Chorizo fresco picante', 'Chorizo criollo', 'Salchichas frescas de cerdo', 'Salchichas de pollo', 'Longaniza fresca', 'Butifarra', 'Morcilla de cebolla', 'Morcilla de arroz'],
  },
  {
    id: 'pinchos', cat: 'elaborados', img: 'pinchos',
    nombre: 'Pinchos Morunos y Brochetas',
    desc: 'Marinados con nuestras especias, listos para la plancha.',
    cantidades: ['4 unidades', '8 unidades', '12 unidades', '1 kg'],
    opcionLabel: 'Variedad',
    opciones: ['Pincho moruno de cerdo', 'Pincho moruno de pollo', 'Pincho de cordero', 'Brocheta de ternera con verduras', 'Brocheta mixta', 'Brocheta de pollo al limón'],
  },
  {
    id: 'albondigas', cat: 'elaborados', img: 'albondigas',
    nombre: 'Albóndigas, Flamenquines y Empanados',
    desc: 'Preparados caseros listos para freír u hornear.',
    cantidades: ['6 unidades', '12 unidades', '500 gr', '1 kg'],
    opcionLabel: 'Producto',
    opciones: ['Albóndigas de ternera', 'Albóndigas mixtas', 'Flamenquines de jamón y queso', 'San Jacobos', 'Filetes rusos', 'Cordon bleu de pollo', 'Pechugas de pollo empanadas', 'Nuggets caseros'],
  },

  // ——— Charcutería ———
  {
    id: 'jamon', cat: 'charcuteria', img: 'jamon', etiqueta: 'Ibérico',
    nombre: 'Jamón Serrano e Ibérico',
    desc: 'Cortado a cuchillo o a máquina, en lonchas finísimas.',
    cantidades: ['100 gr', '250 gr', '500 gr', '1 kg', 'Pieza entera'],
    opcionLabel: 'Producto',
    opciones: ['Jamón serrano en lonchas', 'Jamón ibérico de cebo', 'Jamón ibérico de bellota', 'Paleta ibérica', 'Taquitos de jamón', 'Huesos de jamón para caldo'],
  },
  {
    id: 'embutidos', cat: 'charcuteria', img: 'embutidos',
    nombre: 'Embutidos Curados',
    desc: 'Chorizo, salchichón y lomo ibérico de curación lenta.',
    cantidades: ['150 gr', '250 gr', '500 gr', 'Pieza entera'],
    opcionLabel: 'Producto',
    opciones: ['Chorizo ibérico', 'Salchichón ibérico', 'Lomo embuchado ibérico', 'Fuet', 'Sobrasada', 'Morcón', 'Cecina de León'],
  },
  {
    id: 'quesos', cat: 'charcuteria', img: 'quesos',
    nombre: 'Quesos',
    desc: 'Una selección de quesos nacionales para cortar a tu gusto.',
    cantidades: ['250 gr', '500 gr', '1 kg', '1 cuña', 'Pieza entera'],
    opcionLabel: 'Variedad',
    opciones: ['Manchego curado', 'Manchego semicurado', 'Queso de cabra', 'Queso viejo en aceite', 'Queso tierno', 'Queso azul / Cabrales', 'Torta del Casar'],
  },
  {
    id: 'fiambres', cat: 'charcuteria', img: 'fiambres',
    nombre: 'Fiambres y Loncheados',
    desc: 'Para bocadillos, desayunos y meriendas.',
    cantidades: ['150 gr', '250 gr', '500 gr', '1 kg'],
    opcionLabel: 'Producto',
    opciones: ['Jamón cocido extra', 'Pechuga de pavo', 'Mortadela', 'Chopped', 'Queso en lonchas', 'Bacon ahumado', 'Salami'],
  },

  // ——— Bebidas ———
  {
    id: 'refrescos', cat: 'bebidas', img: 'refrescos', etiqueta: 'Bien frío',
    nombre: 'Refrescos',
    desc: 'Latas y botellas de tus refrescos de siempre.',
    cantidades: ['1 lata', 'Pack 6 latas', 'Pack 12 latas', '1 botella 2 L', '2 botellas 2 L'],
    opcionLabel: 'Sabor',
    opciones: ['Coca-Cola', 'Coca-Cola Zero', 'Fanta Naranja', 'Fanta Limón', 'Sprite', 'Kas Naranja', 'Pepsi', 'Aquarius Limón', 'Aquarius Naranja', 'Nestea', 'Schweppes Tónica', 'Bebida energética'],
  },
  {
    id: 'cervezas-vinos', cat: 'bebidas', img: 'cervezas-vinos',
    nombre: 'Cervezas y Vinos',
    desc: 'Para la barbacoa, la comida del domingo o una celebración.',
    cantidades: ['1 unidad', 'Pack 6', 'Pack 12', 'Caja 24'],
    opcionLabel: 'Bebida',
    opciones: ['Cerveza Mahou 5 Estrellas', 'Cerveza Estrella Galicia', 'Cerveza Cruzcampo', 'Cerveza sin alcohol', 'Cerveza 0,0 tostada', 'Vino tinto Rioja crianza', 'Vino tinto Ribera del Duero', 'Vino blanco Rueda', 'Vino rosado', 'Tinto de verano', 'Sangría'],
  },
  {
    id: 'agua-zumos', cat: 'bebidas', img: 'agua-zumos',
    nombre: 'Agua y Zumos',
    desc: 'Agua mineral, con gas y zumos para toda la familia.',
    cantidades: ['1 unidad', 'Pack 6', 'Pack 6 x 1,5 L', 'Garrafa 5 L'],
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

// Precios orientativos (prueba): € por kg o por unidad
const PRECIOS = {
  'filetes-ternera': '14,90 €/kg', chuleton: '24,90 €/kg', solomillo: '32,00 €/kg', picada: '9,90 €/kg',
  'guiso-ternera': '12,50 €/kg', 'lomo-cerdo': '8,90 €/kg', costillas: '6,90 €/kg', iberico: '19,90 €/kg',
  'chuletas-cerdo': '7,50 €/kg', pollo: '5,90 €/kg', alitas: '4,90 €/kg', conejo: '9,50 €/kg',
  cordero: '18,90 €/kg', hamburguesas: '1,50 €/ud', 'embutido-fresco': '8,50 €/kg', pinchos: '1,20 €/ud',
  albondigas: '10,90 €/kg', jamon: '45,00 €/kg', embutidos: '28,00 €/kg', quesos: '18,00 €/kg',
  fiambres: '12,00 €/kg', refrescos: '1,00 €/ud', 'cervezas-vinos': '1,20 €/ud', 'agua-zumos': '0,80 €/ud',
  despensa: '3,00 €/ud', barbacoa: '6,00 €/ud', salsas: '2,50 €/ud',
}
window.PRODUCTOS.forEach((p) => { p.precio = PRECIOS[p.id] })
