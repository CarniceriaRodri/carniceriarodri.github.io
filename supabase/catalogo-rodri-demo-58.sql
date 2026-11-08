-- Carnicería Rodri · DEMOSTRACIÓN DE CATÁLOGO
-- Solo inserta productos y opciones que no existan; no modifica precios, fotos ni estados anteriores.
-- Precios orientativos NO REALES. Revisar antes de uso comercial.
-- Los cinco productos sin imagen quedan con imagen NULL; no se inventan fotos.
BEGIN;

INSERT INTO public.categories (id,name,tagline,sort_order,active)
VALUES
  ('cerdo', 'Cerdo', 'Cortes y piezas de cerdo', 10, true),
  ('iberico', 'Cerdo ibérico', 'Cortes y piezas ibéricas', 20, true),
  ('ternera', 'Ternera', 'Cortes y piezas de ternera', 30, true),
  ('salado', 'Salado', 'Salazones y embutidos', 40, true),
  ('precocinados', 'Precocinados', 'Elaborados listos para cocinar', 50, true)
ON CONFLICT (id) DO NOTHING;

-- Chuletas de lomo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('chuletas-de-lomo','Chuletas de lomo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/01-chuletas-de-lomo-de-cerdo.jpg',950,true,1,'kg','["Finas","Normales","Gruesas"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuletas-de-lomo','Finas',950,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuletas-de-lomo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuletas-de-lomo' AND lower(trim(label))=lower(trim('Finas')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuletas-de-lomo','Normales',950,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuletas-de-lomo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuletas-de-lomo' AND lower(trim(label))=lower(trim('Normales')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuletas-de-lomo','Gruesas',950,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuletas-de-lomo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuletas-de-lomo' AND lower(trim(label))=lower(trim('Gruesas')));

-- Lomo entero
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('lomo-entero','Lomo entero','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/02-lomo-entero-de-cerdo.jpg',990,true,2,'kg','["Entero","En filetes","En trozos"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lomo-entero','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lomo-entero')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lomo-entero' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lomo-entero','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lomo-entero')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lomo-entero' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lomo-entero','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lomo-entero')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lomo-entero' AND lower(trim(label))=lower(trim('En trozos')));

