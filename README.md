# Fuera del Clóset AC — Sitio web y blog

Documentación técnica y de operación del sitio de Fuera del Clóset AC, migrado de Gatsby con Ghost a Next.js con contenido en Markdown en el marco de una práctica profesional.

Este documento tiene dos propósitos: permitir que cualquier persona pueda instalar, ejecutar y publicar contenido en el sitio, y dejar constancia de las decisiones técnicas y los problemas resueltos durante el desarrollo, de manera que el proyecto no dependa de quien lo construyó.

Quien reciba el proyecto para darle seguimiento debe leer primero las secciones "Resolución de problemas" y "Continuidad del proyecto".

## Estructura del proyecto

```
fdc-next/
├── content/
│   └── posts/         Noticias del sitio en formato .md, un archivo por publicación
├── public/
│   ├── admin/         Panel de administración (Decap CMS)
│   └── images/        Logos e íconos del sitio
├── src/
│   ├── app/           Páginas del sitio (Next.js App Router)
│   ├── components/    Navbar, Footer, PostCard y demás componentes
│   ├── lib/           posts.js, encargado de la lectura de los archivos Markdown
│   └── styles/        globals.css, estilos generales del sitio
├── scripts/
│   └── migrate-from-ghost.js
├── next.config.js
└── netlify.toml
```

## Instalación y ejecución local

**Node.js.** Descargue la versión LTS desde https://nodejs.org e instálela con la configuración predeterminada. Para confirmar que quedó instalada correctamente, ejecute `node --version` en la terminal; debe aparecer un número de versión.

**Git.** Si el equipo no lo tiene instalado, descárguelo desde https://git-scm.com/download/win con las opciones predeterminadas. En Windows conviene reiniciar el equipo después de la instalación, ya que de lo contrario la terminal puede no reconocer el comando `git`.

**Dependencias.** Abra una terminal dentro de la carpeta del proyecto y ejecute:

```
npm install
```

**Ejecución.** Una vez instaladas las dependencias:

```
npm run dev
```

El sitio queda disponible en http://localhost:3000 y se actualiza automáticamente conforme se modifican los archivos.

## Publicación de contenidos

El sitio admite dos formas de publicar noticias. La primera está pensada para personal sin formación técnica y la segunda para quien tenga acceso al repositorio.

### Panel visual (Decap CMS)

Es la vía recomendada. Una vez que el sitio esté desplegado en Netlify y el panel activado, según se describe en la sección "Activación pendiente de Decap CMS", las personas autorizadas podrán entrar a `https://[dominio-del-sitio]/admin`, iniciar sesión con su cuenta y redactar, editar o publicar noticias desde un editor visual, sin escribir código.

Al día de hoy el panel está incluido y configurado en el proyecto, pero su activación sigue pendiente porque requiere que el sitio esté previamente desplegado en Netlify.

### Edición directa de archivos Markdown

Mientras el panel no esté activo, el contenido se agrega de forma manual. Cree un archivo nuevo dentro de `content/posts/` con un nombre corto, en minúsculas, sin espacios y separado por guiones, por ejemplo `marcha-del-orgullo-2026.md`.

El archivo debe comenzar con un bloque de datos entre tres guiones y continuar con el cuerpo del artículo:

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

El campo `category` acepta cinco valores, cada uno asociado a un color distinto en el sitio: `noticias` para noticias generales, `incidencia` para incidencia política, `alertafdc` para casos de discriminación o violencia, `comunidad` para activismo y eventos, y `cultura` para arte y cultura LGBTTTI+.

Guarde el archivo y suba los cambios al repositorio con `git add`, `git commit` y `git push`. Si el repositorio está conectado a Netlify, el sitio se reconstruye y se actualiza solo en pocos minutos.

## Logos e imágenes del sitio

Todas las imágenes fijas del sitio están en `public/images/`. El logo completo de Fuera del Clóset, con texto, corresponde a `fdc-logo.png`, y el de CALLI a `calli-logo.png`; ambos se usan en el encabezado principal de la página de inicio. Las versiones sin texto, `fdc-icon.png` y `calli-icon.png`, se usan en la barra de navegación. Los íconos de redes sociales que aparecen en esa misma barra son `x-icon.png`, `facebook-icon.png`, `instagram-icon.png` y `tiktok-icon.png`.

Para reemplazar cualquiera de ellos basta con sustituir el archivo en esa carpeta conservando exactamente el mismo nombre. El cambio se refleja sin necesidad de modificar el código.

## Resolución de problemas

Esta sección reúne los errores que aparecieron durante el desarrollo y la forma en que se resolvieron, con el fin de facilitar el diagnóstico de problemas parecidos más adelante.

### El sitio no carga o aparece en blanco al ejecutar npm run dev

Lo primero es revisar la terminal, donde el mensaje de error suele indicar el archivo y la línea exacta donde ocurrió el problema.

Si el mensaje dice `params is a Promise and must be unwrapped with await`, el error está en algún archivo `page.js` dentro de una carpeta con nombre entre corchetes, como `[slug]`. Se corrige escribiendo `const { slug } = await params` en lugar de acceder directamente a `params.slug`. Es un requisito introducido por Next.js 16.

