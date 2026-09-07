# Requerimientos --  RecetasPanaRossi

_Generado automaticamente el 2026-09-07T14:20:59.155Z -- no editar a mano, se sobreescribe en cada publicacion._

## HU-01: Creación y publicación de recetas de cocina

### RF-01: Formulario de alta y validación de recetas (Funcional)

Implementar la interfaz de usuario y las validaciones de campos obligatorios (título, categoría, tiempo, porciones, lista de ingredientes y pasos de preparación).

### RF-02: Servicio de persistencia y publicación en catálogo (Funcional)

Implementar la lógica y endpoint para almacenar la receta en base de datos y hacerla visible en el catálogo principal tras su publicación.

## HU-02: Búsqueda y filtrado de recetas por categoría e ingredientes

### RF-01: Búsqueda por palabra clave e ingredientes (Funcional)

Implementar la barra de búsqueda que permita consultar recetas filtrando por coincidencia en el título o en la lista de ingredientes.

### RF-02: Filtros por categoría y mensaje de resultados vacíos (Funcional)

Implementar selectores de categoría (Dulce, Salado, Vegano, Rápida) y desplegar mensaje informativo con sugerencias cuando no haya coincidencias.

## HU-03: Guardado de recetas favoritas

### RF-01: Acción para marcar y desmarcar favoritas (Funcional)

Incorporar botón/icono interactivo en cada receta para agregarla o quitarla de la lista personal de favoritas del usuario.

### RF-02: Sección 'Mis Favoritas' en perfil (Funcional)

Crear la vista en el perfil del usuario autenticado donde se listen exclusivamente las recetas marcadas como favoritas.

## RO-01: Configuración y puesta en marcha de VM de testing

### RF-01: Configuración y puesta en marcha de VM de testing (Funcional)

Levantar instancia de VM con Docker y proxy inverso para desplegar la rama testing, permitiendo que el equipo de QA valide las entregas.

## RO-02: testing del HU-01

### RF-01: testing del HU-01 (Funcional)

prueba de testeo del primer requerimiento
