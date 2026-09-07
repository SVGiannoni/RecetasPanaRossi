# Documentación de Implementación — HU-02 / RF-01: Búsqueda por Palabra Clave e Ingredientes

## 📋 Resumen del Requerimiento

- **Código:** RF-01
- **Historia de Usuario:** HU-02 (Búsqueda y filtrado de recetas por categoría e ingredientes)
- **Estado:** En desarrollo (`doing`)

## 🛠️ Funcionalidades Implementadas

1. **Módulo de Búsqueda (`search.js`):**
   - Función `searchRecipes(recipes, query)`.
   - Búsqueda sin distinción de mayúsculas/minúsculas (`case-insensitive`) y con sanitización de espacios en blanco (`trim()`).
   - Coincidencia sobre título de la receta e ingredientes individuales.

2. **Interfaz de Búsqueda Interactiva (`index.html`, `index.css`, `app.js`):**
   - Campo de búsqueda interactivo con icono `🔍` e ID `search-input`.
   - Event listener `input` para filtrado en tiempo real sin requerir recargar la página.
   - Mensaje informativo claro cuando la consulta no devuelve coincidencias.

3. **Pruebas Unitarias de Búsqueda (`tests/run-tests-search.ps1`):**
   - Prueba de coincidencia por título.
   - Prueba de coincidencia por lista de ingredientes.
   - Prueba de consulta vacía/espacios.
   - Prueba de consulta sin resultados.

## 🧪 Cómo verificar la implementación

1. **Abrir `index.html` en el navegador**:
   - Escribir `"harina"` en la barra de búsqueda para ver las recetas que contienen dicho ingrediente.
   - Escribir `"Medialunas"` para filtrar por título.
2. **Ejecutar las pruebas unitarias**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File tests/run-tests-search.ps1
   ```
