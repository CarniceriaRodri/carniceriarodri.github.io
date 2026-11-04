-- Carnicería Rodri: categorías y almacenamiento de imágenes
-- Ejecutar en Supabase > SQL Editor > New query.
-- Requiere la tabla public.admin_users con la columna user_id (UUID), como usa admin.html.

create table if not exists public.categories (
  id text primary key,
  name text not null,
  tagline text not null default '',
  sort_order integer not null default 0,
  active boolean not null default true
);

alter table public.categories enable row level security;

drop policy if exists "Public can read active categories" on public.categories;
create policy "Public can read active categories"
on public.categories for select
to anon, authenticated
using (active = true);

drop policy if exists "Admins can manage categories" on public.categories;
create policy "Admins can manage categories"
on public.categories for all
to authenticated
using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));

insert into public.categories (id, name, tagline, sort_order, active) values
('barbacoa','Barbacoa y preparados','Todo listo para encender la brasa y disfrutar.',0,true),
('bebidas','Bebidas','Refrescos, agua, zumos y bebidas para acompañar.',1,true),
('cerdo','Cerdo','Cortes frescos y preparados de cerdo.',2,true),
('charcuteria','Charcutería y quesos','Jamón, embutidos y quesos cortados a tu gusto.',3,true),
('conejo','Conejo','Conejo limpio y preparado para cocinar.',4,true),
('cordero','Cordero y cabrito','Cortes tiernos para la plancha, la brasa o el horno.',5,true),
('despensa','Despensa y complementos','Básicos para completar tu compra.',6,true),
('elaborados','Elaborados de la casa','Hechos aquí cada mañana, con nuestra propia receta.',7,true),
('ibericos','Ibéricos','Piezas selectas del cerdo ibérico.',8,true),
('aves','Pollo y aves','Pollo fresco, pavo y otras aves preparados a tu gusto.',9,true),
('vacuno','Vacuno y ternera','Ternera de confianza, cortada al momento.',10,true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images','product-images',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'product-images'
  and exists (select 1 from public.admin_users a where a.user_id = auth.uid())
);

drop policy if exists "Admins can update product images" on storage.objects;
create policy "Admins can update product images"
on storage.objects for update
to authenticated
using (
  bucket_id = 'product-images'
  and exists (select 1 from public.admin_users a where a.user_id = auth.uid())
)
with check (
  bucket_id = 'product-images'
  and exists (select 1 from public.admin_users a where a.user_id = auth.uid())
);

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'product-images'
  and exists (select 1 from public.admin_users a where a.user_id = auth.uid())
);
