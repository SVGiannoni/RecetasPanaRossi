# Documentación de Implementación — HU-02 / RF-02: Filtros por Categoría y Mensaje de Resultados Vacíos

## 📋 Resumen del Requerimiento

- **Código:** RF-02
- **Historia de Usuario:** HU-02 (Búsqueda y filtrado de recetas por categoría e ingredientes)
- **Estado:** En desarrollo (`doing`)

## 🛠️ Funcionalidades Implementadas

1. **Selector de Categorías Interactivo (`index.html`, `index.css`):**
   - Chips interactivos (`Todas`, `Dulce`, `Salado`, `Repostería`, `Vegano`, `Rápida`).
   - Estado activo resaltado en color de acento y tipografía destacada.

2. **Lógica de Filtrado Combinado (`search.js`, `app.js`):**
   - Función `filterRecipes(recipes, { search, category })`.
   - Evaluación conjunta de término de búsqueda (título / ingredientes) y categoría seleccionada.
   - Filtrado dinámico instantáneo al hacer clic en cualquier chip.

3. **Mensaje de Resultados Vacíos con Sugerencias (`app.js`, `index.css`):**
   - Contenedor informativo amigable `.empty-suggestions` cuando no hay recetas resultantes.
   - Lista de sugerencias accionables para orientar al usuario (ej: probar con la opción "Todas", revisar faltas de ortografía, o buscar por ingrediente).

4. **Pruebas Unitarias de Filtros (`tests/run-tests-filters.ps1`):**
   - Verificación de filtro individual por categoría.
   - Verificación de opción "Todas".
   - Verificación de combinación de búsqueda por ingrediente y categoría.
   - Verificación de caso sin resultados.

## 🧪 Cómo verificar la implementación

1. **Abrir `index.html` en el navegador**:
   - Hacer clic en el chip **"Salado"** para ver únicamente recetas saladas.
   - Escribir una búsqueda inexistente (ej: `"Pescado"`) en la categoría **"Vegano"** para visualizar el cuadro de sugerencias accionables.
2. **Ejecutar las pruebas unitarias**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File tests/run-tests-filters.ps1
   ```
