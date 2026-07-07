# Panaven · Administración

Sistema administrativo interno de **Panaven**, hecho desde cero. Reemplaza a la app
de inventario anterior. Todo se guarda en tiempo real y se comparte entre los socios.

## Qué hace
- **Clientes y proveedores**: registro con RIF, teléfono, contacto, dirección y notas.
- **Solicitudes de cotización (SC-0001…)**: pedir precios a un proveedor. Se envía por
  WhatsApp o se imprime.
- **Cotizaciones (COT-0001…)**: presupuesto a un cliente en USD con equivalente en Bs
  a la tasa del día, IVA opcional, validez y condiciones. Estados: borrador → enviada →
  aprobada / rechazada. Se envía por WhatsApp o se imprime en PDF con membrete.
- **Notas de entrega (NE-0001…)**: se crean solas desde una cotización (botón
  "→ Nota de entrega") o desde cero. Formato de impresión con firmas de entrega y recibo.
- **Tasa del día**: se cambia tocando el recuadro azul del encabezado o en Ajustes.
- **Numeración automática** de todos los documentos (contador central en Firestore).
- Funciona como **app instalable (PWA)** en el teléfono, con carga rápida offline.

- **Hosting:** Vercel (sitio estático, sin build).
- **Base de datos:** Firebase Firestore — proyecto `panaven-diesel` (mismo de siempre, en tiempo real).

## Archivos del proyecto
- `index.html` — la app completa (ya configurada con el proyecto `panaven-diesel`).
- `manifest.json` — permite instalarla como app en el teléfono.
- `sw.js` — service worker (carga rápida / instalación / uso offline).
- `icon.png` — logo de Panaven (ícono de la app).
- `.gitignore` — archivos que Git debe ignorar (si tu archivo se llama `_gitignore`, renómbralo a `.gitignore`).

## Primer uso (5 minutos)
1. Abre la app y entra en **Ajustes**: guarda la tasa del día y los datos de la empresa
   (nombre, RIF, teléfono, dirección). Esos datos salen en el membrete de los documentos impresos.
2. En **Contactos**, registra tus clientes y proveedores.
3. Ya puedes crear cotizaciones, solicitudes y notas de entrega desde **Inicio**.

> Nota: esta versión usa colecciones nuevas en Firestore (`clientes`, `proveedores`,
> `solicitudes`, `cotizaciones`, `notas`, `config`). Los datos del inventario viejo no
> se tocan ni se borran; simplemente no se usan.

## Subir a GitHub
1. Crea un repositorio nuevo en https://github.com/new (por ejemplo `panaven-admin`).
   Déjalo **vacío** (sin README, sin .gitignore — ya vienen incluidos aquí).
2. En tu computadora, dentro de la carpeta del proyecto:
   ```bash
   git init
   git add .
   git commit -m "Panaven Administracion - version inicial"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/panaven-admin.git
   git push -u origin main
   ```
   (Reemplaza `TU_USUARIO` por tu usuario de GitHub.)

   Si prefieres no usar la terminal: en la página del repositorio nuevo,
   usa **Add file → Upload files**, arrastra los archivos y confirma.

## Desplegar en Vercel
1. Entra a https://vercel.com e inicia sesión con tu cuenta de GitHub.
2. **Add New → Project → Import** y elige el repositorio `panaven-admin`.
3. Framework Preset: **Other**. Sin Build Command. Output Directory: raíz (`.`).
4. **Deploy**. En segundos tendrás un enlace público (ej. `panaven-admin.vercel.app`).
5. Comparte ese enlace con los socios; cada uno puede instalarlo en su teléfono
   (menú del navegador → "Agregar a la pantalla de inicio").

Cada `git push` a la rama `main` vuelve a desplegar la app sola, automáticamente.

## Seguridad
La configuración de Firebase (incluida la `apiKey`) no es secreta: va en el código del
navegador y es normal que se vea. Lo que protege la base son las **reglas de Firestore**.
Antes de compartir el enlace público, ajusta las reglas para que solo tus socios puedan
escribir. Las colecciones que usa esta app son: `clientes`, `proveedores`, `solicitudes`,
`cotizaciones`, `notas` y `config`.
