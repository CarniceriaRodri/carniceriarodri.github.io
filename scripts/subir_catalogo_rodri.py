#!/usr/bin/env python3
"""Sube las 48 imágenes revisadas del ZIP original a la biblioteca de GitHub.

Uso:
  export GITHUB_TOKEN=... # Token fine-grained con Contents: Read and write
  python3 scripts/subir_catalogo_rodri.py /ruta/Carniceria_Rodri_Catalogo_Fotografico_Completo.zip --dry-run
  python3 scripts/subir_catalogo_rodri.py /ruta/Carniceria_Rodri_Catalogo_Fotografico_Completo.zip

No modifica Supabase, precios, opciones ni imágenes existentes.
"""
import argparse
import base64
import hashlib
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
import zipfile
from pathlib import Path

OWNER = "CarniceriaRodri"
REPO = "carniceriarodri.github.io"
BRANCH = "main"
MANIFEST = "img/productos/biblioteca/catalogo-rodri/manifest.json"
API = f"https://api.github.com/repos/{OWNER}/{REPO}/contents/"

def request(path, token, method="GET", data=None):
    url = API + urllib.parse.quote(path, safe="/")
    req = urllib.request.Request(
        url, data=json.dumps(data).encode() if data is not None else None,
        method=method,
        headers={"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json",
                 "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=45) as response:
            return json.load(response)
    except urllib.error.HTTPError as exc:
        if exc.code == 404 and method == "GET":
            return None
        raise RuntimeError(f"GitHub HTTP {exc.code} en {path}: {exc.read().decode()[:500]}") from exc

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("zip", type=Path)
    parser.add_argument("--dry-run", action="store_true", help="Comprobar sin subir nada")
    args = parser.parse_args()
    token = os.getenv("GITHUB_TOKEN")
    if not token:
        sys.exit("Falta GITHUB_TOKEN en el entorno. No lo pegues en chats ni lo incluyas en archivos.")
    if not args.zip.is_file():
        sys.exit(f"No existe el ZIP: {args.zip}")
    manifest_response = request(MANIFEST, token)
    if not manifest_response:
        sys.exit("No existe manifest.json en GitHub")
    manifest = json.loads(base64.b64decode(manifest_response["content"]))
    items = manifest["items"]
    print(f"Encontradas {len(items)} entradas revisadas.")
    with zipfile.ZipFile(args.zip) as archive:
        names = set(archive.namelist())
        for index, item in enumerate(items, 1):
            dest = item["image"]
            source = dest.split("catalogo-rodri/", 1)[1]
            if source not in names:
                sys.exit(f"ERROR: falta {source} en el ZIP. No se continuará.")
            data = archive.read(source)
            if not data.startswith(b"\\xff\\xd8\\xff"):
                sys.exit(f"ERROR: no parece JPG: {source}")
            existing = request(dest, token)
            if existing:
                if existing.get("type") != "file":
                    sys.exit(f"ERROR: ruta ocupada por otro tipo de objeto: {dest}")
                current_sha = existing.get("sha")
                expected_sha = hashlib.sha1(b"blob " + str(len(data)).encode() + b"\\0" + data).hexdigest()
                if current_sha != expected_sha:
                    print(f"[{index}/{len(items)}] CONFLICTO, no sobrescrito: {dest}")
                else:
                    print(f"[{index}/{len(items)}] Ya existe, idéntico: {dest}")
                continue
            if args.dry_run:
                print(f"[{index}/{len(items)}] Listo para subir: {dest}")
                continue
            request(dest, token, "PUT", {
                "message": f"Añadir imagen revisada de catálogo: {item['id']}",
                "content": base64.b64encode(data).decode(),
                "branch": BRANCH,
            })
            print(f"[{index}/{len(items)}] Subido: {dest}")
    print("Finalizado. Comprueba las imágenes en GitHub antes de asignarlas en Supabase.")

if __name__ == "__main__":
    main()
