# Para Taji

Una dedicatoria interactiva, estática y lista para GitHub Pages. El QR se genera en el navegador a partir de la URL activa, así que al publicarla apuntará a la página publicada.

## Desarrollo local

```bash
npm install
npm run dev
```

## Publicar en GitHub Pages

1. Sube esta carpeta a un repositorio de GitHub y usa `main` como rama principal.
2. En **Settings → Pages**, selecciona **GitHub Actions** como fuente.
3. El workflow de `.github/workflows/deploy.yml` publicará la web en cada cambio a `main`.

La configuración de Vite detecta el nombre del repositorio durante GitHub Actions para que funcione tanto con un repositorio de proyecto como con uno llamado `usuario.github.io`. Para un dominio personalizado, conserva `base: '/'` y configura el dominio en GitHub Pages.

El QR del diálogo «Compartir» siempre usa el origen y la ruta actuales; cuando la web esté publicada, el código llevará a esa dirección pública.
