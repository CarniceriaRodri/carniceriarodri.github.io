# Configuración de fotografías GitHub

El panel conserva Supabase Auth. La función verifica el JWT y vuelve a comprobar la pertenencia del usuario a `admin_users`. El token de GitHub solo se guarda como secreto del servidor.

Configura en Supabase → Edge Functions → Secrets:
- `GITHUB_OWNER`: `CarniceriaRodri`
- `GITHUB_REPO`: `carniceriarodri.github.io`
- `GITHUB_BRANCH`: `main`
- `GITHUB_TOKEN`: token fine-grained limitado a este repositorio con permiso **Contents: Read and write**.

Supabase proporciona `SUPABASE_URL`, `SUPABASE_ANON_KEY` y `SUPABASE_SERVICE_ROLE_KEY` a la función. No expongas esos secretos en el navegador.

Despliegue con Supabase CLI:
```sh
supabase link --project-ref ugqiomoywgpkmogcdjqn
supabase functions deploy github-images --project-ref ugqiomoywgpkmogcdjqn
```

Rutas: `img/productos/<categoria>/<producto>.<ext>` y `img/productos/<categoria>/<producto>/<preparacion>.<ext>`. La migración copia los objetos de Storage y conserva los originales.
