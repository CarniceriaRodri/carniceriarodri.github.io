-- Ejecutar en Supabase SQL Editor como propietario de la base de datos.
-- Solo usuarios autenticados registrados en public.admin_users pueden borrar productos.
-- No se concede DELETE a visitantes anónimos.
grant usage on schema public to authenticated;
grant select, delete on table public.products to authenticated;
alter table public.products enable row level security;
drop policy if exists "admins_delete_products" on public.products;
create policy "admins_delete_products"
on public.products for delete to authenticated
using (
  exists (
    select 1 from public.admin_users au
    where au.user_id = (select auth.uid())
  )
);
-- Si hay opciones asociadas, deben eliminarse antes de borrar el producto.
-- Mantener la clave foránea de product_options.product_id sin ON DELETE CASCADE.
