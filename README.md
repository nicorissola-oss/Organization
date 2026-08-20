# Organization

Orden de tareas facultativas.

## Prioridades

App de una sola pantalla para ordenar lo que tenés que estudiar. Tarjetas de
colores, una arriba de otra: la de arriba es lo primero que hacés hoy.

- **Nombre y tarea**: cada tarjeta tiene un campo para la materia (ej. Historia)
  y otro para lo que hay que hacer (ej. "1 hora de estudio", "TP práctico").
- **Reordenar**: arrastrá desde el ⠿, con el mouse o con el dedo. Si la lista es
  larga, al llegar al borde la pantalla acompaña sola.
- **Grupos**: inspirados en los bloques en C de Scratch. Un grupo es una tarjeta
  con un hueco adentro: le ponés "Fin de semana" y arrastrás ahí todo lo que
  entra en ese rato. Se mueve entero, con lo que tenga adentro, y si lo borrás
  las tarjetas de adentro no se pierden: suben al nivel principal.
- **Colores**: el botón ● abre la paleta. Dos tarjetas con el mismo título
  pueden compartir color; si los títulos son distintos, los colores se
  intercambian para que no se confundan.
- **Agregar / quitar**: "+ Tarjeta" y "+ Grupo" al pie, ✕ para borrar.
  "Vaciar" vuelve a las 5 tarjetas iniciales.
- Todo se guarda automáticamente en el navegador del dispositivo.

### Instalarla como app (y que no se borre)

Los datos viven en el navegador que abre la app, así que hay que abrirla
siempre desde la misma dirección. Un visor de archivos o una vista embebida
no sirven: ahí no hay dónde guardar.

1. Publicá el repo con **GitHub Pages**: en GitHub, Settings → Pages → Source:
   *Deploy from a branch* → rama `main`, carpeta `/ (root)` → Save. En un
   minuto queda en `https://nicorissola-oss.github.io/Organization/`.
2. Abrí esa dirección en el celular con Chrome o Safari.
3. Instalala:
   - **Android (Chrome)**: menú ⋮ → *Instalar app* / *Añadir a pantalla principal*.
   - **iPhone (Safari)**: botón Compartir → *Añadir a pantalla de inicio*.

Queda con ícono propio, se abre a pantalla completa, anda sin internet (un
service worker guarda los archivos) y lo que escribís se conserva entre
sesiones.

### Copia de seguridad

"Guardar copia" baja un `prioridades-AAAA-MM-DD.json` con todo; "Abrir copia"
lo restaura. Sirve para pasar los datos a otro teléfono o para no depender
solo del navegador.

### Cómo usarla

Abrí `index.html` en cualquier navegador (celular o computadora). No necesita
instalación, servidor ni conexión a internet.

En el celular conviene agregarla a la pantalla de inicio ("Añadir a pantalla
principal" en el menú del navegador) para abrirla como una app.
