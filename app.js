/**
 * RecetasPanaRossi - Módulo de Validación, Persistencia, Búsqueda y Filtros (RF-01, RF-02, HU-02)
 */

function validateRecipe(data) {
  const errors = {};

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
    errors.title = 'El título de la receta es obligatorio.';
  } else if (data.title.trim().length < 3) {
    errors.title = 'El título debe tener al menos 3 caracteres.';
  }

  if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
    errors.category = 'Debes seleccionar una categoría.';
  }

  const prepTimeNum = Number(data.prepTime);
  if (!data.prepTime || isNaN(prepTimeNum) || prepTimeNum <= 0) {
    errors.prepTime = 'El tiempo debe ser un número mayor a 0 minutos.';
  }

  const servingsNum = Number(data.servings);
  if (!data.servings || isNaN(servingsNum) || servingsNum <= 0) {
    errors.servings = 'El número de porciones debe ser mayor a 0.';
  }

  const ingredientsList = parseList(data.ingredients);
  if (ingredientsList.length === 0) {
    errors.ingredients = 'Debes ingresar al menos un ingrediente.';
  }

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
  if (Array.isArray(text)) return text;
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
    const catalogContainer = document.getElementById('catalog-list');
    const searchInput = document.getElementById('search-input');
    const categoryChipsContainer = document.getElementById('category-chips');

    let activeCategory = 'Todas';

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

    function renderCatalog() {
      if (!catalogContainer) return;

      const store = (typeof recipeStore !== 'undefined') ? recipeStore : null;
      let recipes = store ? store.getPublished() : [];

      const searchQuery = searchInput ? searchInput.value : '';

      // Aplicar filtros por categoría y búsqueda en paralelo
      if (typeof filterRecipes === 'function') {
        recipes = filterRecipes(recipes, { search: searchQuery, category: activeCategory });
      } else if (typeof searchRecipes === 'function') {
        recipes = searchRecipes(recipes, searchQuery);
      }

      if (recipes.length === 0) {
        catalogContainer.innerHTML = `
          <div class="empty-suggestions">
            <span class="preview-empty-icon">🔍</span>
            <p><strong>No se encontraron recetas para tu búsqueda.</strong></p>
            <p style="margin-top: 0.5rem;">Sugerencias para encontrar lo que buscás:</p>
            <ul>
              <li>Revisá que las palabras clave o ingredientes estén bien escritos.</li>
              <li>Si seleccionaste una categoría (ej: "${escapeHtml(activeCategory)}"), probá cambiar a <strong>"Todas"</strong>.</li>
              <li>Intentá buscar por ingredientes principales (ej: <em>harina, manteca, chocolate</em>).</li>
            </ul>
          </div>
        `;
        return;
      }

      catalogContainer.innerHTML = recipes.map(r => `
        <article class="catalog-item">
          <div class="catalog-item-header">
            <h3 class="catalog-item-title">${escapeHtml(r.title)}</h3>
            <span class="meta-pill">📁 ${escapeHtml(r.category)}</span>
          </div>
          <div class="catalog-item-meta">
            <span class="meta-pill">⏱️ ${r.prepTime} min</span>
            <span class="meta-pill">🍽️ ${r.servings} porciones</span>
          </div>
          <details class="catalog-details">
            <summary>Ver ingredientes y preparación</summary>
            <div class="catalog-details-content">
              <strong>Ingredientes:</strong>
              <ul style="margin-left: 1.2rem; margin-bottom: 0.5rem;">
                ${r.ingredients.map(i => `<li>${escapeHtml(i)}</li>`).join('')}
              </ul>
              <strong>Pasos:</strong>
              <ol style="margin-left: 1.2rem;">
                ${r.steps.map(s => `<li>${escapeHtml(s)}</li>`).join('')}
              </ol>
            </div>
          </details>
        </article>
      `).join('');
    }

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

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Configurar chips de categoría
    if (categoryChipsContainer) {
      const chips = categoryChipsContainer.querySelectorAll('.chip');
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          activeCategory = chip.dataset.category || 'Todas';
          renderCatalog();
        });
      });
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

        if (typeof recipeStore !== 'undefined') {
          recipeStore.saveRecipe(result.cleanData);
          renderCatalog();
        }

        if (formAlert) {
          formAlert.className = 'alert alert-success';
          formAlert.textContent = '¡Receta guardada y publicada exitosamente en el catálogo principal!';
        }

        form.reset();
      });
    }

    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (form) form.reset();
        clearErrors();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', renderCatalog);
    }

    renderCatalog();
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateRecipe,
    parseList
  };
}
