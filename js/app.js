// Logica del frontend para Recetas Pana Rossi
// Implementacion de HU-01: Creacion y publicacion de recetas de cocina

const STORAGE_KEY = 'recetas_pana_rossi_data';

// Recetas precargadas representativas del pastelero Agustin Perez Rossi
const DEFAULT_RECIPES = [
  {
    id: 'receta-1',
    title: 'Medialunas de Manteca Esponjosas',
    category: 'Dulce',
    prepTime: 60,
    servings: 12,
    ingredients: [
      '500g harina 0000',
      '20g levadura fresca',
      '100g azúcar',
      '250g manteca para el empaste',
      '200ml leche tibia',
      '1 huevo para pintar',
      'Almíbar para el brillo final'
    ],
    steps: [
      'Disolver la levadura con un chorrito de leche tibia y una cucharada de azúcar.',
      'Amasar los ingredientes de la masa hasta lograr un bollo liso y dejar levar 30 minutos.',
      'Empastar con la manteca fría realizando 3 vueltas simples con descanso en heladera entre cada una.',
      'Estirar, cortar triángulos, enrollar y dar forma de medialuna en placa enmantecada.',
      'Hornear a 200°C durante 15-20 minutos hasta que estén doradas. Pintar con almíbar caliente.'
    ],
    createdAt: new Date('2026-09-07T10:00:00.000Z').toISOString()
  },
  {
    id: 'receta-2',
    title: 'Focaccia Clásica al Romero y Oliva',
    category: 'Salado',
    prepTime: 40,
    servings: 6,
    ingredients: [
      '500g harina 000',
      '380ml agua tibia (alta hidratación)',
      '10g levadura seca',
      '50ml aceite de oliva extra virgen',
      'Romero fresco y sal marina gruesa'
    ],
    steps: [
      'Mezclar harina, agua y levadura sin amasar demasiado hasta integrar.',
      'Realizar pliegues cada 30 minutos por 2 horas en un recipiente aceitado.',
      'Volcar en asadera, hacer los hoyuelos con los dedos bañados en aceite de oliva.',
      'Espolvorear romero fresco y sal marina. Hornear a 220°C por 25 minutos.'
    ],
    createdAt: new Date('2026-09-07T11:00:00.000Z').toISOString()
  },
  {
    id: 'receta-3',
    title: 'Brownie Vegano con Nueces Pecan',
    category: 'Vegano',
    prepTime: 35,
    servings: 8,
    ingredients: [
      '200g chocolate amargo 70%',
      '1 palta madura procesada (reemplazo de materia grasa)',
      '150g harina de avena',
      '100g azúcar mascabo',
      '80g nueces pecan picadas'
    ],
    steps: [
      'Fundir el chocolate a baño maría.',
      'Mezclar el chocolate fundido con la palta procesada hasta obtener una crema suave.',
      'Añadir la harina de avena, azúcar y nueces con movimientos envolventes.',
      'Hornear en molde forrado a 180°C durante 22 minutos. Dejar enfriar antes de cortar.'
    ],
    createdAt: new Date('2026-09-07T12:00:00.000Z').toISOString()
  }
];

// Obtener recetas almacenadas o inicializar con las default
function getRecipes() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    saveRecipes(DEFAULT_RECIPES);
    return DEFAULT_RECIPES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('Error parseando recetas de localStorage', e);
    return DEFAULT_RECIPES;
  }
}

