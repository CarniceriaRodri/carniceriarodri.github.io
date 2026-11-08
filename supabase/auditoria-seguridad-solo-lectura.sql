-- Auditoría de permisos de Carnicería Rodri.
-- SOLO LECTURA: ejecutar en Supabase SQL Editor; no modifica filas ni políticas.
-- Revisar los resultados antes de ejecutar cualquier migración de seguridad.

-- 1. Estado de RLS y acceso forzado en tablas públicas.
select n.nspname as schema, c.relname as tabla, c.relrowsecurity as rls_activada,
       c.relforcerowsecurity as rls_forzada
from pg_class c join pg_namespace n on n.oid=c.relnamespace
where n.nspname in ('public','storage') and c.relkind in ('r','p')
order by 1,2;

-- 2. Políticas vigentes: comparar roles anon y authenticated.
select schemaname, tablename, policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname in ('public','storage')
order by schemaname, tablename, policyname;

-- 3. Permisos de tablas concedidos por rol.
select table_schema, table_name, grantee, privilege_type
from information_schema.role_table_grants
where table_schema in ('public','storage')
  and grantee in ('anon','authenticated','PUBLIC')
order by table_schema, table_name, grantee, privilege_type;

-- 4. Almacenamiento: visibilidad de buckets y límites.
select id, name, public, file_size_limit, allowed_mime_types
from storage.buckets order by id;

-- 5. Verificar si las tablas esenciales existen.
select target.tabla,
       (to_regclass('public.'||target.tabla) is not null) as existe
from (values ('products'),('product_options'),('categories'),('admin_users'),('site_settings')) as target(tabla);

-- ATENCIÓN:
-- Las claves publishable/anon son públicas; las service_role y GitHub Token no deben
-- aparecer en el repositorio ni en el navegador. No compartir capturas con credenciales.
-- Revisar las políticas de Storage en particular para evitar escrituras anónimas.
-- Esta consulta NO demuestra por sí sola que no existan rutas de escritura no autorizadas.
