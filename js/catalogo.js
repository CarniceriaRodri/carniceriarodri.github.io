
/* =========================================================
   CARNICERÍA RODRI - CATÁLOGO INTELIGENTE
   Precios individuales + cantidades libres + cesta
   ========================================================= */

/* =========================
   1. CATEGORÍAS
========================= */

window.CATEGORIAS = [
  { id:'vacuno', nombre:'Vacuno y Ternera', lema:'Ternera de confianza y vaca madurada, cortada al momento.' },
  { id:'cerdo', nombre:'Cerdo e Ibérico', lema:'Del lomo de cebo a las piezas ibéricas más jugosas.' },
  { id:'aves', nombre:'Pollo, Aves y Conejo', lema:'Pollo fresco, pavo y conejo limpios y listos para cocinar.' },
  { id:'cordero', nombre:'Cordero', lema:'Cordero lechal tierno, para la plancha o el horno.' },
  { id:'elaborados', nombre:'Elaborados de la Casa', lema:'Hechos aquí cada mañana, con nuestra propia receta.' },
  { id:'charcuteria', nombre:'Charcutería', lema:'Jamón, embutidos y quesos cortados a tu gusto.' },
  { id:'bebidas', nombre:'Refrescos y Bebidas', lema:'Para acompañar la comida: todo bien frío.' },
  { id:'despensa', nombre:'Despensa y Barbacoa', lema:'Lo que no puede faltar para cocinar o encender la brasa.' }
];


/* =========================
   2. FUNCIONES DE PRECIOS
========================= */

// Los precios de peso se expresan en euros por kg.
// Los precios de unidades se expresan en euros por unidad.

const VARIEDAD = (nombre, precio, tipo='kg') => ({
  nombre,
  precio,
  tipo
});

const PESOS = [250, 500, 750, 1000, 1500, 2000];
const UNIDADES = [1, 2, 3, 4, 6, 8, 12];

const PRODUCTO = (
  id, cat, nombre, desc, img, precio, opciones,
  etiqueta = '', tipo = 'kg', cantidades = null,
  opcionLabel = 'Variedad'
) => ({
  id,
  cat,
  nombre,
  desc,
  img,
  etiqueta,
  opcionLabel,
  tipo,
  precio,
  opciones: opciones.map(o =>
    typeof o === 'string'
      ? VARIEDAD(o, precio, tipo)
      : VARIEDAD(o.nombre, o.precio ?? precio, o.tipo ?? tipo)
  ),
  cantidades: cantidades || (tipo === 'kg' ? PESOS : UNIDADES)
});


/* =========================
   3. CATÁLOGO COMPLETO
========================= */

