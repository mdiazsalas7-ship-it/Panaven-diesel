# Panaven · Administración

Sistema administrativo interno de **Panaven**, hecho desde cero. Reemplaza a la app
de inventario anterior. Todo se guarda en tiempo real y se comparte entre los socios.

## Qué hace
- **Acceso con contraseña**: solo los socios registrados pueden entrar (Firebase Authentication).
- **Estado de cuenta por cliente**: al abrir un cliente ves cuánto te debe, su total
  comprado y sus ventas pendientes de cobro; en la lista de clientes el saldo se ve de una vez.
- **Clientes y proveedores**: registro con RIF, teléfono, contacto, dirección y notas.
- **Catálogo de productos**: código, nombre, unidad, precio USD y existencia. Al escribir
  una línea en cualquier documento, autocompleta desde el catálogo (rellena precio y unidad).
  Al marcar una nota de entrega como "entregada" descuenta la existencia automáticamente.
- **Solicitudes de cotización (SC-0001…)**: pedir precios a un proveedor. Se envía por
  WhatsApp o se imprime.
- **Cotizaciones (COT-0001…)**: presupuesto a un cliente en USD con equivalente en Bs
  a la tasa del día, IVA opcional, validez y condiciones. Estados: borrador → enviada →
  aprobada / rechazada. Se envía por WhatsApp o se imprime en PDF con membrete.
- **Notas de entrega (NE-0001…)**: se crean solas al concretar una venta, o desde cero.
  Formato de impresión con firmas de entrega y recibo.
- **Ventas (V-0001…) — flujo en un solo paso**: cuando el cliente aprueba, tocas
  "✓ Cliente aprobó — Concretar venta" en la cotización y la app crea **la venta y la
  nota de entrega automáticamente**, todo vinculado (ya no hay que volver a escribir nada).
  También hay "Venta directa" para ventas sin cotización previa.
- **Cobros y cuentas por cobrar**: en cada venta se registran los pagos (efectivo $,
  efectivo Bs, pago móvil, Zelle, punto, etc.), en USD o en Bs a la tasa del pago.
  La app calcula lo pagado y el **saldo pendiente**; la venta pasa sola de
  "por cobrar" → "abonada" → "pagada". La pestaña **Finanzas** muestra el total por
  cobrar, lo cobrado en el mes y las ventas del mes.
- **Costo y ganancia**: cada producto del catálogo puede tener su costo (visible solo
  dentro de la app). Al concretar una venta el costo queda congelado en ella y se ve la
  ganancia de esa venta. Finanzas muestra el cierre del mes: ventas, costo de mercancía,
  gastos y **ganancia neta**. Las ventas anteriores a esta versión no tienen costo guardado.
- **Gastos (G-0001…)**: registro de egresos por categoría (mercancía, flete, servicios,
  alquiler, nómina…), en USD o Bs, con el total del mes en Finanzas y en Inicio.
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
> `productos`, `solicitudes`, `cotizaciones`, `notas`, `ventas`, `gastos`, `config`).
> Los datos del inventario viejo no se tocan ni se borran; simplemente no se usan.

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

## Seguridad (¡hacer esto antes de usarla en serio!)
La app ahora tiene **inicio de sesión**: solo los socios con cuenta pueden entrar y la
base de datos queda protegida. La `apiKey` de Firebase que se ve en el código no es
secreta; lo que protege los datos son la autenticación y las reglas. Actívalo así
(10 minutos, una sola vez):

1. **Activar el inicio de sesión.** En https://console.firebase.google.com abre el
   proyecto `panaven-diesel` → **Authentication** → *Get started* → pestaña
   **Sign-in method** → habilita **Email/Password** (solo el primer interruptor) → Save.
2. **Bloquear el auto-registro.** En Authentication → **Settings** → *User actions*:
   desmarca **"Enable create (sign-up)"**. Así nadie puede crearse una cuenta por su
   cuenta; solo las que tú crees.
3. **Crear las cuentas de los socios.** En Authentication → pestaña **Users** →
   **Add user**: correo y contraseña para cada socio (y para ti).
4. **Publicar las reglas.** En **Firestore Database** → pestaña **Rules**: borra lo que
   haya, pega el contenido del archivo `firestore.rules` de este proyecto y pulsa
   **Publish**. Desde ese momento, sin sesión iniciada nadie puede leer ni escribir.
5. Sube los archivos nuevos a GitHub (`git add . && git commit -m "login" && git push`).
   Al abrir la app aparecerá la pantalla de acceso; cada socio entra una vez y la
   sesión queda guardada en su teléfono.

Para cerrar sesión: **Ajustes → Cuenta → Cerrar sesión**. Si un socio olvida su
contraseña, cámbiasela desde Authentication → Users → menú ⋮ → *Reset password*.

Las colecciones que usa esta app son: `clientes`, `proveedores`, `solicitudes`,
`productos`, `cotizaciones`, `notas`, `ventas`, `gastos` y `config`.
