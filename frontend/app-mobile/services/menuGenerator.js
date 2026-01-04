import { recipes } from './recipes.js';

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Select a recipe for a meal type matching diet. Falls back to any matching meal if no exact diet match.
function pickRecipe(mealType, diet, excludeIds = [], prevId = null) {
  // prevId: id of same meal on previous day to avoid consecutive repeat
  const candidates = recipes.filter(r => r.meal === mealType && (diet === 'normal' || r.tags.includes(diet)) && !excludeIds.includes(r.id) && r.id !== prevId);
  if (candidates.length) return sample(candidates);
  // fallback: any recipe for mealType not in exclude and not prev
  const fallback = recipes.filter(r => r.meal === mealType && !excludeIds.includes(r.id) && r.id !== prevId);
  if (fallback.length) return sample(fallback);
  // final fallback: allow repeats (including prev)
  return sample(recipes.filter(r => r.meal === mealType));
}

// Generate a weekly menu (days default 7)
// options: { budget, diet, days, avoidRepeats (bool), strictBudget (bool) }
export function generateWeeklyMenu({ budget = 50, diet = 'normal', days = 7, avoidRepeats = true, strictBudget = false }) {
  // goal: try to make each day cost approx budget
  const menus = [];
  const usedIds = new Set();

  let prevBreakfastId = null;
  let prevLunchId = null;
  let prevDinnerId = null;

  for (let i = 0; i < days; i++) {
    // if avoidRepeats, pass usedIds to pickers and avoid previous day's same meal
    let breakfast = pickRecipe('breakfast', diet, avoidRepeats ? Array.from(usedIds) : [], prevBreakfastId);
    if (avoidRepeats) usedIds.add(breakfast.id);

    let lunch = pickRecipe('lunch', diet, avoidRepeats ? Array.from(usedIds) : [], prevLunchId);
    if (avoidRepeats) usedIds.add(lunch.id);

    let dinner = pickRecipe('dinner', diet, avoidRepeats ? Array.from(usedIds) : [], prevDinnerId);
    if (avoidRepeats) usedIds.add(dinner.id);

    prevBreakfastId = breakfast.id;
    prevLunchId = lunch.id;
    prevDinnerId = dinner.id;

    let dayCost = breakfast.cost + lunch.cost + dinner.cost;

    // Budget tuning: try to reduce cost if strictBudget is true
    let attempts = 0;
    while ((strictBudget ? dayCost > budget : dayCost > budget * 1.4) && attempts < 8) {
      // replace the most expensive meal with cheaper candidate that respects diet & avoidRepeats
      const arr = [ {k: 'breakfast', v: breakfast}, {k: 'lunch', v: lunch}, {k: 'dinner', v: dinner} ];
      arr.sort((a,b)=>b.v.cost-a.v.cost); // desc
      const expensive = arr[0];

      // find cheaper candidates not in usedIds if avoidRepeats
      let cheaper = recipes.filter(r => r.meal === expensive.k && r.cost <= expensive.v.cost * 0.85 && (diet === 'normal' || r.tags.includes(diet)) && (!avoidRepeats || !usedIds.has(r.id)));

      // If strictBudget and no cheaper, broaden search to any cheaper by up to 15%
      if (strictBudget && !cheaper.length) {
        cheaper = recipes.filter(r => r.meal === expensive.k && r.cost <= expensive.v.cost * 0.95 && (diet === 'normal' || r.tags.includes(diet)) && (!avoidRepeats || !usedIds.has(r.id)));
      }

      if (cheaper.length) {
        const pick = sample(cheaper);
        if (expensive.k === 'breakfast') breakfast = pick;
        if (expensive.k === 'lunch') lunch = pick;
        if (expensive.k === 'dinner') dinner = pick;
        if (avoidRepeats) usedIds.add(pick.id);
      } else {
        // final attempt: pick any cheaper meal even if it violates avoidRepeats
        const anyCheaper = recipes.filter(r => r.meal === expensive.k && r.cost < expensive.v.cost && (diet === 'normal' || r.tags.includes(diet)));
        if (anyCheaper.length) {
          const pick = sample(anyCheaper);
          if (expensive.k === 'breakfast') breakfast = pick;
          if (expensive.k === 'lunch') lunch = pick;
          if (expensive.k === 'dinner') dinner = pick;
        }
      }

      attempts++;
      dayCost = breakfast.cost + lunch.cost + dinner.cost;
    }

    menus.push({
      day: `Day ${i + 1}`,
      meals: [
        { name: breakfast.name, cost: breakfast.cost, calories: breakfast.calories, id: breakfast.id },
        { name: lunch.name, cost: lunch.cost, calories: lunch.calories, id: lunch.id },
        { name: dinner.name, cost: dinner.cost, calories: dinner.calories, id: dinner.id },
      ],
      totalCost: breakfast.cost + lunch.cost + dinner.cost,
      totalCalories: (breakfast.calories || 0) + (lunch.calories || 0) + (dinner.calories || 0),
    });
  }

  // compute summary
  const avg = Math.round(menus.reduce((s,m) => s + m.totalCost, 0) / menus.length);

  return {
    days: menus,
    averageDailyCost: avg,
    diet,
    avoidRepeats,
    strictBudget,
    generatedAt: new Date().toISOString(),
  };
}
