# Documentación de Implementación — RF-01: Formulario de Alta y Validación de Recetas

## 📋 Resumen del Requerimiento

- **Código:** RF-01
- **Historia de Usuario:** HU-01 (Creación y publicación de recetas de cocina)
- **Estado:** En desarrollo (`doing`)

## 🛠️ Funcionalidades Implementadas

1. **Interfaz del Formulario (`index.html`, `index.css`):**
   - Campo para Título de Receta (mínimo 3 caracteres, requerido).
   - Selector de Categoría (Dulce, Salado, Repostería, Vegano, Rápida).
   - Selector de Tiempo de preparación en minutos (> 0).
   - Selector de Porciones (> 0).
   - Área de texto para Ingredientes con parser por línea.
   - Área de texto para Pasos de Preparación con parser por línea.

2. **Lógica de Validación en Vivo (`app.js`):**
   - Validación al enviar el formulario y al modificar los campos.
   - Limpieza automática de espacios en blanco (`trim()`).
   - Indicadores visuales de error (`is-invalid`) y mensajes detallados bajo cada campo.
   - Banner de alerta accesible para el usuario.
   - Vista previa en tiempo real de la receta formateada según los datos ingresados.

3. **Verificación y Pruebas Automated (`tests/run-tests.ps1`, `tests/run-tests.js`):**
   - Casos de prueba para validación positiva (datos completos).
   - Casos de prueba para fallos por título corto o vacío, categoría vacía, tiempo/porciones menores a cero, o listas de ingredientes/pasos sin contenido.

## 🧪 Cómo verificar la implementación

1. **Abrir `index.html` en cualquier navegador web** para interactuar con la interfaz del formulario y ver la previsualización en vivo.
2. **Ejecutar el script de pruebas unitarias**:
   ```powershell
   powershell -ExecutionPolicy Bypass -File tests/run-tests.ps1
   ```
