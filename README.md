# Panaven · Control

App interna de **inventario y contabilidad** de Panaven: ventas, gastos,
cuentas por cobrar y control de stock, con montos en USD y Bs a la tasa del día.
Funciona en el teléfono como app (PWA) y los datos se comparten en tiempo real
entre los socios.

- **Hosting:** Vercel (sitio estático, sin build).
- **Base de datos:** Firebase Firestore — proyecto `panaven-diesel` (en tiempo real).

## Archivos del proyecto
- `index.html` — la app completa (ya configurada con el proyecto `panaven-diesel`).
- `manifest.json` — permite instalarla como app en el teléfono.
- `sw.js` — service worker (carga rápida / instalación / uso offline).
- `icon.png` — logo de Panaven (ícono de la app).
- `.gitignore` — archivos que Git debe ignorar.

## Subir a GitHub
1. Crea un repositorio nuevo en https://github.com/new (por ejemplo `panaven-control`).
   Déjalo **vacío** (sin README, sin .gitignore — ya vienen incluidos aquí).
2. En tu computadora, dentro de la carpeta del proyecto:
   ```bash
   git init
   git add .
   git commit -m "Panaven Control - version inicial"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/panaven-control.git
   git push -u origin main
   ```
   (Reemplaza `TU_USUARIO` por tu usuario de GitHub.)

   Si prefieres no usar la terminal: en la página del repositorio nuevo,
   usa **Add file → Upload files**, arrastra los 5 archivos y confirma.

## Desplegar en Vercel
1. Entra a https://vercel.com e inicia sesión con tu cuenta de GitHub.
2. **Add New → Project → Import** y elige el repositorio `panaven-control`.
3. Framework Preset: **Other**. Sin Build Command. Output Directory: raíz (`.`).
4. **Deploy**. En segundos tendrás un enlace público (ej. `panaven-control.vercel.app`).
5. Comparte ese enlace con los socios; cada uno puede abrirlo e instalarlo en su
   teléfono (en el menú del navegador: "Agregar a la pantalla de inicio").

Cada `git push` a la rama `main` vuelve a desplegar la app sola, automáticamente.

## Cargar los 132 repuestos (una sola vez)
La app lee los productos desde Firestore, así que el inventario no va en el código.
Para cargar los 132 repuestos IVECO sin teclearlos:
1. Abre las reglas de Firestore de `panaven-diesel` en modo de prueba (para permitir escritura).
2. Abre el archivo `importador-panaven.html` (doble clic) y pulsa **Importar repuestos**.
3. Vuelve a cerrar las reglas de Firestore.

## Seguridad
La app lee/escribe en Firestore. La configuración de Firebase (incluida la `apiKey`)
no es secreta: va en el código del navegador y es normal que se vea. Lo que protege
la base son las **reglas de Firestore**. Antes de compartir el enlace público, cierra
las reglas para que solo tus socios puedan escribir y no quede abierta a cualquiera.
