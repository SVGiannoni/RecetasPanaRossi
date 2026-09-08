# Documentación de Implementación — HU-03 / RF-02: Sección 'Mis Favoritas' en Perfil

## 📋 Resumen del Requerimiento

- **Código:** RF-02
- **Historia de Usuario:** HU-03 (Guardado de recetas favoritas)
- **Estado:** En desarrollo (`doing`)

## 🛠️ Funcionalidades Implementadas

1. **Pestana 'Mis Favoritas' e Insignia de Contador (`index.html`, `index.css`):**
   - Barra de pestañas `.view-tabs` para conmutar entre **Catálogo Principal** y **Mis Favoritas**.
   - Insignia de conteo `#fav-count-badge` que muestra en tiempo real la cantidad de recetas guardadas en favoritas.

2. **Vista Exclusiva de Recetas Favoritas (`app.js`):**
   - Filtrado dinámico que despliega única y exclusivamente las recetas cuyos identificadores están guardados en `FavoriteStore`.
   - Estado de sugerencia/vacío adaptativo para la pestaña de favoritas ("Aún no tenés recetas en tu lista de favoritas...").
   - Actualización en vivo del catálogo e insignia al marcar o desmarcar favoritos.

3. **Pruebas Unitarias de la Vista de Favoritas (`tests/run-tests-myfavorites.ps1`):**
   - Verificación de desplegado exclusivo de recetas marcadas.
   - Verificación de vista vacía cuando no existen recetas en favoritas.
   - Verificación de conteo de la insignia de badge.

## 🧪 Cómo verificar la implementación

1. **Abrir `index.html` en el navegador**:
   - En el catálogo principal, marcar 1 o 2 recetas con el icono de corazón `🤍` (cambiará a `❤️`).
   - Observar cómo la insignia `#fav-count-badge` incrementa su contador.
   - Hacer clic en la pestaña **"❤️ Mis Favoritas"** para verificar que solo se despliegan las recetas seleccionadas.
2. **Ejecutar las pruebas unitarias**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File tests/run-tests-myfavorites.ps1
   ```
