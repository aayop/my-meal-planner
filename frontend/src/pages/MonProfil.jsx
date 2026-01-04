import { useState } from "react";
import Navbar from "../Navbar";

export default function MonProfil() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "Ahmed Benali",
        email: "ahmed.benali@example.com",
        phone: "+212 6 12 34 56 78",
        location: "Casablanca, Maroc",
        diet: "normal",
        allergies: ["Arachides", "Fruits de mer"],
        budget: 50,
        familySize: 4,
        cookingLevel: "Intermédiaire",
        preferredCuisines: ["Marocaine", "Italienne", "Française"]
    });

    const [stats] = useState({
        menusCreated: 24,
        recipesCooked: 67,
        moneySaved: 1250,
        favoriteRecipes: 15,
        shoppingLists: 32,
        avgRating: 4.5
    });

    const handleSave = () => {
        setIsEditing(false);
        alert("Profil mis à jour avec succès !");
    };

    const handleInputChange = (field, value) => {
        setProfile({ ...profile, [field]: value });
    };

    const addAllergie = () => {
        const allergie = prompt("Entrez une nouvelle allergie :");
        if (allergie && allergie.trim()) {
            setProfile({ ...profile, allergies: [...profile.allergies, allergie.trim()] });
        }
    };

    const removeAllergie = (index) => {
        setProfile({ ...profile, allergies: profile.allergies.filter((_, i) => i !== index) });
    };

    const addCuisine = () => {
        const cuisine = prompt("Entrez une cuisine préférée :");
        if (cuisine && cuisine.trim()) {
            setProfile({ ...profile, preferredCuisines: [...profile.preferredCuisines, cuisine.trim()] });
        }
    };

    const removeCuisine = (index) => {
        setProfile({ ...profile, preferredCuisines: profile.preferredCuisines.filter((_, i) => i !== index) });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
                {/* Header */}
                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        👤 Mon Profil
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Gérez vos informations et préférences culinaires
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-3xl mb-2">📊</div>
                        <div className="text-2xl font-bold text-white">{stats.menusCreated}</div>
                        <div className="text-white/60 text-sm">Menus créés</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-3xl mb-2">👨‍🍳</div>
                        <div className="text-2xl font-bold text-white">{stats.recipesCooked}</div>
                        <div className="text-white/60 text-sm">Recettes cuisinées</div>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-3xl mb-2">💰</div>
                        <div className="text-2xl font-bold text-white">{stats.moneySaved} MAD</div>
                        <div className="text-white/60 text-sm">Économisés</div>
                    </div>
                    <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/20 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-3xl mb-2">❤️</div>
                        <div className="text-2xl font-bold text-white">{stats.favoriteRecipes}</div>
                        <div className="text-white/60 text-sm">Favoris</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/20 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-3xl mb-2">🛒</div>
                        <div className="text-2xl font-bold text-white">{stats.shoppingLists}</div>
                        <div className="text-white/60 text-sm">Listes courses</div>
                    </div>
                    <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border border-amber-500/20 rounded-xl p-4 backdrop-blur-sm">
                        <div className="text-3xl mb-2">⭐</div>
                        <div className="text-2xl font-bold text-white">{stats.avgRating}/5</div>
                        <div className="text-white/60 text-sm">Note moyenne</div>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-4xl">
                                👤
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                                <p className="text-white/60">{profile.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-6 py-3 rounded-xl transition-colors font-medium ${
                                isEditing 
                                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                            }`}
                        >
                            {isEditing ? '💾 Enregistrer' : '✏️ Modifier'}
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Informations personnelles */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white mb-4">📋 Informations personnelles</h3>
                            
                            <div>
                                <label className="block text-white/70 mb-2 text-sm">Nom complet</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                ) : (
                                    <div className="text-white">{profile.name}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-white/70 mb-2 text-sm">Email</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                ) : (
                                    <div className="text-white">{profile.email}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-white/70 mb-2 text-sm">Téléphone</label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={profile.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                ) : (
                                    <div className="text-white">{profile.phone}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-white/70 mb-2 text-sm">Localisation</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profile.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                ) : (
                                    <div className="text-white">{profile.location}</div>
                                )}
                            </div>
                        </div>

                        {/* Préférences culinaires */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white mb-4">🍽️ Préférences culinaires</h3>
                            
                            <div>
                                <label className="block text-white/70 mb-2 text-sm">Régime alimentaire</label>
                                {isEditing ? (
                                    <select
                                        value={profile.diet}
                                        onChange={(e) => handleInputChange('diet', e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="normal" className="bg-slate-800">Normal</option>
                                        <option value="végétarien" className="bg-slate-800">Végétarien</option>
                                        <option value="vegan" className="bg-slate-800">Vegan</option>
                                        <option value="sans-gluten" className="bg-slate-800">Sans gluten</option>
                                        <option value="halal" className="bg-slate-800">Halal</option>
                                    </select>
                                ) : (
                                    <div className="text-white capitalize">{profile.diet}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-white/70 mb-2 text-sm">Niveau de cuisine</label>
                                {isEditing ? (
                                    <select
                                        value={profile.cookingLevel}
                                        onChange={(e) => handleInputChange('cookingLevel', e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="Débutant" className="bg-slate-800">Débutant</option>
                                        <option value="Intermédiaire" className="bg-slate-800">Intermédiaire</option>
                                        <option value="Avancé" className="bg-slate-800">Avancé</option>
                                        <option value="Expert" className="bg-slate-800">Expert</option>
                                    </select>
                                ) : (
                                    <div className="text-white">{profile.cookingLevel}</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-white/70 mb-2 text-sm">Budget quotidien</label>
                                {isEditing ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={profile.budget}
                                            onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        <span className="text-white/70">MAD</span>
                                    </div>
                                ) : (
                                    <div className="text-white">{profile.budget} MAD</div>
                                )}
                            </div>

                            <div>
                                <label className="block text-white/70 mb-2 text-sm">Nombre de personnes</label>
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={profile.familySize}
                                        onChange={(e) => handleInputChange('familySize', parseInt(e.target.value))}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                ) : (
                                    <div className="text-white">{profile.familySize} personnes</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Allergies et cuisines préférées */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Allergies */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">🚫 Allergies</h3>
                            {isEditing && (
                                <button
                                    onClick={addAllergie}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                                >
                                    + Ajouter
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profile.allergies.length === 0 ? (
                                <p className="text-white/50">Aucune allergie</p>
                            ) : (
                                profile.allergies.map((allergie, index) => (
                                    <span
                                        key={index}
                                        className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                    >
                                        {allergie}
                                        {isEditing && (
                                            <button
                                                onClick={() => removeAllergie(index)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </span>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Cuisines préférées */}
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">🌍 Cuisines préférées</h3>
                            {isEditing && (
                                <button
                                    onClick={addCuisine}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                                >
                                    + Ajouter
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profile.preferredCuisines.map((cuisine, index) => (
                                <span
                                    key={index}
                                    className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                >
                                    {cuisine}
                                    {isEditing && (
                                        <button
                                            onClick={() => removeCuisine(index)}
                                            className="text-indigo-400 hover:text-indigo-300"
                                        >
                                            ✕
                                        </button>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                {!isEditing && (
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">⚙️ Actions</h3>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors">
                                📥 Exporter mes données
                            </button>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-colors">
                                🔔 Gérer les notifications
                            </button>
                            <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-colors">
                                🔒 Changer le mot de passe
                            </button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition-colors">
                                🗑️ Supprimer le compte
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}