-- Filetes de lomo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('filetes-de-lomo','Filetes de lomo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/03-filetes-de-lomo-de-cerdo.jpg',1090,true,3,'kg','["Finos","Normales","Gruesos"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filetes-de-lomo','Finos',1090,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filetes-de-lomo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filetes-de-lomo' AND lower(trim(label))=lower(trim('Finos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filetes-de-lomo','Normales',1090,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filetes-de-lomo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filetes-de-lomo' AND lower(trim(label))=lower(trim('Normales')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filetes-de-lomo','Gruesos',1090,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filetes-de-lomo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filetes-de-lomo' AND lower(trim(label))=lower(trim('Gruesos')));

-- Chuletas de cabeza
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('chuletas-de-cabeza','Chuletas de cabeza','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/04-chuletas-de-cabeza-de-cerdo.jpg',890,true,4,'kg','["Finas","Normales","Gruesas"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuletas-de-cabeza','Finas',890,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuletas-de-cabeza')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuletas-de-cabeza' AND lower(trim(label))=lower(trim('Finas')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuletas-de-cabeza','Normales',890,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuletas-de-cabeza')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuletas-de-cabeza' AND lower(trim(label))=lower(trim('Normales')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuletas-de-cabeza','Gruesas',890,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuletas-de-cabeza')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuletas-de-cabeza' AND lower(trim(label))=lower(trim('Gruesas')));

-- Cabeza entera con hueso
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('cabeza-entera-con-hueso','Cabeza entera con hueso','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/05-cabeza-entera-con-hueso-de-cerdo.jpg',990,true,5,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'cabeza-entera-con-hueso','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='cabeza-entera-con-hueso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='cabeza-entera-con-hueso' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'cabeza-entera-con-hueso','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='cabeza-entera-con-hueso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='cabeza-entera-con-hueso' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'cabeza-entera-con-hueso','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='cabeza-entera-con-hueso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='cabeza-entera-con-hueso' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'cabeza-entera-con-hueso','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='cabeza-entera-con-hueso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='cabeza-entera-con-hueso' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'cabeza-entera-con-hueso','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='cabeza-entera-con-hueso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='cabeza-entera-con-hueso' AND lower(trim(label))=lower(trim('Al gusto')));

-- Cabeza entera sin hueso
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('cabeza-entera-sin-hueso','Cabeza entera sin hueso','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/06-cabeza-entera-sin-hueso-de-cerdo.jpg',990,true,6,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'cabeza-entera-sin-hueso','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='cabeza-entera-sin-hueso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='cabeza-entera-sin-hueso' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'cabeza-entera-sin-hueso','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='cabeza-entera-sin-hueso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='cabeza-entera-sin-hueso' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'cabeza-entera-sin-hueso','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='cabeza-entera-sin-hueso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='cabeza-entera-sin-hueso' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'cabeza-entera-sin-hueso','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='cabeza-entera-sin-hueso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='cabeza-entera-sin-hueso' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'cabeza-entera-sin-hueso','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='cabeza-entera-sin-hueso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='cabeza-entera-sin-hueso' AND lower(trim(label))=lower(trim('Al gusto')));

-- Solomillo de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('solomillo-de-cerdo','Solomillo de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo',NULL,1390,true,7,'kg','["Entero","En medallones","En trozos"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'solomillo-de-cerdo','Entero',1390,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='solomillo-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='solomillo-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'solomillo-de-cerdo','En medallones',1390,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='solomillo-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='solomillo-de-cerdo' AND lower(trim(label))=lower(trim('En medallones')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'solomillo-de-cerdo','En trozos',1390,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='solomillo-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='solomillo-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));

-- Trocitos de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('trocitos-de-cerdo','Trocitos de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo',NULL,990,true,8,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'trocitos-de-cerdo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='trocitos-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='trocitos-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'trocitos-de-cerdo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='trocitos-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='trocitos-de-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'trocitos-de-cerdo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='trocitos-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='trocitos-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'trocitos-de-cerdo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='trocitos-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='trocitos-de-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'trocitos-de-cerdo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='trocitos-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='trocitos-de-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Filete de jamón de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('filete-de-jamon-de-cerdo','Filete de jamón de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/09-filetes-de-jamon-de-cerdo.jpg',990,true,9,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filete-de-jamon-de-cerdo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filete-de-jamon-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filete-de-jamon-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filete-de-jamon-de-cerdo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filete-de-jamon-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filete-de-jamon-de-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filete-de-jamon-de-cerdo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filete-de-jamon-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filete-de-jamon-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filete-de-jamon-de-cerdo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filete-de-jamon-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filete-de-jamon-de-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filete-de-jamon-de-cerdo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filete-de-jamon-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filete-de-jamon-de-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Jamón entero de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('jamon-entero-de-cerdo','Jamón entero de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/10-jamon-entero-de-cerdo.jpg',990,true,10,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'jamon-entero-de-cerdo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='jamon-entero-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='jamon-entero-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'jamon-entero-de-cerdo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='jamon-entero-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='jamon-entero-de-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'jamon-entero-de-cerdo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='jamon-entero-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='jamon-entero-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'jamon-entero-de-cerdo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='jamon-entero-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='jamon-entero-de-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'jamon-entero-de-cerdo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='jamon-entero-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='jamon-entero-de-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Paleta entera de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('paleta-entera-de-cerdo','Paleta entera de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/11-paleta-entera-de-cerdo.jpg',990,true,11,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'paleta-entera-de-cerdo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='paleta-entera-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='paleta-entera-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'paleta-entera-de-cerdo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='paleta-entera-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='paleta-entera-de-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'paleta-entera-de-cerdo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='paleta-entera-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='paleta-entera-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'paleta-entera-de-cerdo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='paleta-entera-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='paleta-entera-de-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'paleta-entera-de-cerdo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='paleta-entera-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='paleta-entera-de-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Morcilla
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('morcilla-cerdo','Morcilla','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/12-morcilla-de-cerdo.jpg',890,true,12,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'morcilla-cerdo','Entero',890,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='morcilla-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='morcilla-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'morcilla-cerdo','En filetes',890,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='morcilla-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='morcilla-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'morcilla-cerdo','En trozos',890,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='morcilla-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='morcilla-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'morcilla-cerdo','Para guiso',890,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='morcilla-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='morcilla-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'morcilla-cerdo','Al gusto',890,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='morcilla-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='morcilla-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Chorizo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('chorizo-cerdo','Chorizo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/13-chorizo-de-cerdo.jpg',1090,true,13,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chorizo-cerdo','Entero',1090,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chorizo-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chorizo-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chorizo-cerdo','En filetes',1090,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chorizo-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chorizo-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chorizo-cerdo','En trozos',1090,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chorizo-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chorizo-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chorizo-cerdo','Para guiso',1090,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chorizo-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chorizo-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chorizo-cerdo','Al gusto',1090,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chorizo-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chorizo-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Tiras de costilla de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('tiras-de-costilla','Tiras de costilla de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/14-tiras-de-costilla-de-lomo-de-cerdo.jpg',990,true,14,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tiras-de-costilla','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tiras-de-costilla')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tiras-de-costilla' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tiras-de-costilla','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tiras-de-costilla')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tiras-de-costilla' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tiras-de-costilla','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tiras-de-costilla')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tiras-de-costilla' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tiras-de-costilla','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tiras-de-costilla')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tiras-de-costilla' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tiras-de-costilla','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tiras-de-costilla')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tiras-de-costilla' AND lower(trim(label))=lower(trim('Al gusto')));