// Guardar lista en localStorage
function saveRecipes(recipes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

// Renderizar recetas en el catálogo principal
function renderCatalog() {
  const grid = document.getElementById('recipes-grid');
  const counter = document.getElementById('recipes-counter');
  if (!grid) return;

  const recipes = getRecipes();
  counter.textContent = `${recipes.length} ${recipes.length === 1 ? 'receta disponible' : 'recetas disponibles en la comunidad'}`;

  if (recipes.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1; text-align: center; padding: 40px;">
        <p style="font-size: 1.2rem; color: #666;">No hay recetas publicadas todavía.</p>
        <button class="btn btn-primary" style="margin-top: 12px;" onclick="openCreateModal()">Publicar la primera receta</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = recipes.map(recipe => {
    const ingredientsList = Array.isArray(recipe.ingredients) 
      ? recipe.ingredients.join(', ') 
      : recipe.ingredients;

    return `
      <article class="recipe-card" id="card-${recipe.id}">
        <div class="card-header-badge">
          <span class="badge-category ${escapeHtml(recipe.category)}">${escapeHtml(recipe.category)}</span>
          <span style="font-size: 0.8rem; color: #888;">⏱ ${recipe.prepTime || 30} min</span>
        </div>
        <div class="recipe-card-content">
          <h4 class="card-recipe-title">${escapeHtml(recipe.title)}</h4>
          <div class="card-meta">
            <span>🍽 ${recipe.servings || 2} porciones</span>
            <span>📅 ${new Date(recipe.createdAt).toLocaleDateString()}</span>
          </div>
          <p class="card-preview"><strong>Ingredientes:</strong> ${escapeHtml(ingredientsList)}</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-outline" onclick="openDetailModal('${recipe.id}')" style="font-size: 0.85rem; padding: 6px 14px;">Ver Preparación</button>
        </div>
      </article>
    `;
  }).join('');
}

// Validacion de HU-01
// Criterio: Se valida que los campos requeridos (título, ingredientes, pasos) no estén vacíos.
function validateRecipeForm(data) {
  const errors = {};
  
  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'El título de la receta es obligatorio.';
  } else if (data.title.trim().length < 3) {
    errors.title = 'El título debe tener al menos 3 caracteres.';
  }

  if (!data.ingredients || data.ingredients.trim().length === 0) {
    errors.ingredients = 'Debe indicar al menos un ingrediente.';
  }

  if (!data.steps || data.steps.trim().length === 0) {
    errors.steps = 'Debe detallar los pasos de preparación.';
  }

  return errors;
}

// Manejar envio del formulario de creacion
function handleFormSubmit(event) {
  event.preventDefault();

  const titleInput = document.getElementById('recipe-title');
  const categoryInput = document.getElementById('recipe-category');
  const timeInput = document.getElementById('recipe-time');
  const servingsInput = document.getElementById('recipe-servings');
  const ingredientsInput = document.getElementById('recipe-ingredients');
  const stepsInput = document.getElementById('recipe-steps');

  // Limpiar errores visuales
  document.getElementById('error-title').textContent = '';
  document.getElementById('error-ingredients').textContent = '';
  document.getElementById('error-steps').textContent = '';

  const formData = {
    title: titleInput.value,
    category: categoryInput.value,
    prepTime: parseInt(timeInput.value, 10) || 30,
    servings: parseInt(servingsInput.value, 10) || 2,
    ingredients: ingredientsInput.value,
    steps: stepsInput.value
  };

  const validationErrors = validateRecipeForm(formData);

  if (Object.keys(validationErrors).length > 0) {
    if (validationErrors.title) document.getElementById('error-title').textContent = validationErrors.title;
    if (validationErrors.ingredients) document.getElementById('error-ingredients').textContent = validationErrors.ingredients;
    if (validationErrors.steps) document.getElementById('error-steps').textContent = validationErrors.steps;
    return;
  }

  // Parsear ingredientes y pasos
  const ingredientsArr = formData.ingredients
    .split('\n')
    .map(i => i.trim())
    .filter(i => i.length > 0);

  const stepsArr = formData.steps
    .split('\n')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  const newRecipe = {
    id: 'receta-' + Date.now(),
    title: formData.title.trim(),
    category: formData.category,
    prepTime: formData.prepTime,
    servings: formData.servings,
    ingredients: ingredientsArr,
    steps: stepsArr,
    createdAt: new Date().toISOString()
  };

  // Guardar y publicar (Criterio: Una vez guardada, la receta se publica y queda accesible en el catálogo)
  const allRecipes = getRecipes();
  allRecipes.unshift(newRecipe);
  saveRecipes(allRecipes);

  // Cerrar modal, resetear formulario y actualizar catalogo
  closeCreateModal();
  document.getElementById('recipe-form').reset();
  renderCatalog();
  showToast(`¡"${newRecipe.title}" se publicó exitosamente en el catálogo! 🎉`);
}

// Modales
function openCreateModal() {
  document.getElementById('recipe-modal').style.display = 'flex';
  document.getElementById('recipe-title').focus();
}

function closeCreateModal() {
  document.getElementById('recipe-modal').style.display = 'none';
  document.getElementById('error-title').textContent = '';
  document.getElementById('error-ingredients').textContent = '';
  document.getElementById('error-steps').textContent = '';
}

function openDetailModal(recipeId) {
  const recipes = getRecipes();
  const recipe = recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  document.getElementById('detail-title').textContent = recipe.title;
  const body = document.getElementById('detail-body');

  const ingredientsHtml = Array.isArray(recipe.ingredients)
    ? recipe.ingredients.map(ing => `<li>${escapeHtml(ing)}</li>`).join('')
    : `<li>${escapeHtml(recipe.ingredients)}</li>`;

  const stepsHtml = Array.isArray(recipe.steps)
    ? recipe.steps.map(st => `<li>${escapeHtml(st)}</li>`).join('')
    : `<li>${escapeHtml(recipe.steps)}</li>`;

  body.innerHTML = `
    <div style="display: flex; gap: 10px; margin-bottom: 16px;">
      <span class="badge-category ${escapeHtml(recipe.category)}">${escapeHtml(recipe.category)}</span>
      <span>⏱ ${recipe.prepTime || 30} minutos</span>
      <span>🍽 ${recipe.servings || 2} porciones</span>
    </div>

    <h4 class="detail-section-title">Ingredientes</h4>
    <ul class="detail-list">${ingredientsHtml}</ul>

    <h4 class="detail-section-title">Pasos de Preparación</h4>
    <ol class="detail-list">${stepsHtml}</ol>
  `;

  document.getElementById('detail-modal').style.display = 'flex';
}

function closeDetailModal() {
  document.getElementById('detail-modal').style.display = 'none';
}

function showToast(message) {
  const toast = document.getElementById('toast-message');
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 4000);
}

function showCatalogView() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Inicializar catálogo al cargar
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
});
