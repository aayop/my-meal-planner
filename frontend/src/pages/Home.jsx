import { useState } from "react";
import { useNavigate } from "react-router-dom";


// ====== NAVBAR ======
function Navbar({ onBack }) {
    const navigate = useNavigate();

    return (
        <nav className="bg-slate-900/80 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="text-white/70 hover:text-white transition mr-4 p-2 rounded-lg hover:bg-white/10"
                            title="Retour à l'accueil"
                        >
                            ←
                        </button>
                        <span className="text-3xl">🍽️</span>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            MealPlanner
                        </h1>
                    </div>
                    <div className="flex gap-6">
                        <button
                            onClick={() => navigate("/home")}
                            className="text-white/70 hover:text-white transition cursor-pointer"
                        >
                            🎯 Générateur
                        </button>
                        <button
                            onClick={() => navigate("/mes-menus")}
                            className="text-white/70 hover:text-white transition cursor-pointer"
                        >
                            📋 Mes menus
                        </button>
                        <button
                            onClick={() => navigate("/courses")}
                            className="text-white/70 hover:text-white transition cursor-pointer"
                        >
                            🛒 Courses
                        </button>
                        <button
                            onClick={() => navigate("/mes-recettes")}
                            className="text-white/70 hover:text-white transition cursor-pointer"
                        >
                            🍳 Mes recettes
                        </button>
                        <button
                            onClick={() => navigate("/profil")}
                            className="text-white/70 hover:text-white transition cursor-pointer"
                        >
                            👤 Mon profil
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

// ====== BUDGET SELECTOR ======
function BudgetSelector({ budget, setBudget }) {
    return (
        <div className="bg-slate-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Budget journalier
            </h2>
            <input
                type="range"
                min="30"
                max="150"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full h-3 accent-indigo-500 cursor-pointer"
            />
            <div className="flex justify-between text-sm text-slate-400 mt-3">
                <span>30 MAD</span>
                <span>150 MAD</span>
            </div>
            <p className="mt-6 text-center text-xl font-bold text-indigo-400">
                {budget} MAD / jour
            </p>
        </div>
    );
}

// ====== PREFERENCES FORM ======
function PreferencesForm({ preferences, setPreferences }) {
    return (
        <div className="bg-slate-800/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-2xl">🥗</span>
                Préférences alimentaires
            </h2>
            <label className="block text-sm text-slate-400 mb-3">Type de régime</label>
            <select
                value={preferences.diet}
                onChange={(e) => setPreferences({ ...preferences, diet: e.target.value })}
                className="w-full p-4 rounded-xl bg-slate-900 border border-white/10 text-white focus:border-indigo-500 focus:outline-none transition"
            >
                <option value="normal">Normal</option>
                <option value="economique">Économique</option>
                <option value="vegetarien">Végétarien</option>
                <option value="sport">Sport / Protéiné</option>
                <option value="diabetique">Diabétique</option>
            </select>
            <div className="mt-6 text-sm text-slate-400">
                <p>✓ Tous types d'aliments</p>
            </div>
        </div>
    );
}

// ====== MENU RESULT ======
function MenuResult({ budget, preferences }) {
    const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

    // ====== BASE DE REPAS ======
    const mealsDB = {
        breakfast: {
            economique: ["Thé & pain", "Pain & confiture"],
            normal: ["Thé & biscuits", "Pain & confiture"],
            sport: ["Œufs & pain complet", "Flocons d’avoine & banane"],
            vegetarien: ["Smoothie fruits", "Flocons d’avoine & fruits"],
            diabetique: ["Yaourt nature & noix", "Pain complet & fromage"]
        },
        lunch: {
            economique: ["Riz & lentilles", "Sandwich œufs"],
            normal: ["Pâtes à la tomate", "Riz & haricots"],
            sport: ["Poulet grillé & riz", "Thon & légumes"],
            vegetarien: ["Légumes sautés & riz", "Salade composée"],
            diabetique: ["Poisson & légumes", "Poulet & légumes vapeur"]
        },
        dinner: {
            economique: ["Soupe & pain", "Purée simple"],
            normal: ["Salade & œufs", "Purée & saucisses"],
            sport: ["Omelette protéinée", "Poisson & légumes"],
            vegetarien: ["Soupe de légumes", "Salade verte"],
            diabetique: ["Soupe légère", "Légumes vapeur & œufs"]
        }
    };

    // ====== BUDGET → CATÉGORIE ======
    const budgetLevel =
        budget < 60 ? "economique" :
            budget < 100 ? "normal" :
                "sport";

    // Si régime spécifique, il priorise
    const dietKey = preferences.diet === "normal" ? budgetLevel : preferences.diet;

    // ====== GÉNÉRATION DU MENU ======
    const weeklyMenu = days.map(day => ({
        day,
        breakfast: mealsDB.breakfast[dietKey][Math.floor(Math.random() * mealsDB.breakfast[dietKey].length)],
        lunch: mealsDB.lunch[dietKey][Math.floor(Math.random() * mealsDB.lunch[dietKey].length)],
        dinner: mealsDB.dinner[dietKey][Math.floor(Math.random() * mealsDB.dinner[dietKey].length)]
    }));

    return (
        <section className="bg-slate-800/60 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                📅 Menu de la semaine généré
            </h2>

            <div className="text-center mb-8 space-y-2">
                <p className="text-slate-300">
                    Budget: <span className="font-bold text-indigo-400">{budget} MAD/jour</span>
                </p>
                <p className="text-slate-300">
                    Régime: <span className="font-bold text-indigo-400">{preferences.diet}</span>
                </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/20">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r from-indigo-600 to-purple-600">
                            <th className="p-5 text-left font-bold text-white">Jour</th>
                            <th className="p-5 text-left font-bold text-white">☀️ Petit-déjeuner</th>
                            <th className="p-5 text-left font-bold text-white">🍽️ Déjeuner</th>
                            <th className="p-5 text-left font-bold text-white">🌙 Dîner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weeklyMenu.map((day, i) => (
                            <tr key={i} className="bg-slate-900/40">
                                <td className="p-5 font-bold text-indigo-300">{day.day}</td>
                                <td className="p-5 text-slate-200">{day.breakfast}</td>
                                <td className="p-5 text-slate-200">{day.lunch}</td>
                                <td className="p-5 text-slate-200">{day.dinner}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}


// ====== HOME COMPONENT ======
export default function Home() {
    const [budget, setBudget] = useState(50);
    const [preferences, setPreferences] = useState({
        diet: "normal",
        allergies: []
    });
    const [showMenu, setShowMenu] = useState(false);

    const generateMenu = () => {
        setShowMenu(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">
                {/* Hero Section */}
                <section className="text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold mb-5 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                        Planifiez vos repas en quelques secondes
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed">
                        Générez des menus hebdomadaires personnalisés adaptés à votre budget et vos préférences alimentaires
                    </p>
                </section>

                {/* Features Grid */}
                <section className="grid md:grid-cols-3 gap-6">
                    {[
                        { icon: "📅", title: "Menu de la semaine", desc: "Planification rapide et efficace" },
                        { icon: "💰", title: "Budget optimisé", desc: "Repas adaptés à vos moyens" },
                        { icon: "🥗", title: "Personnalisé", desc: "Régimes et allergies pris en compte" }
                    ].map((feature, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/10 transition-all hover:scale-105 shadow-xl">
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                            <p className="text-white/70">{feature.desc}</p>
                        </div>
                    ))}
                </section>

                {/* Configuration Section */}
                <section className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 shadow-2xl">
                    <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        🎯 Créez votre menu personnalisé
                    </h2>
                    <div className="grid lg:grid-cols-2 gap-8 mb-8">
                        <BudgetSelector budget={budget} setBudget={setBudget} />
                        <PreferencesForm preferences={preferences} setPreferences={setPreferences} />
                    </div>
                    <div className="flex justify-center">
                        <button onClick={generateMenu} className="px-12 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all font-bold text-lg shadow-2xl hover:scale-105 transform">
                            ✨ Générer mon menu de la semaine
                        </button>
                    </div>
                </section>

                {/* Menu Result */}
                {showMenu && <MenuResult budget={budget} preferences={preferences} />}
            </main>
        </div>
    );
}