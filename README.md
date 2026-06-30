# 🏳️‍🌈 Fuera del Clóset A. C. — Blog (Next.js)

Sitio web y blog oficial de Fuera del Clóset A. C., migrado de Gatsby + Ghost a **Next.js + Markdown** como parte de un proyecto de práctica profesional. Este documento describe la estructura del proyecto, cómo ejecutarlo, cómo publicar contenido, y las consideraciones de mantenimiento y continuidad necesarias para que el sitio no dependa de una sola persona.

> 📌 Para quien dé seguimiento al proyecto: revisar primero las secciones [¿Qué hacer si algo se rompe?](#-qué-hacer-si-algo-se-rompe) y [Continuidad del proyecto](#-continuidad-del-proyecto).

---

## 🗂️ Estructura del proyecto

```
fdc-next/
├── content/
│   └── posts/        ← Noticias del sitio (.md), un archivo por publicación
├── public/
│   ├── admin/         ← Panel de administración (Decap CMS, ver sección correspondiente)
│   └── images/        ← Logos e íconos del sitio
├── src/
│   ├── app/            ← Páginas del sitio (Next.js App Router)
│   ├── components/    ← Navbar, Footer, PostCard, etc.
│   ├── lib/             ← posts.js (lectura de archivos Markdown)
│   └── styles/         ← globals.css (estilos visuales)
├── scripts/
│   └── migrate-from-ghost.js
├── next.config.js
└── netlify.toml
```

---

## 🚀 Instalación y ejecución local

### 1. Instalar Node.js
Descargar la versión **LTS** desde https://nodejs.org e instalar con la configuración por defecto.

Verificar la instalación:
```bash
node --version
```

### 2. Instalar Git (si no está instalado)
Descargar desde https://git-scm.com/download/win e instalar con las opciones por defecto. Tras la instalación, reiniciar el equipo antes de usar Git desde la terminal.

### 3. Instalar dependencias del proyecto
Desde la terminal, dentro de la carpeta del proyecto:
```bash
npm install
```

### 4. Ejecutar el sitio localmente
```bash
npm run dev
```
El sitio queda disponible en **http://localhost:3000**

---

## ✍️ Publicación de contenido

Existen dos formas de publicar noticias en el sitio.

### Opción A — Panel visual (Decap CMS), recomendada para personal sin conocimientos técnicos

Una vez que el sitio esté desplegado en Netlify y el panel esté activado (ver sección [Pendiente: activar Decap CMS](#-pendiente-activar-decap-cms)), cualquier persona autorizada podrá acceder a:

```
https://[dominio-del-sitio]/admin
```

Iniciar sesión con su cuenta y crear, editar o publicar noticias desde un editor visual, sin necesidad de escribir código.

**Estado actual:** el panel está preparado en el proyecto pero su activación está pendiente; requiere que el sitio ya esté desplegado en Netlify.

### Opción B — Edición directa de archivos Markdown

Mientras Decap CMS no esté activo, el contenido puede agregarse manualmente:

1. Crear un archivo nuevo en `content/posts/` con el nombre `nombre-corto-de-la-noticia.md` (en minúsculas, sin espacios, usando guiones).
2. Completar el siguiente formato:

```markdown
---
title: "Título de la noticia"
date: "2026-06-30T10:00:00-05:00"
author: "Fuera del Clóset A. C."
category: "noticias"
coverImage: "https://url-a-la-imagen.jpg"
excerpt: "Descripción corta del artículo, una o dos líneas."
---

Contenido del artículo en párrafos normales.

## Subtítulo (opcional)

Texto adicional. Se admite **negritas** y *cursivas*.

![Descripción de la imagen](https://url-imagen.jpg)
```

**Categorías disponibles** (cada una con un color asignado en el sitio):
- `noticias` — Noticias generales
- `incidencia` — Incidencia política
- `alertafdc` — Casos de discriminación o violencia
- `comunidad` — Activismo y eventos
- `cultura` — Arte y cultura LGBTTTI+

3. Guardar el archivo y subir los cambios al repositorio (`git add`, `git commit`, `git push`). Si el repositorio está conectado a Netlify, el sitio se actualiza automáticamente en pocos minutos.

---

## 🎨 Logos e imágenes del sitio

Los logos e íconos se encuentran en `public/images/`:

| Archivo | Uso |
|---|---|
| `fdc-logo.png` | Logo completo de Fuera del Clóset (con texto), usado en el Hero |
| `calli-logo.png` | Logo completo de CALLI (con texto), usado en el Hero |
| `fdc-icon.png` | Ícono de FDC sin texto, usado en el Navbar |
| `calli-icon.png` | Ícono de CALLI sin texto, usado en el Navbar |
| `x-icon.png`, `facebook-icon.png`, `instagram-icon.png`, `tiktok-icon.png` | Íconos de redes sociales en el Navbar |

Para reemplazar cualquier logo, basta con sustituir el archivo en `public/images/` conservando exactamente el mismo nombre; el cambio se refleja automáticamente sin modificar código.

---

## 🆘 ¿Qué hacer si algo se rompe?

Esta sección documenta los errores encontrados durante el desarrollo y su resolución, para facilitar el diagnóstico de problemas similares en el futuro.

### El sitio no carga o muestra pantalla en blanco al ejecutar `npm run dev`
1. Revisar la terminal: el mensaje de error suele indicar el archivo y la línea exactos.
2. Errores conocidos y su solución:
   - **`params is a Promise and must be unwrapped with await`**: ocurre en archivos `page.js` dentro de carpetas con `[slug]`. Solución: usar `const { slug } = await params` en lugar de `params.slug` directamente. Es un requisito de Next.js 16.
   - **`Page is missing exported function "generateStaticParams()"`**: ocurre en páginas dinámicas (como `/noticias/[slug]`) debido a que `next.config.js` tiene configurado `output: 'export'`. Solución: agregar una función `generateStaticParams()` en el `page.js` correspondiente que devuelva la lista completa de slugs existentes. Puede tomarse como referencia `src/app/noticias/[slug]/page.js`, donde ya está resuelto.
3. Si una imagen no se muestra (ícono roto): verificar que el archivo exista exactamente en `public/images/` con el nombre que el código solicita (las mayúsculas y minúsculas son significativas). Tras reemplazar imágenes, realizar una recarga forzada del navegador (`Ctrl+Shift+R`).

### Instrucciones de ejecución
Ver la sección [Instalación y ejecución local](#-instalación-y-ejecución-local).

### Diagnóstico de errores no documentados
Se recomienda copiar el mensaje de error completo de la terminal (o una captura de pantalla) junto con el archivo de código relacionado, y consultarlo con una herramienta de asistencia técnica o desarrollo. La mayoría de los errores encontrados durante este proyecto se resolvieron mediante este método.

---

## 🔄 Continuidad del proyecto

Este proyecto fue desarrollado en el marco de una práctica profesional con fecha de término en noviembre de 2026. Para garantizar la continuidad del sitio sin depender de una sola persona, se recomienda a la organización:

1. **Contar con una cuenta de GitHub institucional**, distinta de la cuenta personal utilizada durante el desarrollo. El proyecto se subió como una rama (`migracion-fdc-nextjs`) dentro del repositorio existente de la organización, administrado por un colaborador (Jesús/Chuy), para su revisión e integración.
2. **Contar con acceso a Netlify** mediante una cuenta institucional, que permita administrar o reiniciar el despliegue del sitio en caso de fallas.
3. **Designar a una persona responsable de publicación de contenido**, idealmente sin necesidad de conocimientos técnicos, una vez que el panel Decap CMS esté activo.
4. **Conservar este documento actualizado**, junto con cualquier credencial relevante en un repositorio seguro (no en el código público), para quien dé continuidad al proyecto.

---

## 📤 Despliegue en internet (Netlify)

### 1. Crear cuenta en GitHub (idealmente institucional)
https://github.com → Sign up (gratuito)

### 2. Subir el proyecto
```bash
git init
git add .
git commit -m "Primer commit"
git remote add origin https://github.com/usuario/fdc-next.git
git branch -M main
git push -u origin main
```

### 3. Conectar con Netlify
1. Ingresar a https://app.netlify.com → "Add new site" → "Import from Git"
2. Conectar la cuenta de GitHub y seleccionar el repositorio
3. Netlify detecta automáticamente el archivo `netlify.toml`
4. Hacer clic en **Deploy site**

---

## 🔧 Pendiente: activación de Decap CMS

El proyecto está preparado para utilizar Decap CMS como panel de administración visual, pero su activación se encuentra pendiente. Pasos requeridos:

1. El sitio debe estar previamente desplegado en Netlify.
2. En Netlify → Site settings → **Identity** → habilitar Identity.
3. Identity → Registration → configurar como **Invite only**.
4. Identity → Services → habilitar **Git Gateway**.
5. Invitar a las personas que publicarán contenido desde Identity → Invite users.
6. Verificar que `public/admin/config.yml` tenga la configuración correcta del repositorio.

Una vez activado, el panel estará disponible en: `https://[dominio-del-sitio]/admin`

---

## 📦 Sobre el contenido del sitio anterior

Parte del contenido del sitio previo (Gatsby + Ghost) no pudo recuperarse debido a la pérdida de información en el servicio de Ghost alojado en Heroku. Por este motivo, se determinó que el contenido del nuevo sitio se almacene como archivos Markdown dentro del repositorio de GitHub, eliminando la dependencia de un servicio externo de pago para la conservación del contenido.

En caso de que aparezca contenido adicional del sitio anterior por recuperar, el siguiente script puede utilizarse:
```bash
GHOST_URL=https://fdc-blog.herokuapp.com \
GHOST_CONTENT_KEY=TU_KEY_AQUI \
node scripts/migrate-from-ghost.js
```

---

## 💰 Costo total

| Servicio | Costo |
|----------|-------|
| Netlify (hosting) | Gratuito |
| GitHub (código) | Gratuito |
| Decap CMS (panel) | Gratuito |
| **Total** | **Gratuito** |

---

## 🆚 Resumen de la migración (Gatsby/Ghost → Next.js)

| | Antes | Ahora |
|---|---|---|
| Framework | Gatsby 2 (obsoleto) | Next.js 16 (vigente) |
| CMS | Ghost en Heroku (de pago; se perdió contenido) | Markdown en GitHub + Decap CMS (gratuito, sin riesgo de pérdida de datos) |
| Despliegue | Manual | Automático con cada cambio subido a GitHub |
| Dependencia de una sola persona | Alta | Baja (contenido en texto plano; errores documentados en este archivo) |
