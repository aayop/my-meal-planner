import { recipes } from './recipes';

// Aggregate ingredients across a menu
export function aggregateIngredients(menu) {
  // menu: { items: [{day, meals: [{id?, name, cost, calories}], totalCost }], ... }
  const map = new Map();

  if (!menu || !menu.items) return [];

  menu.items.forEach((day) => {
    day.meals.forEach((meal) => {
      // find recipe by name
      const recipe = recipes.find(r => r.name === meal.name);
      if (!recipe || !recipe.ingredients) return;

      recipe.ingredients.forEach((ing) => {
        const key = `${ing.name}__${ing.unit || ''}`;
        const current = map.get(key) || { name: ing.name, unit: ing.unit || '', qty: 0 };
        current.qty = +(current.qty + (ing.qty || 0)).toFixed(2);
        map.set(key, current);
      });
    });
  });

  // convert to array and sort alphabetically
  const result = Array.from(map.values()).sort((a,b) => a.name.localeCompare(b.name));
  return result;
}

export function prettyString(ing) {
  if (!ing) return '';
  return `${ing.name} — ${ing.qty} ${ing.unit}`;
}