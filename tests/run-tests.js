/**
 * Suite de Pruebas Unitarias para Formulario de Alta y Validación de Recetas (RF-01)
 */

const assert = require('assert');
const { validateRecipe, parseList } = require('../app.js');

let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ PASÓ: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FALLÓ: ${name}`);
    console.error(`    Error: ${err.message}`);
    failedTests++;
  }
}

console.log('--- Corriendo Pruebas Unitarias para RF-01 (Formulario de Recetas) ---');

test('Validación exitosa con datos completos y válidos', () => {
  const validData = {
    title: '  Tarta Tatin de Manzana  ',
    category: 'Repostería',
    prepTime: '60',
    servings: '8',
    ingredients: '200g harina\n100g manteca\n4 manzanas',
    steps: '1. Preparar la masa\n2. Caramelizar manzanas\n3. Hornear 30 min'
  };

  const res = validateRecipe(validData);
  assert.strictEqual(res.isValid, true);
  assert.strictEqual(Object.keys(res.errors).length, 0);
  assert.strictEqual(res.cleanData.title, 'Tarta Tatin de Manzana');
  assert.strictEqual(res.cleanData.category, 'Repostería');
  assert.strictEqual(res.cleanData.prepTime, 60);
  assert.strictEqual(res.cleanData.servings, 8);
  assert.strictEqual(res.cleanData.ingredients.length, 3);
  assert.strictEqual(res.cleanData.steps.length, 3);
});

test('Falla cuando el título está vacío o tiene menos de 3 caracteres', () => {
  const resEmpty = validateRecipe({ title: '   ' });
  assert.strictEqual(resEmpty.isValid, false);
  assert.ok(resEmpty.errors.title);

  const resShort = validateRecipe({ title: 'Ab' });
  assert.strictEqual(resShort.isValid, false);
  assert.ok(resShort.errors.title);
});

test('Falla cuando no se selecciona categoría', () => {
  const res = validateRecipe({ title: 'Receta Válida', category: '' });
  assert.strictEqual(res.isValid, false);
  assert.ok(res.errors.category);
});

test('Falla cuando el tiempo de preparación es inválido o menor o igual a cero', () => {
  const resZero = validateRecipe({ title: 'Receta Válida', category: 'Dulce', prepTime: '0' });
  assert.strictEqual(resZero.isValid, false);
  assert.ok(resZero.errors.prepTime);

  const resAlpha = validateRecipe({ title: 'Receta Válida', category: 'Dulce', prepTime: 'abc' });
  assert.strictEqual(resAlpha.isValid, false);
  assert.ok(resAlpha.errors.prepTime);
});

test('Falla cuando las porciones son menores o iguales a cero', () => {
  const resZero = validateRecipe({ title: 'Receta Válida', category: 'Dulce', prepTime: '30', servings: '-2' });
  assert.strictEqual(resZero.isValid, false);
  assert.ok(resZero.errors.servings);
});

test('Falla cuando no hay ingredientes válidos', () => {
  const res = validateRecipe({
    title: 'Receta Válida',
    category: 'Dulce',
    prepTime: '30',
    servings: '4',
    ingredients: '   \n  \n  '
  });
  assert.strictEqual(res.isValid, false);
  assert.ok(res.errors.ingredients);
});

test('Falla cuando no hay pasos de preparación válidos', () => {
  const res = validateRecipe({
    title: 'Receta Válida',
    category: 'Dulce',
    prepTime: '30',
    servings: '4',
    ingredients: 'Ingrediente 1',
    steps: ''
  });
  assert.strictEqual(res.isValid, false);
  assert.ok(res.errors.steps);
});

test('parseList ignora líneas en blanco y aplica trim', () => {
  const input = '  Paso 1 \n\n  Paso 2   \n ';
  const result = parseList(input);
  assert.deepStrictEqual(result, ['Paso 1', 'Paso 2']);
});

console.log('\n--- Resumen de Pruebas ---');
console.log(`Pasadas: ${passedTests}`);
console.log(`Falladas: ${failedTests}`);

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('¡Todas las pruebas unitarias pasaron correctamente!\n');
}