window.PRODUCTOS = [

  // VACUNO
  PRODUCTO('filetes-ternera','vacuno','Filetes de Ternera',
    'Tiernos y magros, cortados al grosor que prefieras.',
    'filetes-ternera',16.90,[
      'Muy finos (plancha)','Grosor normal',
      'Para empanar','Tacos para guiso'
    ],'Más pedido','kg',PESOS,'Tipo de corte'),

  PRODUCTO('chuleton','vacuno','Entrecot o Chuletón',
    'Vaca con buena infiltración de grasa, ideal a la parrilla.',
    'chuleton',28.90,[
      'Entrecot jugoso','Chuletón madurado con hueso',
      'Corte grueso para brasa','Chuleta de lomo alto'
    ],'Para brasa','kg',PESOS,'Tipo de corte'),

  PRODUCTO('solomillo','vacuno','Solomillo de Ternera',
    'La pieza más tierna, en medallones o entera para asar.',
    'solomillo',34.90,[
      'Medallones gruesos','Turnedós finos',
      'Pieza entera para asar','Cortado para carpaccio'
    ],'','kg',PESOS,'Preparación'),

  PRODUCTO('picada','vacuno','Carne Picada',
    'Picada al momento delante de ti, sin aditivos.',
    'picada',10.50,[
      'Ternera 100%','Mixta ternera y cerdo',
      'Cerdo 100%','Especial para albóndigas',
      'Especial para boloñesa'
    ],'','kg',PESOS,'Mezcla'),

  PRODUCTO('guiso-ternera','vacuno','Ternera para Guisar',
    'Cortes melosos para guisos lentos, estofados y cocidos.',
    'guiso-ternera',13.90,[
      'Carrilleras de ternera','Rabo de toro troceado',
      'Osobuco en rodajas','Morcillo en tacos',
      'Aguja en tacos','Redondo de ternera',
      'Huesos para caldo'
    ],'','kg',PESOS,'Pieza'),

  // CERDO
  PRODUCTO('lomo-cerdo','cerdo','Lomo de Cerdo',
    'Fresco en filetes o con nuestro adobo casero de pimentón.',
    'lomo-cerdo',9.90,[
      'Fresco en filetes','Adobado casero',
      'Cinta de lomo entera','Lomo para asar'
    ],'Más pedido','kg',PESOS,'Variedad'),

  PRODUCTO('costillas','cerdo','Costillas de Cerdo',
    'Costilla carnosa, en tiras para el horno o troceada.',
    'costillas',7.50,[
      'Enteras en tiras','Troceadas para guiso / horno',
      'Adobadas caseras','Marinadas barbacoa'
    ],'','kg',PESOS,'Preparación'),

  PRODUCTO('iberico','cerdo','Ibérico Selecto',
    'Secreto, presa y pluma: las joyas del cerdo ibérico.',
    'iberico',24.90,[
      VARIEDAD('Secreto ibérico',24.90),
      VARIEDAD('Presa ibérica',24.90),
      VARIEDAD('Pluma ibérica',24.90),
      VARIEDAD('Abanico ibérico',24.90),
      VARIEDAD('Lagarto ibérico',24.90),
      VARIEDAD('Carrillada ibérica',24.90)
    ],'Ibérico','kg',PESOS,'Pieza'),

  PRODUCTO('chuletas-cerdo','cerdo','Chuletas, Panceta y Solomillo',
    'Los clásicos del cerdo para el día a día.',
    'chuletas-cerdo',8.90,[
      'Chuletas de aguja','Chuletas de lomo',
      'Panceta en tiras','Panceta para torreznos',
      'Solomillo de cerdo','Codillo','Manitas de cerdo'
    ],'','kg',PESOS,'Pieza'),

  // AVES
  PRODUCTO('pollo','aves','Pollo Fresco',
    'Pollo entero o en piezas, limpio y preparado a tu gusto.',
    'pollo',6.50,[
      'Pechugas en filetes','Pechugas enteras',
      'Muslos y contramuslos','Contramuslo deshuesado',
      'Troceado para guisar','Abierto para asar'
    ],'Más pedido','kg',PESOS,'Preparación'),

  PRODUCTO('alitas','aves','Alitas, Jamoncitos y Pavo',
    'Para picar, para el horno o para una cena ligera.',
    'alitas',5.90,[
      'Alitas enteras','Alitas partidas',
      'Alitas adobadas picantes','Jamoncitos de pollo',
      'Filetes de pechuga de pavo','Contramuslo de pavo'
    ],'','kg',PESOS,'Pieza'),

  PRODUCTO('conejo','aves','Conejo y Codorniz',
    'Imprescindibles para la paella, el arroz o el ajillo.',
    'conejo',11.50,[
      VARIEDAD('Medio conejo',11.50,'ud'),
      VARIEDAD('Conejo entero',11.50,'ud'),
      VARIEDAD('Codornices',11.50,'ud')
    ],'','ud',[1,2,3,4,6],'Preparación'),

  // CORDERO
  PRODUCTO('cordero','cordero','Cordero Lechal',
    'Chuletas, pierna o paletilla de cordero tierno.',
    'cordero',22.00,[
      'Chuletas para plancha','Chuletas gruesas para brasa',
      'Costillar entero','Pierna para asar',
      'Paletilla para asar','Troceado para guisar'
    ],'','kg',PESOS,'Preparación'),

  // ELABORADOS
  PRODUCTO('hamburguesas','elaborados','Hamburguesas Artesanas',
    'Formadas a mano cada mañana con carne recién picada.',
    'hamburguesas',2.10,[
      'Vacuno 100%','Buey madurado','Ibérica',
      'Pollo y espinacas','Mixta con especias',
      'Rellena de queso de cabra','Con bacon y cheddar'
    ],'De la casa','ud',UNIDADES,'Tipo / sabor'),

  PRODUCTO('embutido-fresco','elaborados','Chorizo, Salchichas y Morcilla',
    'Embutido fresco de elaboración propia, perfecto a la brasa.',
    'embutido-fresco',9.50,[
      'Chorizo fresco dulce','Chorizo fresco picante',
      'Chorizo criollo','Salchichas frescas de cerdo',
      'Salchichas de pollo','Longaniza fresca',
      'Butifarra','Morcilla de cebolla','Morcilla de arroz'
    ],'De la casa','kg',PESOS,'Variedad'),

  PRODUCTO('pinchos','elaborados','Pinchos Morunos y Brochetas',
    'Marinados con nuestras especias, listos para la plancha.',
    'pinchos',1.60,[
      'Pincho moruno de cerdo','Pincho moruno de pollo',
      'Pincho de cordero','Brocheta de ternera con verduras',
      'Brocheta mixta','Brocheta de pollo al limón'
    ],'','ud',UNIDADES,'Variedad'),

  PRODUCTO('albondigas','elaborados','Albóndigas, Flamenquines y Empanados',
    'Preparados caseros listos para freír u hornear.',
    'albondigas',12.50,[
      'Albóndigas de ternera','Albóndigas mixtas',
      'Flamenquines de jamón y queso','San Jacobos',
      'Filetes rusos','Cordon bleu de pollo',
      'Pechugas de pollo empanadas','Nuggets caseros'
    ],'','kg',PESOS,'Producto'),

  // CHARCUTERÍA
  PRODUCTO('jamon','charcuteria','Jamón Serrano e Ibérico',
    'Cortado a cuchillo o a máquina, en lonchas finísimas.',
    'jamon',55.00,[
      'Jamón serrano en lonchas','Jamón ibérico de cebo',
      'Jamón ibérico de bellota','Paleta ibérica',
      'Taquitos de jamón','Huesos de jamón para caldo'
    ],'Ibérico','kg',PESOS,'Producto'),

  PRODUCTO('embutidos','charcuteria','Embutidos Curados',
    'Chorizo, salchichón y lomo ibérico de curación lenta.',
    'embutidos',32.00,[
      'Chorizo ibérico','Salchichón ibérico',
      'Lomo embuchado ibérico','Fuet','Sobrasada',
      'Morcón','Cecina de León'
    ],'','kg',PESOS,'Producto'),

  PRODUCTO('quesos','charcuteria','Quesos',
    'Una selección de quesos nacionales para cortar a tu gusto.',
    'quesos',21.00,[
      'Manchego curado','Manchego semicurado',
      'Queso de cabra','Queso viejo en aceite',
      'Queso tierno','Queso azul / Cabrales',
      'Torta del Casar'
    ],'','kg',PESOS,'Variedad'),

  PRODUCTO('fiambres','charcuteria','Fiambres y Loncheados',
    'Para bocadillos, desayunos y meriendas.',
    'fiambres',14.00,[
      'Jamón cocido extra','Pechuga de pavo',
      'Mortadela','Chopped','Queso en lonchas',
      'Bacon ahumado','Salami'
    ],'','kg',PESOS,'Producto'),

  // BEBIDAS
  PRODUCTO('refrescos','bebidas','Refrescos',
    'Latas y botellas de tus refrescos de siempre.',
    'refrescos',1.20,[
      'Coca-Cola','Coca-Cola Zero','Fanta Naranja',
      'Fanta Limón','Sprite','Kas Naranja','Pepsi',
      'Aquarius Limón','Aquarius Naranja','Nestea',
      'Schweppes Tónica','Bebida energética'
    ],'Bien frío','ud',UNIDADES,'Sabor'),

  PRODUCTO('cervezas-vinos','bebidas','Cervezas y Vinos',
    'Para la barbacoa, la comida del domingo o una celebración.',
    'cervezas-vinos',1.50,[
      'Cerveza Mahou 5 Estrellas',
      'Cerveza Estrella Galicia','Cerveza Cruzcampo',
      'Cerveza sin alcohol','Cerveza 0,0 tostada',
      'Vino tinto Rioja crianza',
      'Vino tinto Ribera del Duero',
      'Vino blanco Rueda','Vino rosado',
      'Tinto de verano','Sangría'
    ],'','ud',UNIDADES,'Bebida'),

  PRODUCTO('agua-zumos','bebidas','Agua y Zumos',
    'Agua mineral, con gas y zumos para toda la familia.',
    'agua-zumos',1.00,[
      'Agua mineral 0,5 L','Agua mineral 1,5 L',
      'Agua con gas','Zumo de naranja',
      'Zumo de melocotón','Zumo de piña','Mosto'
    ],'','ud',UNIDADES,'Bebida'),

  // DESPENSA
  PRODUCTO('despensa','despensa','Huevos, Pan y Aceite',
    'Básicos de despensa para completar tu compra.',
    'despensa',4.50,[
      'Huevos camperos (docena)',
      'Huevos camperos (media docena)',
      'Pan de pueblo','Barra de pan',
      'Aceite de oliva virgen extra 1 L',
      'Aceite de oliva virgen extra 5 L',
      'Pimentón de la Vera','Sal gorda'
    ],'','ud',UNIDADES,'Producto'),

  PRODUCTO('barbacoa','despensa','Carbón y Barbacoa',
    'Todo para encender la brasa sin complicaciones.',
    'barbacoa',7.50,[
      'Saco de carbón vegetal 3 kg',
      'Saco de carbón vegetal 5 kg',
      'Pastillas de encendido','Leña de encina',
      'Bandejas de aluminio','Palillos para brochetas'
    ],'Para brasa','ud',UNIDADES,'Producto'),

  PRODUCTO('salsas','despensa','Salsas y Adobos',
    'El toque final para tus carnes.',
    'salsas',3.20,[
      'Alioli casero','Mojo picón','Chimichurri',
      'Salsa barbacoa','Adobo para pinchos',
      'Sazonador para carne','Mostaza antigua'
    ],'','ud',UNIDADES,'Producto')
];


