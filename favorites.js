/**
 * RecetasPanaRossi - Módulo de Favoritos (HU-03 / RF-01)
 */

const FAVORITES_STORAGE_KEY = 'recetas_pana_rossi_favorites_v1';

class FavoriteStore {
  constructor() {
    this.favSet = new Set();
    this.init();
  }

  init() {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (data) {
        try {
          const list = JSON.parse(data);
          this.favSet = new Set(list);
        } catch (e) {
          this.favSet = new Set();
        }
      }
    }
  }

  isFavorite(recipeId) {
    if (!recipeId) return false;
    return this.favSet.has(recipeId);
  }

  toggleFavorite(recipeId) {
    if (!recipeId) return false;

    if (this.favSet.has(recipeId)) {
      this.favSet.delete(recipeId);
    } else {
      this.favSet.add(recipeId);
    }

    this._save();
    return this.isFavorite(recipeId);
  }

  getFavoriteIds() {
    return Array.from(this.favSet);
  }

  _save() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(this.favSet)));
    }
  }

  clear() {
    this.favSet.clear();
    this._save();
  }
}

const favoriteStore = new FavoriteStore();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FavoriteStore,
    favoriteStore
  };
}
