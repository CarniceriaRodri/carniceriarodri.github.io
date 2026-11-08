// Catálogo reorganizado según la estructura real facilitada por Carnicería Rodri.
// Se conservan refrescos y bebidas. Sin precios ni fotografías ficticias.

window.CATEGORIAS = [
  { id: 'salado', nombre: 'Salado', lema: 'Salazones y embutidos' },
  { id: 'precocinados', nombre: 'Precocinados', lema: 'Elaborados listos para cocinar' },
  { id: 'cerdo', nombre: 'Cerdo', lema: 'Cortes y piezas de cerdo' },
  { id: 'ternera', nombre: 'Ternera', lema: 'Cortes y piezas de ternera' },
  { id: 'iberico', nombre: 'Cerdo ibérico', lema: 'Cortes y piezas ibéricas' },
  { id: 'pollo', nombre: 'Pollo', lema: 'Pollo y sus cortes' },
  { id: 'gallina', nombre: 'Gallina', lema: 'Gallina y sus piezas' },
  { id: 'pavo', nombre: 'Pavo', lema: 'Pavo y sus cortes' },
  { id: 'bebidas', nombre: 'Refrescos y bebidas', lema: 'Bebidas para acompañar tu compra' },
];

window.PRODUCTOS = [
  { id: 'espinazo-salado', cat: 'salado', nombre: 'Espinazo salado', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'blanco-salado', cat: 'salado', nombre: 'Blanco salado', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'costilla-salada', cat: 'salado', nombre: 'Costilla salada', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'tocino-salado', cat: 'salado', nombre: 'Tocino salado', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'corteza-aneja', cat: 'salado', nombre: 'Corteza añeja', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'rabo-salado', cat: 'salado', nombre: 'Rabo salado', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'morcilla', cat: 'salado', nombre: 'Morcilla', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'chorizo', cat: 'salado', nombre: 'Chorizo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'filetes-empanados', cat: 'precocinados', nombre: 'Filetes empanados', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'lagrimitas-de-pollo', cat: 'precocinados', nombre: 'Lagrimitas de pollo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'aneto-jamon-y-queso', cat: 'precocinados', nombre: 'Aneto jamón y queso', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'albondigas-clasicas', cat: 'precocinados', nombre: 'Albóndigas', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'albondigas-de-pollo', cat: 'precocinados', nombre: 'Albóndigas de pollo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'albondigas-mixtas', cat: 'precocinados', nombre: 'Albóndigas mixtas', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'san-jacobo', cat: 'precocinados', nombre: 'San Jacobo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'rollito-de-flamenquin', cat: 'precocinados', nombre: 'Rollito de flamenquín', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'fajitas-de-pollo', cat: 'precocinados', nombre: 'Fajitas de pollo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'hamburguesa-de-pollo', cat: 'precocinados', nombre: 'Hamburguesa de pollo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'hamburguesa-iberica', cat: 'precocinados', nombre: 'Hamburguesa ibérica', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'hamburguesa-de-ternera', cat: 'precocinados', nombre: 'Hamburguesa de ternera', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'hamburguesa-de-cerdo', cat: 'precocinados', nombre: 'Hamburguesa de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'pinchito-de-pollo-pechuga', cat: 'precocinados', nombre: 'Pinchito de pollo (pechuga)', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'pinchito-de-pollo-contramuslo', cat: 'precocinados', nombre: 'Pinchito de pollo (contramuslo)', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'pinchito-de-cerdo', cat: 'precocinados', nombre: 'Pinchito de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'chuletas-de-lomo', cat: 'cerdo', nombre: 'Chuletas de lomo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'lomo-entero', cat: 'cerdo', nombre: 'Lomo entero', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'filetes-de-lomo', cat: 'cerdo', nombre: 'Filetes de lomo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'chuletas-de-cabeza', cat: 'cerdo', nombre: 'Chuletas de cabeza', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'cabeza-entera-con-hueso', cat: 'cerdo', nombre: 'Cabeza entera con hueso', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'cabeza-entera-sin-hueso', cat: 'cerdo', nombre: 'Cabeza entera sin hueso', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'solomillo-de-cerdo', cat: 'cerdo', nombre: 'Solomillo de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'trocitos-de-cerdo', cat: 'cerdo', nombre: 'Trocitos de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'filete-de-jamon-de-cerdo', cat: 'cerdo', nombre: 'Filete de jamón de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'jamon-entero-de-cerdo', cat: 'cerdo', nombre: 'Jamón entero de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'paleta-entera-de-cerdo', cat: 'cerdo', nombre: 'Paleta entera de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'morcilla-cerdo', cat: 'cerdo', nombre: 'Morcilla', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'chorizo-cerdo', cat: 'cerdo', nombre: 'Chorizo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'tiras-de-costilla', cat: 'cerdo', nombre: 'Tiras de costilla', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'costilla-carnosa', cat: 'cerdo', nombre: 'Costilla carnosa', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'jarrete-de-cerdo', cat: 'cerdo', nombre: 'Jarrete de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'manitas-de-cerdo', cat: 'cerdo', nombre: 'Manitas de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'higado-de-cerdo', cat: 'cerdo', nombre: 'Hígado de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'pella-de-cerdo', cat: 'cerdo', nombre: 'Pella de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'pajarilla-de-cerdo', cat: 'cerdo', nombre: 'Pajarilla de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'hueso-de-espinazo-de-cerdo', cat: 'cerdo', nombre: 'Hueso de espinazo de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'oreja-de-cerdo', cat: 'cerdo', nombre: 'Oreja de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'lengua-de-cerdo', cat: 'cerdo', nombre: 'Lengua de cerdo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'punta-de-solomillo', cat: 'cerdo', nombre: 'Punta de solomillo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'tocino-fresco', cat: 'cerdo', nombre: 'Tocino fresco', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'babilla-de-ternera', cat: 'ternera', nombre: 'Babilla de ternera', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'chuleta-de-ternera', cat: 'ternera', nombre: 'Chuleta de ternera', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'ternera-para-guiso', cat: 'ternera', nombre: 'Ternera para guiso', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'solomillo-de-ternera', cat: 'ternera', nombre: 'Solomillo de ternera', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'entrecot-de-ternera', cat: 'ternera', nombre: 'Entrecot de ternera', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'chuletas-ibericas', cat: 'iberico', nombre: 'Chuletas ibéricas', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'lomo-iberico', cat: 'iberico', nombre: 'Lomo ibérico', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'filete-iberico', cat: 'iberico', nombre: 'Filete ibérico', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'lajartillo', cat: 'iberico', nombre: 'Lajartillo', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'lagartito-iberico', cat: 'iberico', nombre: 'Lagartito ibérico', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'presa-iberica', cat: 'iberico', nombre: 'Presa ibérica', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'secreto-iberico', cat: 'iberico', nombre: 'Secreto ibérico', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'solomillo-iberico', cat: 'iberico', nombre: 'Solomillo ibérico', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'costilla-iberica', cat: 'iberico', nombre: 'Costilla ibérica', desc: '', opcionLabel: 'Preparación', opciones: [], cantidades: ["250 gr","500 gr","750 gr","1 kg"], img: '' },
  { id: 'refrescos', cat: 'bebidas', nombre: 'Refrescos', desc: '', opcionLabel: 'Variedad y formato', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'cervezas-vinos', cat: 'bebidas', nombre: 'Cervezas y vinos', desc: '', opcionLabel: 'Variedad y formato', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
  { id: 'agua-zumos', cat: 'bebidas', nombre: 'Agua y zumos', desc: '', opcionLabel: 'Variedad y formato', opciones: [], cantidades: ["1 unidad","2 unidades","4 unidades","6 unidades"], img: '' },
];

window.FACTORES_OPCIONES = {};

// Descripciones editoriales preparadas para el catálogo; no alteran precios ni activación.
const DESCRIPCIONES_RODRI = {
  "chuletas-de-lomo": "Chuletas de lomo de cerdo, ideales para plancha o parrilla.",
  "lomo-entero": "Pieza de lomo de cerdo para asar o preparar al gusto.",
  "filetes-de-lomo": "Filetes de lomo de cerdo para cocinar a la plancha o empanar.",
  "solomillo-de-cerdo": "Corte tierno de cerdo, apropiado para medallones o asados.",
  "trocitos-de-cerdo": "Cerdo troceado, práctico para guisos y salteados.",
  "filete-de-jamon-de-cerdo": "Filetes de jamón de cerdo para plancha o empanados.",
  "tiras-de-costilla": "Tiras de costilla de cerdo para horno, guiso o barbacoa.",
  "costilla-carnosa": "Costilla carnosa de cerdo, ideal para horno o guisos.",
  "jarrete-de-cerdo": "Jarrete de cerdo, recomendado para cocción lenta.",
  "manitas-de-cerdo": "Manitas de cerdo para guisos tradicionales.",
  "higado-de-cerdo": "Hígado de cerdo para preparaciones tradicionales.",
  "pella-de-cerdo": "Pella de cerdo para elaboraciones tradicionales.",
  "hueso-de-espinazo-de-cerdo": "Hueso de espinazo de cerdo para caldos y pucheros.",
  "oreja-de-cerdo": "Oreja de cerdo para guisos y recetas tradicionales.",
  "lengua-de-cerdo": "Lengua de cerdo para recetas de cocción lenta.",
  "punta-de-solomillo": "Punta de solomillo de cerdo, para plancha o salteados.",
  "tocino-fresco": "Tocino fresco de cerdo para guisos y cocina tradicional.",
  "chuletas-ibericas": "Chuletas de cerdo ibérico para plancha o parrilla.",
  "lomo-iberico": "Lomo de cerdo ibérico para preparar a tu gusto.",
  "lagartito-iberico": "Corte ibérico estrecho y jugoso, ideal para la plancha.",
  "presa-iberica": "Presa ibérica para plancha, parrilla o asado.",
  "secreto-iberico": "Secreto ibérico, corte jugoso ideal para parrilla.",
  "solomillo-iberico": "Solomillo ibérico para medallones, plancha o asado.",
  "costilla-iberica": "Costilla ibérica para horno o parrilla.",
  "lagrimitas-de-pollo": "Tiras de pollo preparadas para cocinar.",
  "aneto-jamon-y-queso": "Elaborado relleno de jamón y queso, listo para cocinar.",
  "albondigas-de-pollo": "Albóndigas de pollo preparadas para cocinar.",
  "albondigas-mixtas": "Albóndigas mixtas preparadas para guisar.",
  "san-jacobo": "San Jacobo preparado para cocinar.",
  "fajitas-de-pollo": "Preparado de pollo para elaborar fajitas.",
  "hamburguesa-de-pollo": "Hamburguesa de pollo preparada para cocinar.",
  "hamburguesa-iberica": "Hamburguesa ibérica preparada para cocinar.",
  "hamburguesa-de-ternera": "Hamburguesa de ternera preparada para cocinar.",
  "hamburguesa-de-cerdo": "Hamburguesa de cerdo preparada para cocinar.",
  "pinchito-de-pollo-pechuga": "Pinchito elaborado con pechuga de pollo.",
  "pinchito-de-pollo-contramuslo": "Pinchito elaborado con contramuslo de pollo.",
  "pinchito-de-cerdo": "Pinchito de cerdo preparado para cocinar.",
  "espinazo-salado": "Espinazo salado para guisos y potajes tradicionales.",
  "costilla-salada": "Costilla salada para potajes y cocina tradicional.",
  "tocino-salado": "Tocino salado para guisos y potajes.",
  "corteza-aneja": "Corteza añeja para dar sabor a platos tradicionales.",
  "rabo-salado": "Rabo salado para guisos tradicionales.",
  "chuleta-de-ternera": "Chuleta de ternera para plancha o parrilla.",
  "ternera-para-guiso": "Ternera cortada para guisos y estofados.",
  "solomillo-de-ternera": "Solomillo de ternera para plancha o medallones.",
  "entrecot-de-ternera": "Entrecot de ternera para parrilla o plancha."
};
window.PRODUCTOS.forEach(producto => { if (!producto.desc && DESCRIPCIONES_RODRI[producto.id]) producto.desc = DESCRIPCIONES_RODRI[producto.id]; });

// Imágenes verificadas en la biblioteca de GitHub. No crea ni activa productos.
// Se usan solo como respaldo cuando Supabase no tiene imagen principal configurada.
window.IMAGENES_BIBLIOTECA_RODRI = {
  "espinazo-salado": "img/productos/biblioteca/salados/01-espinazo-salado.jpg",
  "blanco-salado": "img/productos/biblioteca/salados/02-blanco-salado.jpg",
  "costilla-salada": "img/productos/biblioteca/salados/03-costilla-salada.jpg",
  "tocino-salado": "img/productos/biblioteca/salados/04-tocino-salado.jpg",
  "corteza-aneja": "img/productos/biblioteca/salados/05-corteza-aneja.jpg",
  "rabo-salado": "img/productos/biblioteca/salados/06-rabo-salado.jpg",
  "filetes-empanados": "img/productos/biblioteca/precocinados/01-filetes-empanados.jpg",
  "lagrimitas-de-pollo": "img/productos/biblioteca/precocinados/02-lagrimitas-de-pollo.jpg",
  "aneto-jamon-y-queso": "img/productos/biblioteca/precocinados/03-aneto-de-jamon-y-queso.jpg",
  "albondigas-de-pollo": "img/productos/biblioteca/precocinados/04-albondigas-de-pollo.jpg",
  "albondigas-mixtas": "img/productos/biblioteca/precocinados/05-albondigas-mixtas.jpg",
  "san-jacobo": "img/productos/biblioteca/precocinados/06-san-jacobos.jpg",
  "fajitas-de-pollo": "img/productos/biblioteca/precocinados/08-fajitas-de-pollo.jpg",
  "hamburguesa-de-pollo": "img/productos/biblioteca/precocinados/09-hamburguesas-de-pollo.jpg",
  "hamburguesa-iberica": "img/productos/biblioteca/precocinados/10-hamburguesas-ibericas.jpg",
  "hamburguesa-de-ternera": "img/productos/biblioteca/precocinados/11-hamburguesas-de-ternera.jpg",
  "hamburguesa-de-cerdo": "img/productos/biblioteca/precocinados/12-hamburguesas-de-cerdo.jpg",
  "pinchito-de-pollo-pechuga": "img/productos/biblioteca/precocinados/13-pinchitos-de-pechuga-de-pollo.jpg",
  "pinchito-de-pollo-contramuslo": "img/productos/biblioteca/precocinados/14-pinchitos-de-contramuslo-de-pollo.jpg",
  "pinchito-de-cerdo": "img/productos/biblioteca/precocinados/15-pinchitos-de-cerdo.jpg",
  "chuletas-de-lomo": "img/productos/biblioteca/cerdo/01-chuletas-de-lomo-de-cerdo.jpg",
  "lomo-entero": "img/productos/biblioteca/cerdo/02-lomo-entero-de-cerdo.jpg",
  "filetes-de-lomo": "img/productos/biblioteca/cerdo/03-filetes-de-lomo-de-cerdo.jpg",
  "chuletas-de-cabeza": "img/productos/biblioteca/cerdo/04-chuletas-de-cabeza-de-cerdo.jpg",
  "cabeza-entera-con-hueso": "img/productos/biblioteca/cerdo/05-cabeza-entera-con-hueso-de-cerdo.jpg",
  "cabeza-entera-sin-hueso": "img/productos/biblioteca/cerdo/06-cabeza-entera-sin-hueso-de-cerdo.jpg",
  "filete-de-jamon-de-cerdo": "img/productos/biblioteca/cerdo/09-filetes-de-jamon-de-cerdo.jpg",
  "jamon-entero-de-cerdo": "img/productos/biblioteca/cerdo/10-jamon-entero-de-cerdo.jpg",
  "paleta-entera-de-cerdo": "img/productos/biblioteca/cerdo/11-paleta-entera-de-cerdo.jpg",
  "morcilla-cerdo": "img/productos/biblioteca/cerdo/12-morcilla-de-cerdo.jpg",
  "chorizo-cerdo": "img/productos/biblioteca/cerdo/13-chorizo-de-cerdo.jpg",
  "tiras-de-costilla": "img/productos/biblioteca/cerdo/14-tiras-de-costilla-de-lomo-de-cerdo.jpg",
  "costilla-carnosa": "img/productos/biblioteca/cerdo/15-costilla-carnosa-de-cerdo.jpg",
  "manitas-de-cerdo": "img/productos/biblioteca/cerdo/17-manitas-de-cerdo.jpg",
  "higado-de-cerdo": "img/productos/biblioteca/cerdo/18-higado-de-cerdo.jpg",
  "hueso-de-espinazo-de-cerdo": "img/productos/biblioteca/cerdo/21-hueso-de-espinazo-de-cerdo.jpg",
  "oreja-de-cerdo": "img/productos/biblioteca/cerdo/22-oreja-de-cerdo.jpg",
  "lengua-de-cerdo": "img/productos/biblioteca/cerdo/23-lengua-de-cerdo.jpg",
  "punta-de-solomillo": "img/productos/biblioteca/cerdo/24-punta-de-solomillo-de-cerdo.jpg",
  "tocino-fresco": "img/productos/biblioteca/cerdo/25-tocino-fresco-de-cerdo.jpg",
  "babilla-de-ternera": "img/productos/biblioteca/ternera/01-babilla-de-ternera.jpg",
  "chuleta-de-ternera": "img/productos/biblioteca/ternera/02-chuleta-de-ternera.jpg",
  "ternera-para-guiso": "img/productos/biblioteca/ternera/03-carne-para-guiso-de-ternera.jpg",
  "solomillo-de-ternera": "img/productos/biblioteca/ternera/04-solomillo-de-ternera.jpg",
  "entrecot-de-ternera": "img/productos/biblioteca/ternera/05-entrecot-de-ternera.jpg",
  "chuletas-ibericas": "img/productos/biblioteca/cerdo-iberico/01-chuletas-ibericas.jpg",
  "lomo-iberico": "img/productos/biblioteca/cerdo-iberico/02-lomo-iberico.jpg",
  "filete-iberico": "img/productos/biblioteca/cerdo-iberico/03-filete-iberico.jpg",
  "lagartito-iberico": "img/productos/biblioteca/cerdo-iberico/04-lagartito-iberico.jpg",
  "presa-iberica": "img/productos/biblioteca/cerdo-iberico/05-presa-iberica.jpg",
  "secreto-iberico": "img/productos/biblioteca/cerdo-iberico/06-secreto-iberico.jpg",
  "solomillo-iberico": "img/productos/biblioteca/cerdo-iberico/07-solomillo-iberico.jpg",
  "costilla-iberica": "img/productos/biblioteca/cerdo-iberico/08-costilla-iberica.jpg"
};
window.PRODUCTOS.forEach(producto => {
  if (window.IMAGENES_BIBLIOTECA_RODRI[producto.id]) {
    producto.imagenBiblioteca = window.IMAGENES_BIBLIOTECA_RODRI[producto.id];
  }
});

// DEMOSTRACIÓN TEMPORAL: precios estimados y opciones propuestas; no son tarifas oficiales.
// Supabase sigue teniendo prioridad al sincronizar precios y opciones configuradas.
window.RODRI_PRECIOS_DEMO = {
  "chuletas-de-lomo": {
    "precio": 9.5,
    "unidad": "kg",
    "opciones": [
      "Finas",
      "Normales",
      "Gruesas"
    ]
  },
  "lomo-entero": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos"
    ]
  },
  "filetes-de-lomo": {
    "precio": 10.9,
    "unidad": "kg",
    "opciones": [
      "Finos",
      "Normales",
      "Gruesos"
    ]
  },
  "chuletas-de-cabeza": {
    "precio": 8.9,
    "unidad": "kg",
    "opciones": [
      "Finas",
      "Normales",
      "Gruesas"
    ]
  },
  "cabeza-entera-con-hueso": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "cabeza-entera-sin-hueso": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "solomillo-de-cerdo": {
    "precio": 13.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En medallones",
      "En trozos"
    ]
  },
  "trocitos-de-cerdo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "filete-de-jamon-de-cerdo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "jamon-entero-de-cerdo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "paleta-entera-de-cerdo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "morcilla-cerdo": {
    "precio": 8.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "chorizo-cerdo": {
    "precio": 10.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "tiras-de-costilla": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "costilla-carnosa": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "jarrete-de-cerdo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "manitas-de-cerdo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "higado-de-cerdo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "pella-de-cerdo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "pajarilla-de-cerdo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "hueso-de-espinazo-de-cerdo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "oreja-de-cerdo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "lengua-de-cerdo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "punta-de-solomillo": {
    "precio": 9.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "tocino-fresco": {
    "precio": 5.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En trozos",
      "Para guiso"
    ]
  },
  "chuletas-ibericas": {
    "precio": 19.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En medallones"
    ]
  },
  "lomo-iberico": {
    "precio": 21.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En medallones"
    ]
  },
  "filete-iberico": {
    "precio": 20.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En medallones"
    ]
  },
  "lagartito-iberico": {
    "precio": 20.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En medallones"
    ]
  },
  "presa-iberica": {
    "precio": 24.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En medallones"
    ]
  },
  "secreto-iberico": {
    "precio": 21.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En medallones"
    ]
  },
  "solomillo-iberico": {
    "precio": 23.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En medallones"
    ]
  },
  "costilla-iberica": {
    "precio": 15.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En medallones"
    ]
  },
  "babilla-de-ternera": {
    "precio": 18.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En dados para guiso"
    ]
  },
  "chuleta-de-ternera": {
    "precio": 22.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En dados para guiso"
    ]
  },
  "ternera-para-guiso": {
    "precio": 15.9,
    "unidad": "kg",
    "opciones": [
      "En dados",
      "En trozos grandes"
    ]
  },
  "solomillo-de-ternera": {
    "precio": 39.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En dados para guiso"
    ]
  },
  "entrecot-de-ternera": {
    "precio": 24.9,
    "unidad": "kg",
    "opciones": [
      "Entero",
      "En filetes",
      "En dados para guiso"
    ]
  },
  "espinazo-salado": {
    "precio": 5.9,
    "unidad": "kg",
    "opciones": [
      "Por peso",
      "En trozos"
    ]
  },
  "blanco-salado": {
    "precio": 6.9,
    "unidad": "kg",
    "opciones": [
      "Por peso",
      "En trozos"
    ]
  },
  "costilla-salada": {
    "precio": 8.9,
    "unidad": "kg",
    "opciones": [
      "Por peso",
      "En trozos"
    ]
  },
  "tocino-salado": {
    "precio": 6.5,
    "unidad": "kg",
    "opciones": [
      "Por peso",
      "En trozos"
    ]
  },
  "corteza-aneja": {
    "precio": 5.9,
    "unidad": "kg",
    "opciones": [
      "Por peso",
      "En trozos"
    ]
  },
  "rabo-salado": {
    "precio": 6.9,
    "unidad": "kg",
    "opciones": [
      "Por peso",
      "En trozos"
    ]
  },
  "filetes-empanados": {
    "precio": 13.9,
    "unidad": "kg",
    "opciones": [
      "Por unidades",
      "Por peso"
    ]
  },
  "lagrimitas-de-pollo": {
    "precio": 12.9,
    "unidad": "kg",
    "opciones": [
      "Por unidades",
      "Por peso"
    ]
  },
  "aneto-jamon-y-queso": {
    "precio": 4.5,
    "unidad": "ud",
    "opciones": [
      "Por unidades",
      "Por peso"
    ]
  },
  "albondigas-de-pollo": {
    "precio": 11.9,
    "unidad": "kg",
    "opciones": [
      "Por unidades",
      "Por peso"
    ]
  },
  "albondigas-mixtas": {
    "precio": 12.9,
    "unidad": "kg",
    "opciones": [
      "Por unidades",
      "Por peso"
    ]
  },
  "san-jacobo": {
    "precio": 3.5,
    "unidad": "ud",
    "opciones": [
      "Por unidades"
    ]
  },
  "fajitas-de-pollo": {
    "precio": 12.9,
    "unidad": "kg",
    "opciones": [
      "Por unidades",
      "Por peso"
    ]
  },
  "hamburguesa-de-pollo": {
    "precio": 2.2,
    "unidad": "ud",
    "opciones": [
      "Por unidades"
    ]
  },
  "hamburguesa-iberica": {
    "precio": 3.2,
    "unidad": "ud",
    "opciones": [
      "Por unidades"
    ]
  },
  "hamburguesa-de-ternera": {
    "precio": 3.1,
    "unidad": "ud",
    "opciones": [
      "Por unidades"
    ]
  },
  "hamburguesa-de-cerdo": {
    "precio": 2.1,
    "unidad": "ud",
    "opciones": [
      "Por unidades"
    ]
  },
  "pinchito-de-pollo-pechuga": {
    "precio": 2.5,
    "unidad": "ud",
    "opciones": [
      "Por unidades"
    ]
  },
  "pinchito-de-pollo-contramuslo": {
    "precio": 2.3,
    "unidad": "ud",
    "opciones": [
      "Por unidades"
    ]
  },
  "pinchito-de-cerdo": {
    "precio": 2.4,
    "unidad": "ud",
    "opciones": [
      "Por unidades"
    ]
  }
};
// Mantener también limpio el catálogo local de respaldo.
const categoriaRetirada = texto => /\b(conejo|conejos|cordero|corderos|caza|cabrito|cabritos|cabrita|cabritas)\b/.test(
  String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[_-]/g, ' ')
);
window.CATEGORIAS = window.CATEGORIAS.filter(c => !categoriaRetirada(c.id) && !categoriaRetirada(c.nombre));
window.PRODUCTOS = window.PRODUCTOS.filter(p => !categoriaRetirada(p.cat) && !categoriaRetirada(p.nombre));

