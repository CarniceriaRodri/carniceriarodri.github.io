-- Ejecutar en Supabase SQL Editor como propietario de la base de datos.
-- Permitir a administradores autenticados crear y editar productos.
-- No otorgar estos permisos a anon ni desactivar RLS.
grant usage on schema public to authenticated;
grant select, insert, update on table public.products to authenticated;
alter table public.products enable row level security;

drop policy if exists "admins_insert_products" on public.products;
create policy "admins_insert_products"
on public.products for insert to authenticated
with check (
  exists (
    select 1 from public.admin_users au
    where au.user_id = (select auth.uid())
  )
);

drop policy if exists "admins_update_products" on public.products;
create policy "admins_update_products"
on public.products for update to authenticated
using (
  exists (
    select 1 from public.admin_users au
    where au.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.admin_users au
    where au.user_id = (select auth.uid())
  )
);
