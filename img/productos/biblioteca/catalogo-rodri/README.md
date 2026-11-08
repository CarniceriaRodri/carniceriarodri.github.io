# Catálogo fotográfico Carnicería Rodri — preparación para integración

Este repositorio conserva la tienda y su panel actual. Las imágenes recibidas en noviembre de 2026 se han organizado por las categorías existentes: `cerdo`, `iberico`, `ternera`, `salado` y `precocinados`.

## Reglas de publicación
- Fuente principal: `Carniceria_Rodri_Catalogo_Fotografico_Completo.zip`.
- 58 imágenes JPG únicas, de las que **48 están revisadas y 10 pendientes**. No publicar las pendientes hasta su validación.
- Son **imágenes ilustrativas generadas con IA**, no fotografías de la mercancía real. Incluir ese aviso en las fichas donde se utilicen.
- No asignar precios ni activar opciones de venta sin validación en Supabase.
- No reemplazar imágenes ya guardadas en Supabase Storage ni alterar los datos existentes.
- Al subir imágenes a GitHub, utilizar `img/productos/biblioteca/catalogo-rodri/<categoria>/<archivo>.jpg` y conservar nombres descriptivos.
- El catálogo de la tienda está en `js/catalogo.js`; el panel en `admin.html` y `js/admin.js`. Las imágenes y opciones activas también dependen de los registros de Supabase.
- Para enlazar cada fotografía a su ficha, actualizar el campo `image` del producto correspondiente en Supabase con la URL pública de GitHub Pages, o adaptar `js/catalogo.js` para establecer `img` de manera coherente. Verificar las opciones del producto antes de mostrarlo.

## Correspondencia de carpetas
| ZIP | Web |
| --- | --- |
| cerdo | cerdo |
| cerdo_iberico | iberico |
| ternera | ternera |
| salados | salado |
| precocinados | precocinados |

**Importante:** La subida de los JPG y su vinculación con la base de datos son pasos separados. Esta guía no implica que las fotografías estén ya publicadas.
