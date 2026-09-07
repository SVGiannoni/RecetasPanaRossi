/**
 * RecetasPanaRossi - Módulo de Búsqueda y Filtrado por Categoría (HU-02 / RF-01 & RF-02)
 */

function filterRecipes(recipes, options = {}) {
  if (!Array.isArray(recipes)) return [];

  const { search = '', category = '' } = options;

  const normalizedSearch = (search || '').trim().toLowerCase();
  const selectedCategory = (category || '').trim();

  return recipes.filter(recipe => {
    // 1. Filtrado por categoría (si se seleccionó una distinta de 'Todas' o vacía)
    if (selectedCategory && selectedCategory !== 'Todas') {
      if (!recipe.category || recipe.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
    }

    // 2. Filtrado por búsqueda en título / ingredientes
    if (normalizedSearch.length > 0) {
      const titleMatch = recipe.title && recipe.title.toLowerCase().includes(normalizedSearch);
      const ingredientsMatch = Array.isArray(recipe.ingredients) && recipe.ingredients.some(ing =>
        ing.toLowerCase().includes(normalizedSearch)
      );
      if (!titleMatch && !ingredientsMatch) {
        return false;
      }
    }

    return true;
  });
}

function searchRecipes(recipes, query) {
  return filterRecipes(recipes, { search: query });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    filterRecipes,
    searchRecipes
  };
}