window.PRODUCTOS.forEach(producto => {
  const demo = window.RODRI_PRECIOS_DEMO[producto.id];
  if (!demo) return;
  producto.precioDemo = true;
  producto.precio = demo.precio.toFixed(2).replace('.', ',') + ' €/' + demo.unidad;
  producto.opcionLabel = 'Corte o preparación (propuesta)';
  producto.opciones = demo.opciones.slice();
  producto.cantidades = demo.unidad === 'ud'
    ? ['1 unidad','2 unidades','4 unidades','6 unidades']
    : ['250 gr','500 gr','750 gr','1 kg'];
});

// Imágenes ya presentes en GitHub y verificadas en el inventario del catálogo.
// No reemplazar fotografías configuradas manualmente ni publicar productos nuevos.
(function asignarImagenesVerificadas(){
  const imagenes = {
  "chuletas-de-lomo": "img/productos/biblioteca/cerdo/01-chuletas-de-lomo-de-cerdo.jpg",
  "lomo-entero": "img/productos/biblioteca/cerdo/02-lomo-entero-de-cerdo.jpg",
  "filetes-de-lomo": "img/productos/biblioteca/cerdo/03-filetes-de-lomo-de-cerdo.jpg",
  "chuletas-de-cabeza": "img/productos/biblioteca/cerdo/04-chuletas-de-cabeza-de-cerdo.jpg",
  "cabeza-entera-con-hueso": "img/productos/biblioteca/cerdo/05-cabeza-entera-con-hueso-de-cerdo.jpg",
  "cabeza-entera-sin-hueso": "img/productos/biblioteca/cerdo/06-cabeza-entera-sin-hueso-de-cerdo.jpg",
  "filete-de-jamon-de-cerdo": "img/productos/biblioteca/cerdo/09-filetes-de-jamon-de-cerdo.jpg",
  "jamon-entero-de-cerdo": "img/productos/biblioteca/cerdo/10-jamon-entero-de-cerdo.jpg",
  "paleta-entera-de-cerdo": "img/productos/biblioteca/cerdo/11-paleta-entera-de-cerdo.jpg",
  "morcilla": "img/productos/biblioteca/cerdo/12-morcilla-de-cerdo.jpg",
  "chorizo": "img/productos/biblioteca/cerdo/13-chorizo-de-cerdo.jpg",
  "costilla-carnosa": "img/productos/biblioteca/cerdo/15-costilla-carnosa-de-cerdo.jpg",
  "manitas-de-cerdo": "img/productos/biblioteca/cerdo/17-manitas-de-cerdo.jpg",
  "higado-de-cerdo": "img/productos/biblioteca/cerdo/18-higado-de-cerdo.jpg",
  "hueso-de-espinazo-de-cerdo": "img/productos/biblioteca/cerdo/21-hueso-de-espinazo-de-cerdo.jpg",
  "oreja-de-cerdo": "img/productos/biblioteca/cerdo/22-oreja-de-cerdo.jpg",
  "lengua-de-cerdo": "img/productos/biblioteca/cerdo/23-lengua-de-cerdo.jpg",
  "punta-de-solomillo": "img/productos/biblioteca/cerdo/24-punta-de-solomillo-de-cerdo.jpg",
  "tocino-fresco": "img/productos/biblioteca/cerdo/25-tocino-fresco-de-cerdo.jpg",
  "chuletas-ibericas": "img/productos/biblioteca/cerdo-iberico/01-chuletas-ibericas.jpg",
  "lomo-iberico": "img/productos/biblioteca/cerdo-iberico/02-lomo-iberico.jpg",
  "filete-iberico": "img/productos/biblioteca/cerdo-iberico/03-filete-iberico.jpg",
  "lagartito-iberico": "img/productos/biblioteca/cerdo-iberico/04-lagartito-iberico.jpg",
  "presa-iberica": "img/productos/biblioteca/cerdo-iberico/05-presa-iberica.jpg",
  "secreto-iberico": "img/productos/biblioteca/cerdo-iberico/06-secreto-iberico.jpg",
  "solomillo-iberico": "img/productos/biblioteca/cerdo-iberico/07-solomillo-iberico.jpg",
  "costilla-iberica": "img/productos/biblioteca/cerdo-iberico/08-costilla-iberica.jpg",
  "babilla-de-ternera": "img/productos/biblioteca/ternera/01-babilla-de-ternera.jpg",
  "chuleta-de-ternera": "img/productos/biblioteca/ternera/02-chuleta-de-ternera.jpg",
  "ternera-para-guiso": "img/productos/biblioteca/ternera/03-carne-para-guiso-de-ternera.jpg",
  "solomillo-de-ternera": "img/productos/biblioteca/ternera/04-solomillo-de-ternera.jpg",
  "entrecot-de-ternera": "img/productos/biblioteca/ternera/05-entrecot-de-ternera.jpg",
  "espinazo-salado": "img/productos/biblioteca/salados/01-espinazo-salado.jpg",
  "blanco-salado": "img/productos/biblioteca/salados/02-blanco-salado.jpg",
  "costilla-salada": "img/productos/biblioteca/salados/03-costilla-salada.jpg",
  "tocino-salado": "img/productos/biblioteca/salados/04-tocino-salado.jpg",
  "corteza-aneja": "img/productos/biblioteca/salados/05-corteza-aneja.jpg",
  "rabo-salado": "img/productos/biblioteca/salados/06-rabo-salado.jpg",
  "filetes-empanados": "img/productos/biblioteca/precocinados/01-filetes-empanados.jpg",
  "lagrimitas-de-pollo": "img/productos/biblioteca/precocinados/02-lagrimitas-de-pollo.jpg",
  "albondigas-de-pollo": "img/productos/biblioteca/precocinados/04-albondigas-de-pollo.jpg",
  "albondigas-mixtas": "img/productos/biblioteca/precocinados/05-albondigas-mixtas.jpg",
  "san-jacobo": "img/productos/biblioteca/precocinados/06-san-jacobos.jpg",
  "fajitas-de-pollo": "img/productos/biblioteca/precocinados/08-fajitas-de-pollo.jpg",
  "hamburguesa-de-pollo": "img/productos/biblioteca/precocinados/09-hamburguesas-de-pollo.jpg",
  "hamburguesa-iberica": "img/productos/biblioteca/precocinados/10-hamburguesas-ibericas.jpg",
  "hamburguesa-de-ternera": "img/productos/biblioteca/precocinados/11-hamburguesas-de-ternera.jpg",
  "hamburguesa-de-cerdo": "img/productos/biblioteca/precocinados/12-hamburguesas-de-cerdo.jpg",
  "pinchito-de-cerdo": "img/productos/biblioteca/precocinados/15-pinchitos-de-cerdo.jpg"
};
  for (const producto of window.PRODUCTOS || []) {
    if (!producto.img && !producto.imagenBiblioteca && imagenes[producto.id]) {
      producto.img = imagenes[producto.id];
    }
  }
})();
