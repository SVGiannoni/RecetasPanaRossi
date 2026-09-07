/**
 * RecetasPanaRossi - Módulo de Persistencia y Catálogo (RF-02)
 */

const STORAGE_KEY = 'recetas_pana_rossi_catalog_v1';

// Recetas semilla por defecto para el catálogo inicial
const initialRecipes = [
  {
    id: 'REC-1788000000001',
    title: 'Medialunas de Manteca Artesanales',
    category: 'Repostería',
    prepTime: 120,
    servings: 12,
    ingredients: ['500g harina 0000', '250g manteca', '25g levadura fresca', '100g azúcar', '200ml leche entera'],
    steps: ['1. Formar el amasijo y dejar leudar.', '2. Realizar el empaste con la manteca fría.', '3. Dar 3 vueltas simples con descansos de frío.', '4. Cortar los triángulos, enrollar y hornear a 200°C por 15 min.'],
    createdAt: '2026-09-07T10:00:00.000Z',
    published: true
  },
  {
    id: 'REC-1788000000002',
    title: 'Risotto de Hongos Silvestres',
    category: 'Salado',
    prepTime: 35,
    servings: 4,
    ingredients: ['350g arroz carnaroli', '200g hongos portobello', '1l caldo de verduras caliente', '50g queso parmesano', '50g manteca fría'],
    steps: ['1. Saltear los hongos y reservar.', '2. Nacarar el arroz con cebolla en brunoise.', '3. Agregar el caldo hirviendo de a poco revolviendo siempre.', '4. Mantecar con la manteca fría y el parmesano.'],
    createdAt: '2026-09-07T11:30:00.000Z',
    published: true
  }
];

class RecipeStore {
  constructor() {
    this.memoryStore = [];
    this.init();
  }

  init() {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initialRecipes));
        this.memoryStore = [...initialRecipes];
      } else {
        try {
          this.memoryStore = JSON.parse(data);
        } catch (e) {
          this.memoryStore = [...initialRecipes];
        }
      }
    } else {
      this.memoryStore = [...initialRecipes];
    }
  }

  getAll() {
    return [...this.memoryStore];
  }

  getPublished() {
    return this.memoryStore.filter(r => r.published);
  }

  getById(id) {
    return this.memoryStore.find(r => r.id === id) || null;
  }

  saveRecipe(recipeData) {
    const newRecipe = {
      id: 'REC-' + Date.now(),
      title: recipeData.title.trim(),
      category: recipeData.category.trim(),
      prepTime: Number(recipeData.prepTime),
      servings: Number(recipeData.servings),
      ingredients: Array.isArray(recipeData.ingredients) ? recipeData.ingredients : recipeData.ingredients.split('\n').filter(Boolean),
      steps: Array.isArray(recipeData.steps) ? recipeData.steps : recipeData.steps.split('\n').filter(Boolean),
      createdAt: new Date().toISOString(),
      published: true
    };

    this.memoryStore.unshift(newRecipe);

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.memoryStore));
    }

    return newRecipe;
  }

  clearAll() {
    this.memoryStore = [];
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

const recipeStore = new RecipeStore();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RecipeStore,
    recipeStore,
    initialRecipes
  };
}
