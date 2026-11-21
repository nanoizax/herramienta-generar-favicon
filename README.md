# Generador de Favicon

Sube tu logo y descarga todos los tamaños de favicon en un ZIP. Gratis, sin cuenta y sin que la imagen salga de tu equipo.

Herramienta gratuita y de código abierto de [SonhoLab](https://sonholab.com). Corre **100 % en el navegador**: los archivos no se suben a ningún servidor.

> Licencia: **MIT** · Autor: Leandro Manuel Perez Montañana · Idiomas de la interfaz: español, inglés, francés, portugués (BR), alemán, hindi, indonesio y ruso.

## Qué hace

Cuando lanzas un sitio nuevo o cambias de logo, cada navegador y cada dispositivo pide el ícono en un tamaño distinto: 16x16 para la pestaña, 180x180 para un iPhone, 512x512 para instalar la web como app. Ir tamaño por tamaño en un editor de imágenes es tedioso y fácil de dejar a medias. Aquí subes tu logo una sola vez y la herramienta genera los seis tamaños que necesitas, listos para descargar juntos en un ZIP. Todo el recorte y el redimensionado ocurre en tu propio navegador: la imagen nunca se sube a un servidor.

**Cuándo te sirve:**

- Un desarrollador termina el sitio de un cliente a último momento y necesita los archivos de favicon ya mismo, sin abrir Photoshop ni exportar tamaño por tamaño a mano.
- Un negocio pequeño rediseña su logo y necesita reemplazar los íconos viejos del sitio por unos nuevos que coincidan con la marca actualizada, sin depender del diseñador para un cambio tan simple.
- Alguien arma una landing page de prueba o un proyecto personal y quiere que la pestaña del navegador se vea completa, con ícono propio en vez del ícono genérico.

## Cómo se usa

1. **Sube tu logo o imagen.** Arrastra el archivo a la zona de carga o selecciónalo desde tu equipo. Funciona con PNG, JPG o cualquier imagen que ya tengas de tu marca, y se procesa al instante.
2. **Revisa las miniaturas.** La herramienta recorta la imagen al centro para ajustarla a un cuadrado y genera las miniaturas de cada tamaño: 16x16, 32x32, 48x48, 180x180, 192x192 y 512x512. Revísalas antes de descargar para confirmar que el recorte no corte una parte importante del logo.
3. **Descarga el paquete ZIP.** Presiona descargar y recibes un solo archivo ZIP con los seis PNG listos para subir a tu proyecto. Solo falta enlazarlos en el HTML de tu sitio con las etiquetas link rel icon correspondientes a cada tamaño, o subirlos donde tu framework espere los íconos.

## Qué necesita para funcionar

### Para instalarla y compilarla

- [Node.js](https://nodejs.org) 18 o superior (probado con Node 22) y npm.
- Conexión a internet **solo** durante `npm install`. Una vez compilada, la herramienta no pide nada a internet.

### Complementos específicos de esta herramienta

- **Ninguno.** No usa modelos, binarios ni servicios externos: todo está en el código y en dependencias normales de npm.

### En el navegador de quien la usa

- Cualquier navegador moderno (Chrome, Edge, Firefox, Safari). No necesita permisos especiales.

## Instalación

```bash
git clone https://github.com/nanoizax/herramienta-generar-favicon.git
cd herramienta-generar-favicon
npm install
npm run dev         # servidor de desarrollo en http://localhost:5173
```

Para publicarla:

```bash
npm run build       # genera la carpeta dist/
npm run preview     # probar la versión compilada
```

Esta herramienta **no tiene servidor propio**: todo ocurre en el navegador de quien la usa. Basta con publicar la carpeta `dist/` en cualquier hosting estático (GitHub Pages, Netlify, Cloudflare Pages, Nginx, Apache...).

## Cómo está organizado

```
src/pages/tools/   La página de la herramienta (interfaz y lógica de pantalla)
src/lib/tools/     La lógica de la herramienta, separada de la interfaz
src/components/    Piezas compartidas (zona de arrastre de archivos, botón)
src/locales/       Textos en 8 idiomas (esta herramienta solamente)
src/i18n.ts        Configuración de idiomas
```

## Cómo meterla en tu propia plataforma

1. **Como página aparte:** publica `dist/` en una ruta de tu sitio, por ejemplo `/herramientas/generar-favicon/`. Si la sirves en una subcarpeta, define `base` en `vite.config.ts`.
2. **Dentro de tu aplicación React:** copia `src/pages/tools/*Page.tsx`, `src/lib/tools/` y `src/components/` a tu proyecto, instala las mismas dependencias de `package.json` y renderiza la página donde quieras.
3. **Con tu diseño:** el marco de la página (título, ayuda, preguntas frecuentes) está en `src/components/tools/ToolPageLayout.tsx` y es intencionalmente simple. Cámbialo por tu cabecera, tu pie y tus estilos; solo necesita pintar `children`.
4. **Con tu analítica:** `src/lib/hitCounter.ts` no hace nada. Si quieres medir el uso, conéctalo ahí a tu propia herramienta.

## Privacidad

Todo el procesamiento ocurre en el navegador. Esta copia no incluye analítica, cookies, contadores ni llamadas a ningún servidor propio. Los archivos del usuario no salen de su equipo.

## Preguntas frecuentes

**¿Qué pasa con la imagen que subo?**  
Nada sale de tu equipo. La imagen se recorta y se redimensiona dentro de tu propio navegador usando el procesador de tu dispositivo, así que no viaja a ningún servidor nuestro ni de terceros. Al cerrar la pestaña no queda copia en ningún lado.

**¿El archivo que descargo es un .ico?**  
No, la herramienta genera archivos PNG en cada tamaño, no el formato .ico clásico de varias resoluciones en un solo archivo. Para la gran mayoría de sitios esto es suficiente, porque los navegadores actuales reconocen perfectamente un favicon en PNG declarado con la etiqueta link rel icon. Si necesitas específicamente un .ico para un sistema antiguo, esta herramienta no lo genera.

**¿Por qué se recorta mi logo si ya lo subí completo?**  
Todos los tamaños de favicon son cuadrados, así que la herramienta recorta la imagen al centro antes de redimensionarla. Si tu logo ya es cuadrado o tiene el símbolo principal centrado, el resultado se ve bien. Pero si es un logo muy ancho, rectangular o con el texto pegado a un costado, como un isologo con nombre, el recorte puede cortar una parte importante. En ese caso conviene usar primero solo el símbolo o ícono de la marca, sin el texto.

**¿Es gratis y sin límite de usos?**  
Es gratis y no tiene límite: puedes generar el favicon de un proyecto o de veinte, el mismo día, sin crear cuenta ni dejar un correo. Tampoco agrega marca de agua a las imágenes ni pide pagar para acceder a todos los tamaños.

**¿Qué tamaños de favicon necesito realmente para mi sitio?**  
Depende de dónde se vea, pero con los seis tamaños que genera esta herramienta cubres los casos comunes: 16x16 y 32x32 para la pestaña del navegador y los favoritos, 48x48 para Windows, 180x180 para que se vea bien al guardar el sitio en la pantalla de inicio de un iPhone, y 192x192 y 512x512 para Android y para cuando el sitio se instala como aplicación web.

## Licencia

Este proyecto se publica bajo la licencia **MIT**. El texto completo está en [LICENSE](LICENSE).

Las dependencias tienen sus propias licencias, listadas en [THIRD-PARTY.md](THIRD-PARTY.md).

## Más herramientas gratuitas

Esta es una de las herramientas gratuitas de SonhoLab. Encuentra el resto, cada una con su repositorio, en https://sonholab.com/es/herramientas.

---

Hecho por Leandro Manuel Perez Montañana.
