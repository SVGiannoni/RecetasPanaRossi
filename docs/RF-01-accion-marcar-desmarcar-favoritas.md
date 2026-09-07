# Documentación de Implementación — HU-03 / RF-01: Acción para Marcar y Desmarcar Favoritas

## 📋 Resumen del Requerimiento

- **Código:** RF-01
- **Historia de Usuario:** HU-03 (Guardado de recetas favoritas)
- **Estado:** En desarrollo (`doing`)

## 🛠️ Funcionalidades Implementadas

1. **Módulo de Favoritos (`favorites.js`):**
   - Clase `FavoriteStore` con almacenamiento local (`localStorage`) mediante una estructura de conjunto (`Set`).
   - Métodos `isFavorite(recipeId)`, `toggleFavorite(recipeId)`, `getFavoriteIds()`, y `clear()`.

2. **Botón Interactivo de Favoritos en la UI (`index.html`, `index.css`, `app.js`):**
   - Botón `.btn-favorite` renderizado junto al título de cada tarjeta del catálogo.
   - Estado visual interactivo: corazón relleno (`❤️`) cuando está en favoritas, corazón sin rellenar (`🤍`) cuando no.
   - Animación suave al pasar el cursor o presionar el botón.
   - Persistencia automática de los cambios entre recargas de la aplicación.

3. **Pruebas Unitarias de Favoritos (`tests/run-tests-favorites.ps1`):**
   - Verificación de estado inicial sin marcar.
   - Verificación de alternancia (marcar de no favorita a favorita).
   - Verificación de desmarcado (quitar favorita).
   - Verificación de conjunto de múltiples favoritas simultáneas.

## 🧪 Cómo verificar la implementación

1. **Abrir `index.html` en el navegador**:
   - En cualquier receta del catálogo, hacer clic en el botón de corazón `🤍` para marcarla como favorita `❤️`.
   - Volver a hacer clic sobre `❤️` para quitarla de favoritas.
   - Recargar la página y verificar que el estado seleccionado se conserva.
2. **Ejecutar las pruebas unitarias**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File tests/run-tests-favorites.ps1
   ```
