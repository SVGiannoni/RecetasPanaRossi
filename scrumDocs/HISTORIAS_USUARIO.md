# Historias de Usuario --  RecetasPanaRossi

_Generado automaticamente el 2026-09-07T12:51:18.509Z -- no editar a mano, se sobreescribe en cada publicacion._

## HU-01: Creación y publicación de recetas de cocina

Como usuario cocinero quiero registrar una nueva receta con sus ingredientes, pasos de preparación y categoría para compartirla con la comunidad.

### Criterios de Aceptacion

El formulario permite ingresar título, categoría, tiempo de preparación, porciones, lista de ingredientes y pasos de preparación.
Se valida que los campos requeridos (título, ingredientes, pasos) no estén vacíos.
Una vez guardada, la receta se publica y queda accesible en el catálogo principal.

## HU-02: Búsqueda y filtrado de recetas por categoría e ingredientes

Como visitante del recetario quiero buscar recetas por palabra clave o filtrarlas por categoría para encontrar rápidamente qué cocinar.

### Criterios de Aceptacion

Existe una barra de búsqueda funcional por título o ingredientes.
Se puede filtrar por categorías (ej: Dulce, Salado, Vegano, Rápida).
Si no hay coincidencias, se muestra un mensaje informativo sugiriendo ajustar los filtros.

## HU-03: Guardado de recetas favoritas

Como usuario registrado quiero marcar recetas como favoritas para acceder rápidamente a mis platos preferidos en cualquier momento.

### Criterios de Aceptacion

Cada receta dispone de una opción (botón/icono) para marcar o desmarcar como favorita.
En la sección "Mis Favoritas" del perfil de usuario se despliegan únicamente las recetas guardadas.