/* =========================
   4. PRECIOS INDIVIDUALES
========================= */

// Personaliza aquí cada variedad.
// Todas comienzan con el precio original del producto.
// Ejemplo:
// 'filetes-ternera': {
//   'Para empanar': 17.90
// }

window.PRECIOS_INDIVIDUALES = {};


/* =========================
   5. UTILIDADES
========================= */

window.formatoPrecio = function(precio) {
  return Number(precio).toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR'
  });
};

window.obtenerProducto = function(id) {
  return window.PRODUCTOS.find(p => p.id === id);
};

window.obtenerPrecio = function(producto, indice) {
  const opcion = producto.opciones[indice];
  const personalizados =
    window.PRECIOS_INDIVIDUALES[producto.id] || {};

  return personalizados[opcion.nombre] ?? opcion.precio;
};


/* =========================
   6. CÁLCULO DE PRECIOS
========================= */

window.calcularPrecio = function(
  producto,
  indiceOpcion,
  cantidad
) {
  if (!producto || cantidad <= 0) return 0;

  const precio = window.obtenerPrecio(
    producto,
    indiceOpcion
  );

  if (producto.tipo === 'kg') {
    return precio * cantidad / 1000;
  }

  return precio * cantidad;
};


/* =========================
   7. CANTIDADES PERSONALIZADAS
========================= */

