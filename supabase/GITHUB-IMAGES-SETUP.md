# Configuración de nuevas fotografías en GitHub

El panel mantiene Supabase Auth. La Edge Function valida la sesión y comprueba que el usuario pertenece a `admin_users`. El token de GitHub solo se guarda como secreto del servidor de Supabase.

**No se migran las fotografías existentes.** Las rutas antiguas de Supabase Storage y las imágenes del catálogo siguen funcionando. Solo las fotografías que se suban a partir de la activación de esta función se guardarán en GitHub.

## Secretos de Supabase

En Supabase → Edge Functions → Secrets, configura:

- `GITHUB_OWNER`: `CarniceriaRodri`
- `GITHUB_REPO`: `carniceriarodri.github.io`
- `GITHUB_BRANCH`: `main`
- `GITHUB_TOKEN`: token fine-grained limitado a este repositorio, con permiso **Contents: Read and write**.

Supabase proporciona automáticamente `SUPABASE_URL`, `SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY`. No los copies al navegador ni los compartas.

## Despliegue

Con Supabase CLI:

```sh
supabase link --project-ref ugqiomoywgpkmogcdjqn
supabase functions deploy github-images --project-ref ugqiomoywgpkmogcdjqn
```

Las nuevas fotografías se guardan en `img/productos/<categoria>/<producto>/`. Los nombres incluyen una versión para evitar que el navegador conserve en caché la foto anterior al sustituirla.
