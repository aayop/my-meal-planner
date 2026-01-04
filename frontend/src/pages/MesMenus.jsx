import { useState } from "react";
import Navbar from "../Navbar";

export default function MesMenus() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterDiet, setFilterDiet] = useState("tous");
    const [menus, setMenus] = useState([
        { id: 1, date: "2024-12-10", budget: 50, diet: "normal", favorite: true, meals: [{ day: "Lundi", repas: "Poulet rôti, Riz, Salade verte" }, { day: "Mardi", repas: "Spaghetti bolognaise, Pain à l'ail" }] },
        { id: 2, date: "2024-12-03", budget: 70, diet: "végétarien", favorite: false, meals: [{ day: "Lundi", repas: "Couscous végétarien" }] },
    ]);

    const toggleFavorite = (id) => setMenus(menus.map(m => m.id === id ? { ...m, favorite: !m.favorite } : m));
    const deleteMenu = (id) => { if (confirm("Êtes-vous sûr ?")) setMenus(menus.filter(m => m.id !== id)); };
    const exportToPDF = (menu) => alert(`Export du menu du ${menu.date} en PDF (à implémenter)`);

    const filteredMenus = menus.filter(menu => {
        const matchesSearch = menu.meals.some(meal => meal.repas.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesDiet = filterDiet === "tous" || menu.diet === filterDiet;
        return matchesSearch && matchesDiet;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
                {/* Header */}
                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        📚 Mes Menus Sauvegardés
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Retrouvez tous vos menus précédemment générés et organisez vos repas
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-white/50">🔎</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Rechercher un repas..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                                />
                            </div>
                        </div>
                        <div className="md:w-64">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-white/50">⚙️</span>
                                </div>
                                <select
                                    value={filterDiet}
                                    onChange={e => setFilterDiet(e.target.value)}
                                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm appearance-none"
                                >
                                    <option value="tous" className="bg-slate-800">Tous les régimes</option>
                                    <option value="normal" className="bg-slate-800">Normal</option>
                                    <option value="végétarien" className="bg-slate-800">Végétarien</option>
                                    <option value="vegan" className="bg-slate-800">Vegan</option>
                                    <option value="sans-gluten" className="bg-slate-800">Sans gluten</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl">📊</div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{menus.length}</h3>
                                <p className="text-white/70">Menus créés</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 rounded-2xl p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl">⭐</div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{menus.filter(m => m.favorite).length}</h3>
                                <p className="text-white/70">Favoris</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menus Grid */}
                <div className="grid gap-6">
                    {filteredMenus.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🍽️</div>
                            <h3 className="text-xl font-semibold text-white mb-2">Aucun menu trouvé</h3>
                            <p className="text-white/70">Essayez de modifier vos critères de recherche</p>
                        </div>
                    ) : (
                        filteredMenus.map(menu => (
                            <div key={menu.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="text-2xl">📅</div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                {new Date(menu.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                            </h3>
                                        </div>
                                    </div>
                                    <button
                                        className={`text-2xl transition-colors ${menu.favorite ? 'text-red-400' : 'text-white/50 hover:text-red-400'}`}
                                        onClick={() => toggleFavorite(menu.id)}
                                    >
                                        ❤️
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
                                        💰 {menu.budget} MAD/jour
                                    </span>
                                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm capitalize">
                                        {menu.diet}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-6">
                                    {menu.meals.map((meal, i) => (
                                        <div key={i} className="flex items-center gap-3 text-white/80">
                                            <span className="font-medium text-white min-w-[80px]">{meal.day}:</span>
                                            <span>{meal.repas}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                                        👁️ Voir
                                    </button>
                                    <button
                                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        onClick={() => exportToPDF(menu)}
                                    >
                                        ⬇️ Exporter
                                    </button>
                                    <button
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                                        onClick={() => deleteMenu(menu.id)}
                                    >
                                        🗑️ Supprimer
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div >
    );
}