Si el mensaje dice `Page is missing exported function "generateStaticParams()"`, el error se debe a que `next.config.js` está configurado con `output: 'export'`, lo que obliga a que toda página dinámica declare de antemano las rutas que va a generar. Se corrige agregando una función `generateStaticParams()` en el `page.js` correspondiente que devuelva la lista completa de slugs existentes. El archivo `src/app/noticias/[slug]/page.js` ya tiene esta función resuelta y puede tomarse como referencia.

### Una imagen aparece rota

Verifique que el archivo exista en `public/images/` con exactamente el mismo nombre que solicita el código, tomando en cuenta que las mayúsculas y minúsculas sí se distinguen. Después de reemplazar una imagen conviene forzar la recarga del navegador con Ctrl+Shift+R, ya que de lo contrario puede seguir mostrando la versión guardada en caché.

### Errores no documentados aquí

Copie el mensaje de error completo de la terminal, o tome una captura de pantalla, e inclúyalo junto con el archivo de código relacionado al consultar una herramienta de asistencia técnica o a una persona con conocimientos de desarrollo. La mayoría de los errores encontrados durante este proyecto se resolvieron de esta manera.

## Continuidad del proyecto

El proyecto se desarrolló en el marco de una práctica profesional con fecha de término en noviembre de 2026. Para que el sitio siga funcionando sin depender de una sola persona, se recomienda a la organización lo siguiente.

Abrir una cuenta de GitHub institucional, distinta de la cuenta personal utilizada durante el desarrollo. El proyecto se subió como una rama llamada `migracion-fdc-nextjs` dentro del repositorio existente de la organización, administrado por un colaborador (Jesús), para su revisión e integración.

Contar con acceso a Netlify mediante una cuenta institucional, lo que permitirá administrar el sitio o reiniciar el despliegue en caso de falla.

Designar a una persona responsable de la publicación de contenido. Una vez activo el panel de Decap CMS, esta tarea no requiere conocimientos técnicos.

Mantener este documento actualizado y resguardar las credenciales relevantes en un espacio seguro, nunca dentro del código publicado, para quien dé continuidad al proyecto.

## Despliegue en internet

El despliegue se hace con Netlify a partir del repositorio de GitHub.

Si el proyecto aún no está en GitHub, cree la cuenta en https://github.com, de preferencia institucional, y suba el proyecto desde la terminal:

```
git init
git add .
git commit -m "Primer commit"
git remote add origin https://github.com/usuario/fdc-next.git
git branch -M main
git push -u origin main
```

Después ingrese a https://app.netlify.com, elija "Add new site" y luego "Import from Git", conecte la cuenta de GitHub y seleccione el repositorio. Netlify lee automáticamente el archivo `netlify.toml`, que ya contiene la configuración de compilación, así que sólo resta confirmar el despliegue. A partir de ese momento cada cambio subido al repositorio actualiza el sitio publicado.

## Activación pendiente de Decap CMS

El proyecto ya incluye Decap CMS como panel de administración visual, pero su activación quedó pendiente porque depende de que el sitio esté desplegado. Los pasos son los siguientes.

Con el sitio ya publicado en Netlify, entre a la configuración del sitio y habilite la sección de Identidad. Dentro de Identidad, configure el registro como "Solo invitación", de modo que nadie externo pueda crear una cuenta, y habilite Git Gateway en el apartado de Servicios. Enseguida invite desde ahí mismo a las personas que publicarán contenido.

Antes de dar por concluida la activación, revise que el archivo `public/admin/config.yml` apunte al repositorio correcto. Hecho lo anterior, el panel queda disponible en `https://[dominio-del-sitio]/admin`.

## Sobre el contenido del sitio anterior

Parte del contenido publicado en el sitio anterior, construido con Gatsby y Ghost, no pudo recuperarse debido a la pérdida de información en la instancia de Ghost alojada en Heroku. Por esa razón se decidió que el contenido del nuevo sitio se almacene como archivos Markdown dentro del repositorio de GitHub, lo que elimina la dependencia de un servicio externo de pago para conservar las publicaciones.

Si en algún momento apareciera contenido adicional del sitio anterior susceptible de recuperarse, puede utilizarse el script incluido en el proyecto:

```
GHOST_URL=https://fdc-blog.herokuapp.com \
GHOST_CONTENT_KEY=TU_KEY_AQUI \
node scripts/migrate-from-ghost.js
```

## Costo de operación

El sitio no genera ningún costo. El alojamiento web en Netlify, el alojamiento del código en GitHub y el panel de administración Decap CMS operan dentro de sus planes gratuitos, suficientes para el volumen de contenido y de visitas del sitio.

## Resumen de la migración

El sitio anterior estaba construido con Gatsby 2, una versión hoy obsoleta, y dependía de una instancia de Ghost alojada en Heroku bajo un servicio de pago, en la que se perdió parte del contenido. El despliegue se hacía de forma manual y el mantenimiento recaía en una sola persona.

El sitio actual está construido con Next.js 16, con soporte vigente. El contenido vive como archivos de texto plano en el repositorio de GitHub y se administra mediante Decap CMS, sin costo y sin riesgo de pérdida por la caída de un servicio externo. El despliegue ocurre automáticamente con cada cambio subido al repositorio, y los errores encontrados durante el desarrollo quedaron documentados en este mismo archivo, de modo que otra persona pueda retomar el proyecto.