-- Costilla carnosa
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('costilla-carnosa','Costilla carnosa','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/15-costilla-carnosa-de-cerdo.jpg',990,true,15,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'costilla-carnosa','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='costilla-carnosa')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='costilla-carnosa' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'costilla-carnosa','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='costilla-carnosa')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='costilla-carnosa' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'costilla-carnosa','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='costilla-carnosa')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='costilla-carnosa' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'costilla-carnosa','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='costilla-carnosa')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='costilla-carnosa' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'costilla-carnosa','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='costilla-carnosa')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='costilla-carnosa' AND lower(trim(label))=lower(trim('Al gusto')));

-- Jarrete de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('jarrete-de-cerdo','Jarrete de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo',NULL,990,true,16,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'jarrete-de-cerdo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='jarrete-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='jarrete-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'jarrete-de-cerdo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='jarrete-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='jarrete-de-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'jarrete-de-cerdo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='jarrete-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='jarrete-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'jarrete-de-cerdo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='jarrete-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='jarrete-de-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'jarrete-de-cerdo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='jarrete-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='jarrete-de-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Manitas de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('manitas-de-cerdo','Manitas de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/17-manitas-de-cerdo.jpg',990,true,17,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'manitas-de-cerdo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='manitas-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='manitas-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'manitas-de-cerdo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='manitas-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='manitas-de-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'manitas-de-cerdo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='manitas-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='manitas-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'manitas-de-cerdo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='manitas-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='manitas-de-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'manitas-de-cerdo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='manitas-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='manitas-de-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Hígado de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('higado-de-cerdo','Hígado de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/18-higado-de-cerdo.jpg',990,true,18,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'higado-de-cerdo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='higado-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='higado-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'higado-de-cerdo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='higado-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='higado-de-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'higado-de-cerdo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='higado-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='higado-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'higado-de-cerdo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='higado-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='higado-de-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'higado-de-cerdo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='higado-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='higado-de-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Pella de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('pella-de-cerdo','Pella de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo',NULL,990,true,19,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pella-de-cerdo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pella-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pella-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pella-de-cerdo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pella-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pella-de-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pella-de-cerdo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pella-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pella-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pella-de-cerdo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pella-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pella-de-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pella-de-cerdo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pella-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pella-de-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Pajarilla de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('pajarilla-de-cerdo','Pajarilla de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo',NULL,990,true,20,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pajarilla-de-cerdo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pajarilla-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pajarilla-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pajarilla-de-cerdo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pajarilla-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pajarilla-de-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pajarilla-de-cerdo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pajarilla-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pajarilla-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pajarilla-de-cerdo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pajarilla-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pajarilla-de-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pajarilla-de-cerdo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pajarilla-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pajarilla-de-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Hueso de espinazo de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('hueso-de-espinazo-de-cerdo','Hueso de espinazo de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/21-hueso-de-espinazo-de-cerdo.jpg',990,true,21,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'hueso-de-espinazo-de-cerdo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='hueso-de-espinazo-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='hueso-de-espinazo-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'hueso-de-espinazo-de-cerdo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='hueso-de-espinazo-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='hueso-de-espinazo-de-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'hueso-de-espinazo-de-cerdo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='hueso-de-espinazo-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='hueso-de-espinazo-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'hueso-de-espinazo-de-cerdo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='hueso-de-espinazo-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='hueso-de-espinazo-de-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'hueso-de-espinazo-de-cerdo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='hueso-de-espinazo-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='hueso-de-espinazo-de-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Oreja de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('oreja-de-cerdo','Oreja de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/22-oreja-de-cerdo.jpg',990,true,22,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'oreja-de-cerdo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='oreja-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='oreja-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'oreja-de-cerdo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='oreja-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='oreja-de-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'oreja-de-cerdo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='oreja-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='oreja-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'oreja-de-cerdo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='oreja-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='oreja-de-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'oreja-de-cerdo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='oreja-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='oreja-de-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Lengua de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('lengua-de-cerdo','Lengua de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/23-lengua-de-cerdo.jpg',990,true,23,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lengua-de-cerdo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lengua-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lengua-de-cerdo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lengua-de-cerdo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lengua-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lengua-de-cerdo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lengua-de-cerdo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lengua-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lengua-de-cerdo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lengua-de-cerdo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lengua-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lengua-de-cerdo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lengua-de-cerdo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lengua-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lengua-de-cerdo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Punta de solomillo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('punta-de-solomillo','Punta de solomillo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/24-punta-de-solomillo-de-cerdo.jpg',990,true,24,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'punta-de-solomillo','Entero',990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='punta-de-solomillo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='punta-de-solomillo' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'punta-de-solomillo','En filetes',990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='punta-de-solomillo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='punta-de-solomillo' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'punta-de-solomillo','En trozos',990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='punta-de-solomillo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='punta-de-solomillo' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'punta-de-solomillo','Para guiso',990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='punta-de-solomillo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='punta-de-solomillo' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'punta-de-solomillo','Al gusto',990,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='punta-de-solomillo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='punta-de-solomillo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Tocino fresco
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('tocino-fresco','Tocino fresco','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','cerdo','img/productos/biblioteca/cerdo/25-tocino-fresco-de-cerdo.jpg',590,true,25,'kg','["Entero","En filetes","En trozos","Para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tocino-fresco','Entero',590,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tocino-fresco')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tocino-fresco' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tocino-fresco','En filetes',590,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tocino-fresco')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tocino-fresco' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tocino-fresco','En trozos',590,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tocino-fresco')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tocino-fresco' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tocino-fresco','Para guiso',590,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tocino-fresco')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tocino-fresco' AND lower(trim(label))=lower(trim('Para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tocino-fresco','Al gusto',590,5,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tocino-fresco')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tocino-fresco' AND lower(trim(label))=lower(trim('Al gusto')));

-- Chuletas ibéricas
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('chuletas-ibericas','Chuletas ibéricas','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','iberico','img/productos/biblioteca/cerdo-iberico/01-chuletas-ibericas.jpg',1990,true,26,'kg','["Entero","En filetes","En medallones","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuletas-ibericas','Entero',1990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuletas-ibericas')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuletas-ibericas' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuletas-ibericas','En filetes',1990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuletas-ibericas')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuletas-ibericas' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuletas-ibericas','En medallones',1990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuletas-ibericas')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuletas-ibericas' AND lower(trim(label))=lower(trim('En medallones')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuletas-ibericas','Al gusto',1990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuletas-ibericas')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuletas-ibericas' AND lower(trim(label))=lower(trim('Al gusto')));

-- Lomo ibérico
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('lomo-iberico','Lomo ibérico','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','iberico','img/productos/biblioteca/cerdo-iberico/02-lomo-iberico.jpg',2190,true,27,'kg','["Entero","En filetes","En medallones","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lomo-iberico','Entero',2190,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lomo-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lomo-iberico' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lomo-iberico','En filetes',2190,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lomo-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lomo-iberico' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lomo-iberico','En medallones',2190,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lomo-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lomo-iberico' AND lower(trim(label))=lower(trim('En medallones')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lomo-iberico','Al gusto',2190,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lomo-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lomo-iberico' AND lower(trim(label))=lower(trim('Al gusto')));

-- Filete ibérico
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('filete-iberico','Filete ibérico','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','iberico','img/productos/biblioteca/cerdo-iberico/03-filete-iberico.jpg',2090,true,28,'kg','["Entero","En filetes","En medallones","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filete-iberico','Entero',2090,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filete-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filete-iberico' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filete-iberico','En filetes',2090,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filete-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filete-iberico' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filete-iberico','En medallones',2090,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filete-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filete-iberico' AND lower(trim(label))=lower(trim('En medallones')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filete-iberico','Al gusto',2090,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filete-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filete-iberico' AND lower(trim(label))=lower(trim('Al gusto')));

-- Lagartito ibérico
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('lagartito-iberico','Lagartito ibérico','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','iberico','img/productos/biblioteca/cerdo-iberico/04-lagartito-iberico.jpg',2090,true,29,'kg','["Entero","En filetes","En medallones","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lagartito-iberico','Entero',2090,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lagartito-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lagartito-iberico' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lagartito-iberico','En filetes',2090,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lagartito-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lagartito-iberico' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lagartito-iberico','En medallones',2090,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lagartito-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lagartito-iberico' AND lower(trim(label))=lower(trim('En medallones')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lagartito-iberico','Al gusto',2090,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lagartito-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lagartito-iberico' AND lower(trim(label))=lower(trim('Al gusto')));

-- Presa ibérica
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('presa-iberica','Presa ibérica','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','iberico','img/productos/biblioteca/cerdo-iberico/05-presa-iberica.jpg',2490,true,30,'kg','["Entero","En filetes","En medallones","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'presa-iberica','Entero',2490,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='presa-iberica')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='presa-iberica' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'presa-iberica','En filetes',2490,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='presa-iberica')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='presa-iberica' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'presa-iberica','En medallones',2490,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='presa-iberica')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='presa-iberica' AND lower(trim(label))=lower(trim('En medallones')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'presa-iberica','Al gusto',2490,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='presa-iberica')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='presa-iberica' AND lower(trim(label))=lower(trim('Al gusto')));

-- Secreto ibérico
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('secreto-iberico','Secreto ibérico','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','iberico','img/productos/biblioteca/cerdo-iberico/06-secreto-iberico.jpg',2190,true,31,'kg','["Entero","En filetes","En medallones","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'secreto-iberico','Entero',2190,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='secreto-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='secreto-iberico' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'secreto-iberico','En filetes',2190,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='secreto-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='secreto-iberico' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'secreto-iberico','En medallones',2190,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='secreto-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='secreto-iberico' AND lower(trim(label))=lower(trim('En medallones')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'secreto-iberico','Al gusto',2190,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='secreto-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='secreto-iberico' AND lower(trim(label))=lower(trim('Al gusto')));

-- Solomillo ibérico
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('solomillo-iberico','Solomillo ibérico','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','iberico','img/productos/biblioteca/cerdo-iberico/07-solomillo-iberico.jpg',2390,true,32,'kg','["Entero","En filetes","En medallones","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'solomillo-iberico','Entero',2390,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='solomillo-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='solomillo-iberico' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'solomillo-iberico','En filetes',2390,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='solomillo-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='solomillo-iberico' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'solomillo-iberico','En medallones',2390,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='solomillo-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='solomillo-iberico' AND lower(trim(label))=lower(trim('En medallones')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'solomillo-iberico','Al gusto',2390,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='solomillo-iberico')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='solomillo-iberico' AND lower(trim(label))=lower(trim('Al gusto')));

-- Costilla ibérica
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('costilla-iberica','Costilla ibérica','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','iberico','img/productos/biblioteca/cerdo-iberico/08-costilla-iberica.jpg',1590,true,33,'kg','["Entero","En filetes","En medallones","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'costilla-iberica','Entero',1590,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='costilla-iberica')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='costilla-iberica' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'costilla-iberica','En filetes',1590,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='costilla-iberica')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='costilla-iberica' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'costilla-iberica','En medallones',1590,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='costilla-iberica')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='costilla-iberica' AND lower(trim(label))=lower(trim('En medallones')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'costilla-iberica','Al gusto',1590,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='costilla-iberica')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='costilla-iberica' AND lower(trim(label))=lower(trim('Al gusto')));

-- Babilla de ternera
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('babilla-de-ternera','Babilla de ternera','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','ternera','img/productos/biblioteca/ternera/01-babilla-de-ternera.jpg',1890,true,34,'kg','["Entero","En filetes","En dados para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'babilla-de-ternera','Entero',1890,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='babilla-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='babilla-de-ternera' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'babilla-de-ternera','En filetes',1890,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='babilla-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='babilla-de-ternera' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'babilla-de-ternera','En dados para guiso',1890,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='babilla-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='babilla-de-ternera' AND lower(trim(label))=lower(trim('En dados para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'babilla-de-ternera','Al gusto',1890,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='babilla-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='babilla-de-ternera' AND lower(trim(label))=lower(trim('Al gusto')));

-- Chuleta de ternera
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('chuleta-de-ternera','Chuleta de ternera','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','ternera','img/productos/biblioteca/ternera/02-chuleta-de-ternera.jpg',2290,true,35,'kg','["Entero","En filetes","En dados para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuleta-de-ternera','Entero',2290,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuleta-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuleta-de-ternera' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuleta-de-ternera','En filetes',2290,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuleta-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuleta-de-ternera' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuleta-de-ternera','En dados para guiso',2290,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuleta-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuleta-de-ternera' AND lower(trim(label))=lower(trim('En dados para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'chuleta-de-ternera','Al gusto',2290,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='chuleta-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='chuleta-de-ternera' AND lower(trim(label))=lower(trim('Al gusto')));

-- Ternera para guiso
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('ternera-para-guiso','Ternera para guiso','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','ternera','img/productos/biblioteca/ternera/03-carne-para-guiso-de-ternera.jpg',1590,true,36,'kg','["En dados","En trozos grandes"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'ternera-para-guiso','En dados',1590,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='ternera-para-guiso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='ternera-para-guiso' AND lower(trim(label))=lower(trim('En dados')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'ternera-para-guiso','En trozos grandes',1590,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='ternera-para-guiso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='ternera-para-guiso' AND lower(trim(label))=lower(trim('En trozos grandes')));

-- Solomillo de ternera
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('solomillo-de-ternera','Solomillo de ternera','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','ternera','img/productos/biblioteca/ternera/04-solomillo-de-ternera.jpg',3990,true,37,'kg','["Entero","En filetes","En dados para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'solomillo-de-ternera','Entero',3990,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='solomillo-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='solomillo-de-ternera' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'solomillo-de-ternera','En filetes',3990,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='solomillo-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='solomillo-de-ternera' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'solomillo-de-ternera','En dados para guiso',3990,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='solomillo-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='solomillo-de-ternera' AND lower(trim(label))=lower(trim('En dados para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'solomillo-de-ternera','Al gusto',3990,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='solomillo-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='solomillo-de-ternera' AND lower(trim(label))=lower(trim('Al gusto')));

-- Entrecot de ternera
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('entrecot-de-ternera','Entrecot de ternera','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','ternera','img/productos/biblioteca/ternera/05-entrecot-de-ternera.jpg',2490,true,38,'kg','["Entero","En filetes","En dados para guiso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'entrecot-de-ternera','Entero',2490,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='entrecot-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='entrecot-de-ternera' AND lower(trim(label))=lower(trim('Entero')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'entrecot-de-ternera','En filetes',2490,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='entrecot-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='entrecot-de-ternera' AND lower(trim(label))=lower(trim('En filetes')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'entrecot-de-ternera','En dados para guiso',2490,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='entrecot-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='entrecot-de-ternera' AND lower(trim(label))=lower(trim('En dados para guiso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'entrecot-de-ternera','Al gusto',2490,4,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='entrecot-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='entrecot-de-ternera' AND lower(trim(label))=lower(trim('Al gusto')));

-- Espinazo salado
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('espinazo-salado','Espinazo salado','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','salado','img/productos/biblioteca/salados/01-espinazo-salado.jpg',590,true,39,'kg','["Por peso","En trozos","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'espinazo-salado','Por peso',590,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='espinazo-salado')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='espinazo-salado' AND lower(trim(label))=lower(trim('Por peso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'espinazo-salado','En trozos',590,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='espinazo-salado')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='espinazo-salado' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'espinazo-salado','Al gusto',590,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='espinazo-salado')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='espinazo-salado' AND lower(trim(label))=lower(trim('Al gusto')));

-- Blanco salado
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('blanco-salado','Blanco salado','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','salado','img/productos/biblioteca/salados/02-blanco-salado.jpg',690,true,40,'kg','["Por peso","En trozos","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'blanco-salado','Por peso',690,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='blanco-salado')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='blanco-salado' AND lower(trim(label))=lower(trim('Por peso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'blanco-salado','En trozos',690,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='blanco-salado')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='blanco-salado' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'blanco-salado','Al gusto',690,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='blanco-salado')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='blanco-salado' AND lower(trim(label))=lower(trim('Al gusto')));

-- Costilla salada
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('costilla-salada','Costilla salada','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','salado','img/productos/biblioteca/salados/03-costilla-salada.jpg',890,true,41,'kg','["Por peso","En trozos","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'costilla-salada','Por peso',890,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='costilla-salada')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='costilla-salada' AND lower(trim(label))=lower(trim('Por peso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'costilla-salada','En trozos',890,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='costilla-salada')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='costilla-salada' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'costilla-salada','Al gusto',890,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='costilla-salada')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='costilla-salada' AND lower(trim(label))=lower(trim('Al gusto')));

-- Tocino salado
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('tocino-salado','Tocino salado','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','salado','img/productos/biblioteca/salados/04-tocino-salado.jpg',650,true,42,'kg','["Por peso","En trozos","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tocino-salado','Por peso',650,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tocino-salado')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tocino-salado' AND lower(trim(label))=lower(trim('Por peso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tocino-salado','En trozos',650,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tocino-salado')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tocino-salado' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'tocino-salado','Al gusto',650,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='tocino-salado')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='tocino-salado' AND lower(trim(label))=lower(trim('Al gusto')));

-- Corteza añeja
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('corteza-aneja','Corteza añeja','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','salado','img/productos/biblioteca/salados/05-corteza-aneja.jpg',590,true,43,'kg','["Por peso","En trozos","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'corteza-aneja','Por peso',590,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='corteza-aneja')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='corteza-aneja' AND lower(trim(label))=lower(trim('Por peso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'corteza-aneja','En trozos',590,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='corteza-aneja')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='corteza-aneja' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'corteza-aneja','Al gusto',590,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='corteza-aneja')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='corteza-aneja' AND lower(trim(label))=lower(trim('Al gusto')));

-- Rabo salado
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('rabo-salado','Rabo salado','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','salado','img/productos/biblioteca/salados/06-rabo-salado.jpg',690,true,44,'kg','["Por peso","En trozos","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'rabo-salado','Por peso',690,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='rabo-salado')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='rabo-salado' AND lower(trim(label))=lower(trim('Por peso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'rabo-salado','En trozos',690,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='rabo-salado')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='rabo-salado' AND lower(trim(label))=lower(trim('En trozos')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'rabo-salado','Al gusto',690,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='rabo-salado')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='rabo-salado' AND lower(trim(label))=lower(trim('Al gusto')));

-- Filetes empanados
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('filetes-empanados','Filetes empanados','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/01-filetes-empanados.jpg',1390,true,45,'kg','["Por unidades","Por peso"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filetes-empanados','Por unidades',1390,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filetes-empanados')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filetes-empanados' AND lower(trim(label))=lower(trim('Por unidades')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'filetes-empanados','Por peso',1390,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='filetes-empanados')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='filetes-empanados' AND lower(trim(label))=lower(trim('Por peso')));

-- Lagrimitas de pollo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('lagrimitas-de-pollo','Lagrimitas de pollo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/02-lagrimitas-de-pollo.jpg',1290,true,46,'kg','["Por unidades","Por peso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lagrimitas-de-pollo','Por unidades',1290,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lagrimitas-de-pollo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lagrimitas-de-pollo' AND lower(trim(label))=lower(trim('Por unidades')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lagrimitas-de-pollo','Por peso',1290,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lagrimitas-de-pollo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lagrimitas-de-pollo' AND lower(trim(label))=lower(trim('Por peso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'lagrimitas-de-pollo','Al gusto',1290,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='lagrimitas-de-pollo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='lagrimitas-de-pollo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Aneto de jamón y queso
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('aneto-jamon-y-queso','Aneto de jamón y queso','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/03-aneto-de-jamon-y-queso.jpg',450,true,47,'ud','["Por unidades","Por peso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'aneto-jamon-y-queso','Por unidades',450,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='aneto-jamon-y-queso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='aneto-jamon-y-queso' AND lower(trim(label))=lower(trim('Por unidades')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'aneto-jamon-y-queso','Por peso',450,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='aneto-jamon-y-queso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='aneto-jamon-y-queso' AND lower(trim(label))=lower(trim('Por peso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'aneto-jamon-y-queso','Al gusto',450,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='aneto-jamon-y-queso')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='aneto-jamon-y-queso' AND lower(trim(label))=lower(trim('Al gusto')));

-- Albóndigas de pollo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('albondigas-de-pollo','Albóndigas de pollo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/04-albondigas-de-pollo.jpg',1190,true,48,'kg','["Por unidades","Por peso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'albondigas-de-pollo','Por unidades',1190,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='albondigas-de-pollo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='albondigas-de-pollo' AND lower(trim(label))=lower(trim('Por unidades')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'albondigas-de-pollo','Por peso',1190,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='albondigas-de-pollo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='albondigas-de-pollo' AND lower(trim(label))=lower(trim('Por peso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'albondigas-de-pollo','Al gusto',1190,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='albondigas-de-pollo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='albondigas-de-pollo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Albóndigas mixtas
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('albondigas-mixtas','Albóndigas mixtas','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/05-albondigas-mixtas.jpg',1290,true,49,'kg','["Por unidades","Por peso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'albondigas-mixtas','Por unidades',1290,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='albondigas-mixtas')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='albondigas-mixtas' AND lower(trim(label))=lower(trim('Por unidades')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'albondigas-mixtas','Por peso',1290,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='albondigas-mixtas')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='albondigas-mixtas' AND lower(trim(label))=lower(trim('Por peso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'albondigas-mixtas','Al gusto',1290,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='albondigas-mixtas')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='albondigas-mixtas' AND lower(trim(label))=lower(trim('Al gusto')));

-- San Jacobo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('san-jacobo','San Jacobo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/06-san-jacobos.jpg',350,true,50,'ud','["Por unidades"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'san-jacobo','Por unidades',350,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='san-jacobo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='san-jacobo' AND lower(trim(label))=lower(trim('Por unidades')));

-- Fajitas de pollo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('fajitas-de-pollo','Fajitas de pollo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/08-fajitas-de-pollo.jpg',1290,true,51,'kg','["Por unidades","Por peso","Al gusto"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'fajitas-de-pollo','Por unidades',1290,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='fajitas-de-pollo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='fajitas-de-pollo' AND lower(trim(label))=lower(trim('Por unidades')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'fajitas-de-pollo','Por peso',1290,2,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='fajitas-de-pollo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='fajitas-de-pollo' AND lower(trim(label))=lower(trim('Por peso')));
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'fajitas-de-pollo','Al gusto',1290,3,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='fajitas-de-pollo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='fajitas-de-pollo' AND lower(trim(label))=lower(trim('Al gusto')));

-- Hamburguesa de pollo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('hamburguesa-de-pollo','Hamburguesa de pollo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/09-hamburguesas-de-pollo.jpg',220,true,52,'ud','["Por unidades"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'hamburguesa-de-pollo','Por unidades',220,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='hamburguesa-de-pollo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='hamburguesa-de-pollo' AND lower(trim(label))=lower(trim('Por unidades')));

-- Hamburguesa ibérica
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('hamburguesa-iberica','Hamburguesa ibérica','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/10-hamburguesas-ibericas.jpg',320,true,53,'ud','["Por unidades"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'hamburguesa-iberica','Por unidades',320,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='hamburguesa-iberica')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='hamburguesa-iberica' AND lower(trim(label))=lower(trim('Por unidades')));

-- Hamburguesa de ternera
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('hamburguesa-de-ternera','Hamburguesa de ternera','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/11-hamburguesas-de-ternera.jpg',310,true,54,'ud','["Por unidades"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'hamburguesa-de-ternera','Por unidades',310,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='hamburguesa-de-ternera')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='hamburguesa-de-ternera' AND lower(trim(label))=lower(trim('Por unidades')));

-- Hamburguesa de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('hamburguesa-de-cerdo','Hamburguesa de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/12-hamburguesas-de-cerdo.jpg',210,true,55,'ud','["Por unidades"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'hamburguesa-de-cerdo','Por unidades',210,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='hamburguesa-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='hamburguesa-de-cerdo' AND lower(trim(label))=lower(trim('Por unidades')));

-- Pinchito de pechuga de pollo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('pinchito-de-pollo-pechuga','Pinchito de pechuga de pollo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/13-pinchitos-de-pechuga-de-pollo.jpg',250,true,56,'ud','["Por unidades"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pinchito-de-pollo-pechuga','Por unidades',250,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pinchito-de-pollo-pechuga')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pinchito-de-pollo-pechuga' AND lower(trim(label))=lower(trim('Por unidades')));

-- Pinchito de contramuslo de pollo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('pinchito-de-pollo-contramuslo','Pinchito de contramuslo de pollo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/14-pinchitos-de-contramuslo-de-pollo.jpg',230,true,57,'ud','["Por unidades"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pinchito-de-pollo-contramuslo','Por unidades',230,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pinchito-de-pollo-contramuslo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pinchito-de-pollo-contramuslo' AND lower(trim(label))=lower(trim('Por unidades')));

-- Pinchito de cerdo
INSERT INTO public.products (id,name,description,category,image,base_price_cents,active,sort_order,sale_unit,preparations)
VALUES ('pinchito-de-cerdo','Pinchito de cerdo','Precio orientativo de prueba. Confirmar precio y preparación en tienda.','precocinados','img/productos/biblioteca/precocinados/15-pinchitos-de-cerdo.jpg',240,true,58,'ud','["Por unidades"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
INSERT INTO public.product_options (product_id,label,price_cents,sort_order,active)
SELECT 'pinchito-de-cerdo','Por unidades',240,1,true
WHERE EXISTS (SELECT 1 FROM public.products WHERE id='pinchito-de-cerdo')
  AND NOT EXISTS (SELECT 1 FROM public.product_options WHERE product_id='pinchito-de-cerdo' AND lower(trim(label))=lower(trim('Por unidades')));

COMMIT;

-- Comprobación sin modificar datos:
SELECT category, count(*) AS productos FROM public.products
WHERE id IN ('chuletas-de-lomo','lomo-entero','filetes-de-lomo','chuletas-de-cabeza','cabeza-entera-con-hueso','cabeza-entera-sin-hueso','solomillo-de-cerdo','trocitos-de-cerdo','filete-de-jamon-de-cerdo','jamon-entero-de-cerdo','paleta-entera-de-cerdo','morcilla-cerdo','chorizo-cerdo','tiras-de-costilla','costilla-carnosa','jarrete-de-cerdo','manitas-de-cerdo','higado-de-cerdo','pella-de-cerdo','pajarilla-de-cerdo','hueso-de-espinazo-de-cerdo','oreja-de-cerdo','lengua-de-cerdo','punta-de-solomillo','tocino-fresco','chuletas-ibericas','lomo-iberico','filete-iberico','lagartito-iberico','presa-iberica','secreto-iberico','solomillo-iberico','costilla-iberica','babilla-de-ternera','chuleta-de-ternera','ternera-para-guiso','solomillo-de-ternera','entrecot-de-ternera','espinazo-salado','blanco-salado','costilla-salada','tocino-salado','corteza-aneja','rabo-salado','filetes-empanados','lagrimitas-de-pollo','aneto-jamon-y-queso','albondigas-de-pollo','albondigas-mixtas','san-jacobo','fajitas-de-pollo','hamburguesa-de-pollo','hamburguesa-iberica','hamburguesa-de-ternera','hamburguesa-de-cerdo','pinchito-de-pollo-pechuga','pinchito-de-pollo-contramuslo','pinchito-de-cerdo')
GROUP BY category ORDER BY category;
