// Simple recipe dataset with diet tags, approximate cost per serving (MAD), and an image URL from Unsplash for polished UI.
// Add or refine items as needed.
const unsplashFor = (q) => `https://source.unsplash.com/600x400/?${encodeURIComponent(q)}`;

export const recipes = [
  { id: 'r1', name: 'Omelette', tags: ['normal','economique','sport'], cost: 12, calories: 320, meal: 'breakfast', image: unsplashFor('omelette'), ingredients: [{ name: 'Eggs', qty: 2, unit: 'pcs' }, { name: 'Milk', qty: 30, unit: 'ml' }, { name: 'Salt', qty: 0.5, unit: 'tsp' }] },
  { id: 'r2', name: 'Pancakes', tags: ['normal','vegetarien'], cost: 15, calories: 450, meal: 'breakfast', image: unsplashFor('pancakes'), ingredients: [{ name: 'Flour', qty: 100, unit: 'g' }, { name: 'Milk', qty: 150, unit: 'ml' }, { name: 'Eggs', qty: 1, unit: 'pcs' }] },
  { id: 'r3', name: 'Smoothie Bowl', tags: ['vegetarien','sport'], cost: 18, calories: 380, meal: 'breakfast', image: unsplashFor('smoothie'), ingredients: [{ name: 'Banana', qty: 1, unit: 'pcs' }, { name: 'Berries', qty: 80, unit: 'g' }, { name: 'Yogurt', qty: 120, unit: 'g' }] },
  { id: 'r4', name: 'Yogurt & Fruit', tags: ['diabetique','vegetarien','normal'], cost: 10, calories: 200, meal: 'breakfast', image: unsplashFor('yogurt-fruit'), ingredients: [{ name: 'Yogurt', qty: 150, unit: 'g' }, { name: 'Mixed Fruit', qty: 100, unit: 'g' }] },

  { id: 'r5', name: 'Tomato Soup', tags: ['economique','vegetarien','diabetique'], cost: 25, calories: 180, meal: 'lunch', image: unsplashFor('tomato-soup'), ingredients: [{ name: 'Tomatoes', qty: 2, unit: 'pcs' }, { name: 'Onion', qty: 0.5, unit: 'pcs' }, { name: 'Garlic', qty: 1, unit: 'clove' }] },
  { id: 'r6', name: 'Grilled Chicken Salad', tags: ['normal','sport','diabetique'], cost: 40, calories: 380, meal: 'lunch', image: unsplashFor('grilled-chicken-salad'), ingredients: [{ name: 'Chicken Breast', qty: 150, unit: 'g' }, { name: 'Lettuce', qty: 80, unit: 'g' }, { name: 'Tomato', qty: 1, unit: 'pcs' }] },
  { id: 'r7', name: 'Pasta Primavera', tags: ['normal','vegetarien'], cost: 35, calories: 540, meal: 'lunch', image: unsplashFor('pasta-primavera'), ingredients: [{ name: 'Pasta', qty: 100, unit: 'g' }, { name: 'Zucchini', qty: 1, unit: 'pcs' }, { name: 'Tomato', qty: 1, unit: 'pcs' }] },
  { id: 'r8', name: 'Lentil Stew', tags: ['economique','vegetarien'], cost: 28, calories: 360, meal: 'lunch', image: unsplashFor('lentil-stew'), ingredients: [{ name: 'Lentils', qty: 80, unit: 'g' }, { name: 'Carrot', qty: 1, unit: 'pcs' }, { name: 'Onion', qty: 0.5, unit: 'pcs' }] },
  { id: 'r9', name: 'Quinoa Bowl', tags: ['vegetarien','diabetique','sport'], cost: 38, calories: 420, meal: 'lunch', image: unsplashFor('quinoa-bowl'), ingredients: [{ name: 'Quinoa', qty: 80, unit: 'g' }, { name: 'Chickpeas', qty: 80, unit: 'g' }, { name: 'Mixed Veg', qty: 100, unit: 'g' }] },

  { id: 'r10', name: 'Roast Chicken', tags: ['normal','sport'], cost: 60, calories: 650, meal: 'dinner', image: unsplashFor('roast-chicken'), ingredients: [{ name: 'Chicken', qty: 300, unit: 'g' }, { name: 'Potato', qty: 200, unit: 'g' }, { name: 'Carrot', qty: 1, unit: 'pcs' }] },
  { id: 'r11', name: 'Grilled Fish', tags: ['normal','diabetique','sport'], cost: 70, calories: 540, meal: 'dinner', image: unsplashFor('grilled-fish'), ingredients: [{ name: 'Fish Fillet', qty: 200, unit: 'g' }, { name: 'Lemon', qty: 0.5, unit: 'pcs' }] },
  { id: 'r12', name: 'Vegetable Curry', tags: ['vegetarien','economique'], cost: 40, calories: 510, meal: 'dinner', image: unsplashFor('vegetable-curry'), ingredients: [{ name: 'Mixed Veg', qty: 200, unit: 'g' }, { name: 'Coconut Milk', qty: 100, unit: 'ml' }] },
  { id: 'r13', name: 'Tofu Stir Fry', tags: ['vegetarien','diabetique'], cost: 45, calories: 420, meal: 'dinner', image: unsplashFor('tofu-stir-fry'), ingredients: [{ name: 'Tofu', qty: 150, unit: 'g' }, { name: 'Soy Sauce', qty: 10, unit: 'ml' }] },
  { id: 'r14', name: 'Bean Tacos', tags: ['economique','vegetarien'], cost: 30, calories: 480, meal: 'dinner', image: unsplashFor('bean-tacos'), ingredients: [{ name: 'Tortillas', qty: 2, unit: 'pcs' }, { name: 'Black Beans', qty: 120, unit: 'g' }, { name: 'Cheese', qty: 30, unit: 'g' }] },

  // More economical/snack items
  { id: 'r15', name: 'Rice & Beans', tags: ['economique','vegetarien'], cost: 22, calories: 400, meal: 'lunch', image: unsplashFor('rice-and-beans') },
  { id: 'r16', name: 'Egg Salad', tags: ['normal','economique','diabetique'], cost: 18, calories: 280, meal: 'lunch', image: unsplashFor('egg-salad') },

  // Variations and extras
  { id: 'r17', name: 'Steak & Veg', tags: ['normal','sport'], cost: 85, calories: 750, meal: 'dinner', image: unsplashFor('steak-and-veg') },
  { id: 'r18', name: 'Shrimp Pasta', tags: ['normal'], cost: 75, calories: 620, meal: 'dinner', image: unsplashFor('shrimp-pasta') },
  { id: 'r19', name: 'Veggie Burger', tags: ['vegetarien','normal'], cost: 42, calories: 520, meal: 'lunch', image: unsplashFor('veggie-burger') },
  { id: 'r20', name: 'Porridge', tags: ['diabetique','economique'], cost: 10, calories: 250, meal: 'breakfast', image: unsplashFor('porridge') },

  // Add more to improve variety
  { id: 'r21', name: 'Greek Salad', tags: ['vegetarien','diabetique'], cost: 32, calories: 300, meal: 'lunch', image: unsplashFor('greek-salad') },
  { id: 'r22', name: 'Couscous Vegetables', tags: ['normal','vegetarien','economique'], cost: 34, calories: 450, meal: 'dinner', image: unsplashFor('couscous-vegetables') },
  { id: 'r23', name: 'Chicken Wrap', tags: ['normal','economique'], cost: 28, calories: 420, meal: 'lunch', image: unsplashFor('chicken-wrap') },
  { id: 'r24', name: 'Baked Salmon', tags: ['normal','diabetique'], cost: 90, calories: 560, meal: 'dinner', image: unsplashFor('baked-salmon') },
  { id: 'r25', name: 'Chickpea Salad', tags: ['vegetarien','economique','diabetique'], cost: 26, calories: 320, meal: 'lunch', image: unsplashFor('chickpea-salad') },

  // Additional recipes to increase variety
  { id: 'r26', name: 'Sardine Tagine', tags: ['economique','normal'], cost: 35, calories: 480, meal: 'dinner', image: unsplashFor('sardine-tagine') },
  { id: 'r27', name: 'Vegetable Omelette', tags: ['vegetarien','economique'], cost: 14, calories: 340, meal: 'breakfast', image: unsplashFor('vegetable-omelette') },
  { id: 'r28', name: 'Muesli with Nuts', tags: ['diabetique','vegetarien'], cost: 16, calories: 300, meal: 'breakfast', image: unsplashFor('muesli') },
  { id: 'r29', name: 'Avocado Toast', tags: ['vegetarien','normal'], cost: 20, calories: 360, meal: 'breakfast', image: unsplashFor('avocado-toast') },
  { id: 'r30', name: 'Moroccan Harira', tags: ['economique','vegetarien'], cost: 22, calories: 350, meal: 'lunch', image: unsplashFor('harira') },
  { id: 'r31', name: 'Beef Tagine', tags: ['normal','sport'], cost: 80, calories: 780, meal: 'dinner', image: unsplashFor('beef-tagine') },
  { id: 'r32', name: 'Lentil Salad', tags: ['vegetarien','diabetique','economique'], cost: 18, calories: 280, meal: 'lunch', image: unsplashFor('lentil-salad') },
  { id: 'r33', name: 'Stuffed Peppers', tags: ['vegetarien','normal'], cost: 36, calories: 460, meal: 'dinner', image: unsplashFor('stuffed-peppers') },
  { id: 'r34', name: 'Grilled Vegetables & Halloumi', tags: ['vegetarien'], cost: 42, calories: 430, meal: 'dinner', image: unsplashFor('grilled-vegetables-halloumi') },
  { id: 'r35', name: 'Shakshuka', tags: ['vegetarien','economique'], cost: 24, calories: 320, meal: 'breakfast', image: unsplashFor('shakshuka') },
];