window.obtenerCantidades = function(producto) {
  return producto.cantidades.map(cantidad => ({
    valor: cantidad,
    etiqueta: producto.tipo === 'kg'
      ? (cantidad >= 1000
          ? `${cantidad / 1000} kg`
          : `${cantidad} gr`)
      : `${cantidad} unidades`
  }));
};


/* =========================
   8. CESTA INTELIGENTE
========================= */

window.CESTA = {

  items: [],

  agregar(datos) {
    const producto = window.obtenerProducto(datos.productoId);

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    const indice = Number(datos.opcionIndex);
    const cantidad = Number(datos.cantidad);

    if (!producto.opciones[indice]) {
      throw new Error('Selecciona una variedad válida');
    }

    if (!Number.isFinite(cantidad) || cantidad <= 0) {
      throw new Error('Cantidad no válida');
    }

    if (
      producto.tipo === 'kg' &&
      cantidad < 1
    ) {
      throw new Error('El peso debe ser mayor que cero');
    }

    const opcion = producto.opciones[indice];

    const item = {
      lineaId: crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,

      productoId: producto.id,
      nombre: producto.nombre,
      imagen: producto.img,
      variedad: opcion.nombre,
      cantidad,
      tipo: producto.tipo,
      precioUnitario: window.obtenerPrecio(producto, indice),
      preparacion: datos.preparacion || '',
      observaciones: datos.observaciones || ''
    };

    item.subtotal = window.calcularPrecio(
      producto,
      indice,
      cantidad
    );

    this.items.push(item);

    this.guardar();
    return item;
  },

  cambiarCantidad(lineaId, cantidad) {
    const item = this.items.find(
      i => i.lineaId === lineaId
    );

    if (!item || cantidad <= 0) return false;

    item.cantidad = Number(cantidad);

    item.subtotal = item.tipo === 'kg'
      ? item.precioUnitario * item.cantidad / 1000
      : item.precioUnitario * item.cantidad;

    this.guardar();
    return true;
  },

  eliminar(lineaId) {
    this.items = this.items.filter(
      i => i.lineaId !== lineaId
    );

    this.guardar();
  },

  vaciar() {
    this.items = [];
    this.guardar();
  },

  total() {
    return this.items.reduce(
      (suma, item) => suma + item.subtotal,
      0
    );
  },

  unidades() {
    return this.items.length;
  },

  resumen() {
    return {
      productos: this.items,
      unidades: this.unidades(),
      total: this.total(),
      totalFormateado: window.formatoPrecio(this.total())
    };
  },

  guardar() {
    try {
      localStorage.setItem(
        'carniceriaRodriCesta',
        JSON.stringify(this.items)
      );
    } catch (error) {
      console.warn('No se pudo guardar la cesta', error);
    }
  },

  recuperar() {
    try {
      const datos = localStorage.getItem(
        'carniceriaRodriCesta'
      );

      this.items = datos ? JSON.parse(datos) : [];
    } catch (error) {
      this.items = [];
    }

    return this.items;
  }
};


