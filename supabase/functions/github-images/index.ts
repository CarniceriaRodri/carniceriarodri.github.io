const allowedOrigin = "https://carniceriarodri.github.io";

function cors(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin === allowedOrigin ? allowedOrigin : "null",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function json(body: unknown, status = 200, origin: string | null = null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(origin), "Content-Type": "application/json" },
  });
}

function secret(name: string) {
  const value = Deno.env.get(name);
  if (!value) throw new Error("Falta configurar " + name);
  return value;
}

function slug(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function verifyAdmin(req: Request) {
  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) throw new Error("Sesión no válida");

  const supabaseUrl = secret("SUPABASE_URL");
  const anonKey = secret("SUPABASE_ANON_KEY");
  const serviceKey = secret("SUPABASE_SERVICE_ROLE_KEY");

  const userResponse = await fetch(supabaseUrl + "/auth/v1/user", {
    headers: { Authorization: authorization, apikey: anonKey },
  });
  if (!userResponse.ok) throw new Error("Sesión no válida");

  const user = await userResponse.json();
  if (!user?.id) throw new Error("Sesión no válida");

  const params = new URLSearchParams({
    select: "user_id",
    user_id: "eq." + user.id,
    limit: "1",
  });
  const adminResponse = await fetch(supabaseUrl + "/rest/v1/admin_users?" + params, {
    headers: { Authorization: "Bearer " + serviceKey, apikey: serviceKey },
  });
  if (!adminResponse.ok) throw new Error("No se pudo comprobar la autorización");
  const admins = await adminResponse.json();
  if (!Array.isArray(admins) || admins.length !== 1) throw new Error("Usuario no autorizado");

  return true;
}

function validateImage(bytes: Uint8Array, type: string) {
  if (!bytes.length || bytes.length > 5 * 1024 * 1024) {
    throw new Error("Imagen vacía o superior a 5 MB");
  }
  const jpeg = bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  const png = bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 &&
    bytes[2] === 0x4e && bytes[3] === 0x47 && bytes[4] === 0x0d &&
    bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a;
  const webp = bytes.length >= 12 &&
    String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP";
  if ((type === "image/jpeg" && !jpeg) || (type === "image/png" && !png) ||
      (type === "image/webp" && !webp)) {
    throw new Error("El contenido no coincide con el formato de imagen");
  }
}

function toBase64(bytes: Uint8Array) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

async function saveToGitHub(path: string, content: string) {
  const owner = secret("GITHUB_OWNER");
  const repo = secret("GITHUB_REPO");
  const token = secret("GITHUB_TOKEN");
  const branch = Deno.env.get("GITHUB_BRANCH") || "main";
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const url = "https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + encodedPath;
  const headers = {
    Authorization: "Bearer " + token,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };

  const existing = await fetch(url + "?ref=" + encodeURIComponent(branch), { headers });
  let sha: string | undefined;
  if (existing.ok) {
    sha = (await existing.json()).sha;
  } else if (existing.status !== 404) {
    throw new Error("No se pudo consultar el repositorio de GitHub (" + existing.status + ")");
  }

  const payload: Record<string, unknown> = {
    message: "Subir fotografía desde el panel de Carnicería Rodri",
    content,
    branch,
  };
  if (sha) payload.sha = sha;

  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("GitHub no pudo guardar la imagen (" + response.status + ")");
  }
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get("Origin");
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors(origin) });
  if (req.method !== "POST") return json({ error: "Método no permitido" }, 405, origin);
  if (origin !== allowedOrigin) return json({ error: "Origen no permitido" }, 403, origin);

  try {
    await verifyAdmin(req);
    const body = await req.json();
    if (body.action !== "upload") return json({ error: "Acción no permitida" }, 400, origin);
    if (!["product", "option"].includes(body.kind)) return json({ error: "Tipo no válido" }, 400, origin);

    const type = String(body.contentType || "");
    if (!["image/jpeg", "image/png", "image/webp"].includes(type)) {
      return json({ error: "Formato no permitido" }, 400, origin);
    }

    const encoded = String(body.contentBase64 || "");
    if (!encoded || encoded.length > 7100000) return json({ error: "Imagen superior a 5 MB" }, 413, origin);
    const bytes = Uint8Array.from(atob(encoded), (character) => character.charCodeAt(0));
    validateImage(bytes, type);

    const category = slug(String(body.category || "otros"));
    const product = slug(String(body.productSlug || ""));
    if (!category || !product || category.length > 80 || product.length > 100) {
      return json({ error: "Categoría o producto no válido" }, 400, origin);
    }

    const extension = type === "image/png" ? "png" : type === "image/webp" ? "webp" : "jpg";
    const version = Date.now();
    let path = "img/productos/" + category + "/" + product + "/";
    if (body.kind === "product") {
      path += "principal-" + version + "." + extension;
    } else {
      const option = slug(String(body.optionSlug || "preparacion"));
      if (!option || option.length > 100) return json({ error: "Preparación no válida" }, 400, origin);
      path += option + "-" + version + "." + extension;
    }

    await saveToGitHub(path, toBase64(bytes));
    return json({ path }, 200, origin);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error inesperado";
    const denied = /sesión|autorizado|autorización|origen/i.test(message);
    return json({ error: message }, denied ? 403 : 400, origin);
  }
});
