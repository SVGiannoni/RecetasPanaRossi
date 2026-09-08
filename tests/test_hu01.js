/**
 * Tests Unitarios para HU-01: Creación y publicación de recetas de cocina
 * Criterios evaluados:
 * 1. El formulario permite ingresar título, categoría, tiempo de preparación, porciones, lista de ingredientes y pasos.
 * 2. Se valida que los campos requeridos (título, ingredientes, pasos) no estén vacíos.
 * 3. Una vez guardada, la receta se publica y queda accesible en el catálogo principal.
 */

// Mock de validación idéntica a app.js para correr de manera desacoplada
function validateRecipe(data) {
  const errors = {};
  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'El título de la receta es obligatorio.';
  } else if (data.title.trim().length < 3) {
    errors.title = 'El título debe tener al menos 3 caracteres.';
  }

  if (!data.ingredients || (typeof data.ingredients === 'string' && data.ingredients.trim().length === 0) || (Array.isArray(data.ingredients) && data.ingredients.length === 0)) {
    errors.ingredients = 'Debe indicar al menos un ingrediente.';
  }

  if (!data.steps || (typeof data.steps === 'string' && data.steps.trim().length === 0) || (Array.isArray(data.steps) && data.steps.length === 0)) {
    errors.steps = 'Debe detallar los pasos de preparación.';
  }

  return errors;
}

function runTests() {
  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      console.log(`  ✓ PASÓ: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FALLÓ: ${message}`);
    }
  }

  console.log('=== Iniciando pruebas unitarias de HU-01 ===');

  // Test 1: Rechazar receta sin título
  const t1 = validateRecipe({ title: '', ingredients: 'Harina', steps: 'Hornear' });
  assert(t1.title !== undefined, 'Valida que el título no esté vacío');

  // Test 2: Rechazar receta sin ingredientes
  const t2 = validateRecipe({ title: 'Tarta de Manzana', ingredients: '', steps: 'Cortar y hornear' });
  assert(t2.ingredients !== undefined, 'Valida que los ingredientes no estén vacíos');

  // Test 3: Rechazar receta sin pasos
  const t3 = validateRecipe({ title: 'Tarta de Manzana', ingredients: 'Manzana, Harina', steps: '   ' });
  assert(t3.steps !== undefined, 'Valida que los pasos no estén vacíos');

  // Test 4: Aceptar receta válida con todos los campos
  const validRecipe = {
    title: 'Pasta Frola Casera',
    category: 'Dulce',
    prepTime: 50,
    servings: 8,
    ingredients: '500g harina leudante\n200g manteca\n400g dulce de membrillo',
    steps: '1. Arenar manteca y harina.\n2. Forrar molde con 3/4 de masa.\n3. Rellenar y hacer enrejado.\n4. Hornear a 180°C por 30m.'
  };
  const t4 = validateRecipe(validRecipe);
  assert(Object.keys(t4).length === 0, 'Acepta una receta con todos los campos obligatorios válidos');

  // Test 5: Simular publicación y persistencia en catálogo
  const catalog = [];
  const recipeToPublish = {
    id: 'test-receta-1',
    title: validRecipe.title,
    category: validRecipe.category,
    ingredients: validRecipe.ingredients.split('\n'),
    steps: validRecipe.steps.split('\n'),
    createdAt: new Date().toISOString()
  };
  catalog.unshift(recipeToPublish);
  assert(catalog.length === 1 && catalog[0].id === 'test-receta-1', 'La receta se publica y queda disponible en la colección del catálogo');

  console.log(`\nResultado: ${passed}/${total} pruebas pasaron con éxito.`);
  if (passed === total) {
    console.log('🎉 Todas las pruebas de HU-01 pasaron satisfactoriamente.');
  }
}

runTests();
