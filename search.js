/**
 * RecetasPanaRossi - Módulo de Búsqueda por Palabra Clave e Ingredientes (HU-02 / RF-01)
 */

function searchRecipes(recipes, query) {
  if (!Array.isArray(recipes)) return [];
  if (!query || typeof query !== 'string') return [...recipes];

  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery.length === 0) return [...recipes];

  return recipes.filter(recipe => {
    // Coincidencia en título
    const titleMatch = recipe.title && recipe.title.toLowerCase().includes(normalizedQuery);

    // Coincidencia en ingredientes
    const ingredientsMatch = Array.isArray(recipe.ingredients) && recipe.ingredients.some(ing =>
      ing.toLowerCase().includes(normalizedQuery)
    );

    return titleMatch || ingredientsMatch;
  });
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    searchRecipes
  };
}
