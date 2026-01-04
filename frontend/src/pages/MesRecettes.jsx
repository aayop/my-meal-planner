import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Composant Navbar avec navigation fonctionnelle
function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-slate-900/50 backdrop-blur-sm border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🍽️</span>
                        <span className="text-xl font-bold text-white">MealPlanner</span>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/home')}
                            className={`px-3 py-2 rounded-lg transition-colors ${isActive('/home')
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/70 hover:text-white'
                                }`}
                        >
                            🎯 Générateur
                        </button>
                        <button
                            onClick={() => navigate('/mes-menus')}
                            className={`px-3 py-2 rounded-lg transition-colors ${isActive('/mes-menus')
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/70 hover:text-white'
                                }`}
                        >
                            📚 Mes menus
                        </button>
                        <button
                            onClick={() => navigate('/courses')}
                            className={`px-3 py-2 rounded-lg transition-colors ${isActive('/courses')
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/70 hover:text-white'
                                }`}
                        >
                            🛒 Courses
                        </button>
                        <button
                            onClick={() => navigate('/mes-recettes')}
                            className={`px-3 py-2 rounded-lg transition-colors ${isActive('/mes-recettes')
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/70 hover:text-white'
                                }`}
                        >
                            👨‍🍳 Mes recettes
                        </button>
                        <button
                            onClick={() => navigate('/profil')}
                            className={`px-3 py-2 rounded-lg transition-colors ${isActive('/profil')
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/70 hover:text-white'
                                }`}
                        >
                            👤 Mon profil
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default function MesRecettes() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTime, setFilterTime] = useState("tous");
    const [filterDifficulty, setFilterDifficulty] = useState("tous");
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [recettes, setRecettes] = useState([
        {
            id: 1,
            name: "Tajine de poulet aux olives",
            image: "🍲",
            time: 45,
            difficulty: "Facile",
            servings: 4,
            rating: 4.5,
            favorite: true,
            category: "Plat principal",
            ingredients: ["1 poulet entier", "200g d'olives vertes", "2 oignons", "3 tomates", "Coriandre fraîche", "Huile d'olive", "Sel, poivre, curcuma"],
            steps: [
                "Faire revenir les oignons dans l'huile d'olive",
                "Ajouter le poulet et les épices",
                "Incorporer les tomates et olives",
                "Laisser mijoter 35 minutes",
                "Servir avec de la coriandre fraîche"
            ]
        },
        {
            id: 2,
            name: "Salade César",
            image: "🥗",
            time: 15,
            difficulty: "Facile",
            servings: 2,
            rating: 4.2,
            favorite: false,
            category: "Entrée",
            ingredients: ["Laitue romaine", "Croûtons", "Parmesan", "Sauce César", "Blanc de poulet grillé"],
            steps: [
                "Laver et couper la laitue",
                "Ajouter les croûtons et le parmesan",
                "Incorporer le poulet grillé",
                "Napper de sauce César",
                "Servir immédiatement"
            ]
        },
        {
            id: 3,
            name: "Pâtes Carbonara",
            image: "🍝",
            time: 20,
            difficulty: "Moyen",
            servings: 4,
            rating: 4.8,
            favorite: true,
            category: "Plat principal",
            ingredients: ["400g de pâtes", "200g de lardons", "2 œufs", "50g de parmesan", "Crème fraîche", "Poivre"],
            steps: [
                "Faire cuire les pâtes",
                "Faire revenir les lardons",
                "Mélanger œufs, parmesan et crème",
                "Incorporer aux pâtes chaudes",
                "Servir avec du poivre"
            ]
        }
    ]);

    const toggleFavorite = (id) => {
        setRecettes(recettes.map(r => r.id === id ? { ...r, favorite: !r.favorite } : r));
    };

    if (selectedRecipe) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
                <Navbar />
                <main className="max-w-6xl mx-auto px-6 py-12">
                    <div className="space-y-6">
                        <button
                            onClick={() => setSelectedRecipe(null)}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                            ← Retour aux recettes
                        </button>

                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                            <div className="text-center mb-8">
                                <div className="text-8xl mb-4">{selectedRecipe.image}</div>
                                <h1 className="text-3xl font-bold text-white mb-2">{selectedRecipe.name}</h1>
                                <div className="flex justify-center gap-4 text-white/70">
                                    <span>⏱️ {selectedRecipe.time} min</span>
                                    <span>👥 {selectedRecipe.servings} pers.</span>
                                    <span>📊 {selectedRecipe.difficulty}</span>
                                    <span>⭐ {selectedRecipe.rating}/5</span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">🥕 Ingrédients</h3>
                                    <ul className="space-y-2">
                                        {selectedRecipe.ingredients.map((ing, i) => (
                                            <li key={i} className="flex items-center gap-3 text-white/80">
                                                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                                                {ing}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">👨‍🍳 Instructions</h3>
                                    <ol className="space-y-3">
                                        {selectedRecipe.steps.map((step, i) => (
                                            <li key={i} className="flex gap-3 text-white/80">
                                                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                    {i + 1}
                                                </span>
                                                {step}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    const filteredRecipes = recettes.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTime = filterTime === "tous" || (filterTime === "rapide" && r.time <= 30) || (filterTime === "moyen" && r.time <= 60) || (filterTime === "long" && r.time > 60);
        const matchesDifficulty = filterDifficulty === "tous" || r.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
        return matchesSearch && matchesTime && matchesDifficulty;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
                {/* Header */}
                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        👨‍🍳 Mes Recettes
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Découvrez et cuisinez vos recettes préférées
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-white/50">🔎</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Rechercher une recette..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                                />
                            </div>
                        </div>
                        <select
                            value={filterTime}
                            onChange={e => setFilterTime(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                        >
                            <option value="tous" className="bg-slate-800">Tous les temps</option>
                            <option value="rapide" className="bg-slate-800">⏱️ Rapide (≤30min)</option>
                            <option value="moyen" className="bg-slate-800">🕐 Moyen (≤60min)</option>
                            <option value="long" className="bg-slate-800">⏳ Long ({'>'}60min)</option>
                        </select>
                        <select
                            value={filterDifficulty}
                            onChange={e => setFilterDifficulty(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                        >
                            <option value="tous" className="bg-slate-800">Toutes difficultés</option>
                            <option value="facile" className="bg-slate-800">🟢 Facile</option>
                            <option value="moyen" className="bg-slate-800">🟡 Moyen</option>
                            <option value="difficile" className="bg-slate-800">🔴 Difficile</option>
                        </select>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl">📊</div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{recettes.length}</h3>
                                <p className="text-white/70">Recettes au total</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl">⭐</div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{recettes.filter(r => r.favorite).length}</h3>
                                <p className="text-white/70">Favoris</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recipes Grid */}
                <div className="grid gap-6">
                    {filteredRecipes.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🍳</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Aucune recette trouvée</h3>
                            <p className="text-white/70">Essayez de modifier vos critères de recherche</p>
                        </div>
                    ) : (
                        filteredRecipes.map(r => (
                            <div key={r.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="text-4xl">{r.image}</div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-white">{r.name}</h3>
                                            <p className="text-white/60 text-sm capitalize">{r.category}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleFavorite(r.id)}
                                        className={`text-2xl transition-colors ${r.favorite ? 'text-red-400' : 'text-white/50 hover:text-red-400'}`}
                                    >
                                        ❤️
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                                        ⏱️ {r.time} min
                                    </span>
                                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                                        👥 {r.servings} pers.
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm ${r.difficulty === 'Facile' ? 'bg-green-500/20 text-green-300' :
                                            r.difficulty === 'Moyen' ? 'bg-yellow-500/20 text-yellow-300' :
                                                'bg-red-500/20 text-red-300'
                                        }`}>
                                        📊 {r.difficulty}
                                    </span>
                                    <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                                        ⭐ {r.rating}/5
                                    </span>
                                </div>

                                <button
                                    onClick={() => setSelectedRecipe(r)}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors w-full"
                                >
                                    👁️ Voir la recette
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}