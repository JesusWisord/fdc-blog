# 🏳️‍🌈 Fuera del Clóset A. C. — Blog (Next.js)

Blog oficial migrado de Gatsby + Ghost (Heroku) a **Next.js + Markdown + Netlify**.

---

## 🗂️ Estructura del proyecto

```
fdc-next/
├── content/
│   ├── posts/       ← Aquí van los artículos (.md)
│   ├── events/      ← Eventos (.md)
│   └── gallery/     ← Álbumes de fotos (.md)
├── public/
│   └── admin/       ← Panel de administración (Decap CMS)
├── src/
│   ├── app/         ← Páginas del sitio (Next.js App Router)
│   ├── components/  ← Navbar, Footer, PostCard, etc.
│   ├── lib/         ← posts.js (lee los Markdown)
│   └── styles/      ← globals.css
├── scripts/
│   └── migrate-from-ghost.js
├── next.config.js
└── netlify.toml
```

---

## 🚀 Paso a paso para arrancar

### 1. Instalar Node.js
Descarga la versión **LTS** de https://nodejs.org e instálala normalmente.

Verifica abriendo una terminal:
```bash
node --version
# Debe responder algo como: v20.x.x
```

### 2. Instalar dependencias del proyecto
Abre la terminal en la carpeta del proyecto y ejecuta:
```bash
npm install
```

### 3. Ver el sitio en tu computadora
```bash
npm run dev
```
Abre tu navegador en **http://localhost:3000** 🎉

---

## ✍️ Cómo agregar un post (Markdown)

Crea un archivo en `content/posts/nombre-del-articulo.md`:

```markdown
---
title: "Título del artículo"
date: "2024-06-01T10:00:00-05:00"
author: "Fuera del Clóset A. C."
category: "noticias"
coverImage: "https://tu-bucket.s3.amazonaws.com/imagen.jpg"
excerpt: "Descripción corta del artículo."
tags:
  - derechos humanos
  - México
---

Aquí va el contenido del artículo...

## Un subtítulo

Párrafo con **negritas** y *cursivas*.

![Descripción de la imagen](https://url-imagen.jpg)
```

**Categorías disponibles:**
- `noticias` — Noticias generales
- `incidencia` — Incidencia política
- `alertafdc` — Casos de discriminación/violencia
- `comunidad` — Activismo y eventos
- `cultura` — Arte y cultura LGBTTTI+

---

## 📤 Publicar en internet (Netlify)

### 1. Crear cuenta en GitHub
Ve a https://github.com → Sign up (gratis)

### 2. Subir el proyecto
```bash
git init
git add .
git commit -m "Primer commit - migración a Next.js"
git remote add origin https://github.com/tu-usuario/fdc-blog.git
git push -u origin main
```

### 3. Conectar con Netlify
1. Ve a https://app.netlify.com → "Add new site" → "Import from Git"
2. Conecta tu cuenta de GitHub y selecciona el repositorio
3. Netlify detecta el `netlify.toml` automáticamente
4. Clic en **Deploy site** → ¡listo en ~2 minutos!

---

## 📦 Migrar posts de Ghost/Heroku

⚠️ **Hazlo pronto** — mientras Heroku siga activo

1. En Ghost Admin → Settings → Integrations → Add custom integration → copia la **Content API Key**

2. Ejecuta:
```bash
GHOST_URL=https://fdc-blog.herokuapp.com \
GHOST_CONTENT_KEY=TU_KEY_AQUI \
node scripts/migrate-from-ghost.js
```

Los posts se guardarán automáticamente en `/content/posts/` ✅

---

## 🔧 Panel de administración (Decap CMS)

Para publicar posts sin tocar código, activa el panel:

1. Netlify → Site settings → **Identity** → Enable Identity
2. Identity → Registration → **Invite only**
3. Identity → Services → **Enable Git Gateway**
4. Invita a tu equipo desde Identity → Invite users

Panel disponible en: `https://tu-sitio.netlify.app/admin`

---

## 💰 Costo total

| Servicio | Costo |
|----------|-------|
| Netlify (hosting) | **Gratis** |
| GitHub (código) | **Gratis** |
| Decap CMS (panel) | **Gratis** |
| AWS S3 (imágenes) | ~$0.023/GB/mes |
| **TOTAL** | **Casi gratis** |

---

## 🆚 Antes vs Ahora

| | Antes | Ahora |
|---|---|---|
| Framework | Gatsby 2 (obsoleto) | Next.js 14 (actual) |
| CMS | Ghost en Heroku (~$7/mes) | Decap CMS (gratis) |
| Deploy | Manual | Automático con cada push |
| SEO | Básico | Excelente (SSG + metadata dinámica) |
| Velocidad | Media | Alta (HTML estático) |
