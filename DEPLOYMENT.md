# Guía de Despliegue - Sidefold Landing Page

## 📋 Requisitos Previos

- Node.js 16+
- npm o yarn
- Acceso a un servidor web (Apache, Nginx, etc.) o plataforma PaaS

## 🔨 Build para Producción

```bash
npm run build
```

Esto genera una carpeta `dist/` con los archivos optimizados listos para producción.

## 🚀 Opciones de Despliegue

### 1. **Vercel** (Recomendado - Más fácil)

```bash
npm install -g vercel
vercel
```

O conecta el repo de GitHub automáticamente en https://vercel.com

**Ventajas:**
- ✅ Deployment automático en cada push
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Gratis para proyectos open source

### 2. **Netlify**

Conecta el repo en https://netlify.com

**Config automática desde `netlify.toml`**

```bash
npm run build
# Los archivos de dist/ se despliegan automáticamente
```

**Ventajas:**
- ✅ Deployment automático
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Formularios y serverless functions

### 3. **GitHub Pages**

1. Modifica `vite.config.js`:
```js
export default defineConfig({
  base: '/sidefold-landing/',
  // ... resto de config
});
```

2. Crea GitHub Actions workflow (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4. **Servidor Apache**

1. Build el proyecto:
```bash
npm run build
```

2. Copia los archivos de `dist/` al directorio web:
```bash
cp -r dist/* /var/www/sidefold/
```

3. Configura permisos:
```bash
chmod -R 755 /var/www/sidefold/
```

4. El archivo `.htaccess` ya está incluido en `public/` para:
   - Rewritas para SPA routing
   - Cache headers optimizados
   - Compresión GZIP
   - Headers de seguridad

### 5. **Servidor Nginx**

1. Build el proyecto:
```bash
npm run build
```

2. Copia los archivos:
```bash
cp -r dist/* /usr/share/nginx/html/sidefold/
```

3. Configura nginx con el archivo `nginx.conf` incluido:
```bash
sudo cp nginx.conf /etc/nginx/sites-available/sidefold
sudo ln -s /etc/nginx/sites-available/sidefold /etc/nginx/sites-enabled/
sudo nginx -s reload
```

4. Configura SSL con Let's Encrypt:
```bash
sudo certbot certonly --nginx -d sidefold.com
```

### 6. **Docker**

Crea `Dockerfile`:
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build y run:
```bash
docker build -t sidefold-landing .
docker run -p 80:80 sidefold-landing
```

## 🔐 Configuración de Dominio

### DNS

Apunta tu dominio (`sidefold.com`) al servidor/CDN:

**Para Vercel/Netlify:**
```
CNAME -> vercel.com o netlify.com
```

**Para servidor propio:**
```
A Record -> tu IP
```

### HTTPS

- **Vercel/Netlify**: Automático
- **Let's Encrypt (Nginx/Apache)**:
```bash
sudo certbot certonly --webroot -w /path/to/public -d sidefold.com
```

## 📊 Optimizaciones de Producción

### Checklist:

- ✅ Manifest.json configurado
- ✅ Service Worker registrado para PWA
- ✅ Meta tags para SEO
- ✅ Open Graph para compartir en redes
- ✅ Cache headers optimizados
- ✅ Compresión GZIP habilitada
- ✅ Security headers configurados
- ✅ robots.txt y sitemap.xml

### Monitorización:

```bash
# Verifica Lighthouse en Chrome DevTools
# O usa Google PageSpeed Insights: https://pagespeed.web.dev/
```

## 🔍 Testing Antes de Publicar

```bash
# Build local
npm run build

# Preview
npm run preview

# Check perfs
lighthouse http://localhost:4173 --view
```

## 📝 Actualización de Contenido

Para actualizar la landing:

1. Edita los archivos en `src/`
2. Commit y push a `main`
3. El CI/CD automáticamente:
   - Hace build
   - Ejecuta tests
   - Deploya a producción

## 🆘 Solución de Problemas

### "Página en blanco en producción"
- Verifica que los paths sean absolutos (`/assets/` no `./assets/`)
- Revisa la consola del navegador para errores
- Comprueba que `dist/` tiene archivos

### "Assets no cargan"
- Verifica que `public/assets/` tiene las imágenes
- Comprueba permisos (`chmod 755`)

### "Redireccionamiento infinito"
- El `.htaccess` podría estar conflictuando
- Verifica que no hay otra rewrite rule en la raíz

## 📞 Soporte

Para preguntas sobre despliegue:
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Nginx Docs: https://nginx.org/en/docs/

---

**Made with ♥ for YouTube power users**