/* =========================
   9. FORMULARIO DE PRODUCTO
========================= */

// Obtiene las opciones necesarias para mostrar
// el selector de cada producto.

window.configurarProducto = function(productoId) {
  const producto = window.obtenerProducto(productoId);

  if (!producto) return null;

  return {
    producto,
    opciones: producto.opciones.map((opcion, index) => ({
      index,
      nombre: opcion.nombre,
      precio: window.formatoPrecio(
        window.obtenerPrecio(producto, index)
      ),
      precioKg: window.obtenerPrecio(producto, index),
      tipo: producto.tipo
    })),
    cantidades: window.obtenerCantidades(producto)
  };
};


/* =========================
   10. AÑADIR DESDE LA TIENDA
========================= */

// Ejemplo:
// agregarProductoCesta({
//   productoId: 'filetes-ternera',
//   opcionIndex: 0,
//   cantidad: 500,
//   observaciones: 'Filetes muy finos'
// });

window.agregarProductoCesta = function(datos) {
  const item = window.CESTA.agregar(datos);

  document.dispatchEvent(
    new CustomEvent('rodri:cesta-actualizada', {
      detail: window.CESTA.resumen()
    })
  );

  return item;
};


/* =========================
   11. EVENTOS PARA ACTUALIZAR
========================= */

window.actualizarCesta = function() {
  document.dispatchEvent(
    new CustomEvent('rodri:cesta-actualizada', {
      detail: window.CESTA.resumen()
    })
  );
};

window.eliminarProductoCesta = function(lineaId) {
  window.CESTA.eliminar(lineaId);
  window.actualizarCesta();
};

window.modificarCantidadCesta = function(
  lineaId,
  cantidad
) {
  const resultado = window.CESTA.cambiarCantidad(
    lineaId,
    cantidad
  );

  if (resultado) window.actualizarCesta();

  return resultado;
};


/* =========================
   12. INICIALIZACIÓN
========================= */

// Recupera la cesta guardada al abrir la tienda.

window.CESTA.recuperar();

console.log('Carnicería Rodri: catálogo cargado');
console.log('Productos:', window.PRODUCTOS.length);
console.log('Categorías:', window.CATEGORIAS.length);
console.log('Cesta:', window.CESTA.resumen());
