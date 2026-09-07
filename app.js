/**
 * RecetasPanaRossi - Módulo de Validación y Formulario (RF-01)
 */

// Reglas de validación
function validateRecipe(data) {
  const errors = {};

  // Título (Requerido, mín 3 caracteres)
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.title = 'El título de la receta es obligatorio.';
  } else if (data.title.trim().length < 3) {
    errors.title = 'El título debe tener al menos 3 caracteres.';
  }

  // Categoría (Requerida)
  if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
    errors.category = 'Debes seleccionar una categoría.';
  }

  // Tiempo de preparación (Requerido, número entero > 0)
  const prepTimeNum = Number(data.prepTime);
  if (!data.prepTime || isNaN(prepTimeNum) || prepTimeNum <= 0) {
    errors.prepTime = 'El tiempo debe ser un número mayor a 0 minutos.';
  }

  // Porciones (Requerido, número entero > 0)
  const servingsNum = Number(data.servings);
  if (!data.servings || isNaN(servingsNum) || servingsNum <= 0) {
    errors.servings = 'El número de porciones debe ser mayor a 0.';
  }

  // Ingredientes (Requerido, no vacío)
  const ingredientsList = parseList(data.ingredients);
  if (ingredientsList.length === 0) {
    errors.ingredients = 'Debes ingresar al menos un ingrediente.';
  }

  // Pasos (Requerido, no vacío)
  const stepsList = parseList(data.steps);
  if (stepsList.length === 0) {
    errors.steps = 'Debes ingresar al menos un paso de preparación.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    cleanData: {
      title: (data.title || '').trim(),
      category: (data.category || '').trim(),
      prepTime: prepTimeNum,
      servings: servingsNum,
      ingredients: ingredientsList,
      steps: stepsList
    }
  };
}

function parseList(text) {
  if (!text || typeof text !== 'string') return [];
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

// Inicialización de UI para el navegador
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    const formAlert = document.getElementById('form-alert');
    const btnReset = document.getElementById('btn-reset');
    const previewContainer = document.getElementById('recipe-preview');

    const fields = {
      title: document.getElementById('recipe-title'),
      category: document.getElementById('recipe-category'),
      prepTime: document.getElementById('recipe-prep-time'),
      servings: document.getElementById('recipe-servings'),
      ingredients: document.getElementById('recipe-ingredients'),
      steps: document.getElementById('recipe-steps')
    };

    const errorsSpans = {
      title: document.getElementById('error-title'),
      category: document.getElementById('error-category'),
      prepTime: document.getElementById('error-prep-time'),
      servings: document.getElementById('error-servings'),
      ingredients: document.getElementById('error-ingredients'),
      steps: document.getElementById('error-steps')
    };

    // Actualización en vivo
    Object.values(fields).forEach(input => {
      if (input) {
        input.addEventListener('input', updatePreview);
        input.addEventListener('change', updatePreview);
      }
    });

    function getFormData() {
      return {
        title: fields.title ? fields.title.value : '',
        category: fields.category ? fields.category.value : '',
        prepTime: fields.prepTime ? fields.prepTime.value : '',
        servings: fields.servings ? fields.servings.value : '',
        ingredients: fields.ingredients ? fields.ingredients.value : '',
        steps: fields.steps ? fields.steps.value : ''
      };
    }

    function clearErrors() {
      Object.values(fields).forEach(input => {
        if (input) input.classList.remove('is-invalid');
      });
      Object.values(errorsSpans).forEach(span => {
        if (span) span.textContent = '';
      });
      if (formAlert) {
        formAlert.className = 'alert hidden';
        formAlert.textContent = '';
      }
    }

    function displayErrors(errors) {
      clearErrors();

      Object.keys(errors).forEach(key => {
        if (fields[key]) {
          fields[key].classList.add('is-invalid');
        }
        if (errorsSpans[key]) {
          errorsSpans[key].textContent = errors[key];
        }
      });

      if (formAlert) {
        formAlert.className = 'alert alert-error';
        formAlert.textContent = 'Por favor, corregí los errores en el formulario para continuar.';
      }
    }

    function updatePreview() {
      const rawData = getFormData();
      const validation = validateRecipe(rawData);
      const data = validation.cleanData;

      if (!data.title && !data.category && data.ingredients.length === 0 && data.steps.length === 0) {
        previewContainer.innerHTML = `
          <div class="preview-empty">
            <span class="preview-empty-icon">📖</span>
            <p>Completá el formulario para ver la vista previa en tiempo real.</p>
          </div>
        `;
        return;
      }

      previewContainer.innerHTML = `
        <div class="preview-header">
          <h3 class="preview-title">${escapeHtml(data.title || 'Título de la Receta')}</h3>
        </div>
        <div class="preview-meta">
          <span class="meta-pill">📁 ${escapeHtml(data.category || 'Categoría')}</span>
          <span class="meta-pill">⏱️ ${data.prepTime || 0} min</span>
          <span class="meta-pill">🍽️ ${data.servings || 0} porciones</span>
        </div>

        <h4 class="preview-section-title">Ingredientes (${data.ingredients.length})</h4>
        <ul class="preview-list">
          ${data.ingredients.length > 0
            ? data.ingredients.map(ing => `<li>${escapeHtml(ing)}</li>`).join('')
            : '<li style="border-left-color: var(--text-muted);">Sin ingredientes ingresados</li>'}
        </ul>

        <h4 class="preview-section-title">Pasos de Preparación (${data.steps.length})</h4>
        <ol class="preview-steps">
          ${data.steps.length > 0
            ? data.steps.map(st => `<li>${escapeHtml(st)}</li>`).join('')
            : '<li>Sin pasos ingresados</li>'}
        </ol>
      `;
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const rawData = getFormData();
        const result = validateRecipe(rawData);

        if (!result.isValid) {
          displayErrors(result.errors);
          return;
        }

        clearErrors();
        if (formAlert) {
          formAlert.className = 'alert alert-success';
          formAlert.textContent = '¡Receta validada con éxito! Lista para su publicación.';
        }
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (form) form.reset();
        clearErrors();
        updatePreview();
      });
    }
  });
}

// Exportación para Node.js testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateRecipe,
    parseList
  };
}
