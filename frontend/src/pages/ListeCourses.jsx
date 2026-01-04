import { useState } from "react";
import Navbar from "../Navbar"

export default function ListeCourses() {
    const [items, setItems] = useState({
        "Fruits & Légumes": [
            { id: 1, name: "Tomates", quantity: "1 kg", price: 8, checked: false },
            { id: 2, name: "Oignons", quantity: "500g", price: 4, checked: false },
            { id: 3, name: "Pommes", quantity: "2 kg", price: 12, checked: false }
        ],
        "Viandes & Poissons": [
            { id: 4, name: "Poulet", quantity: "1 kg", price: 35, checked: false },
            { id: 5, name: "Saumon", quantity: "500g", price: 45, checked: false }
        ],
        "Produits Laitiers": [
            { id: 6, name: "Lait", quantity: "2L", price: 10, checked: false },
            { id: 7, name: "Fromage", quantity: "200g", price: 15, checked: false }
        ],
        "Épicerie": [
            { id: 8, name: "Pâtes", quantity: "500g", price: 6, checked: false },
            { id: 9, name: "Riz", quantity: "1 kg", price: 8, checked: false },
            { id: 10, name: "Huile d'olive", quantity: "500ml", price: 18, checked: false }
        ]
    });

    const [newItemCategory, setNewItemCategory] = useState("Fruits & Légumes");
    const [newItemName, setNewItemName] = useState("");
    const [newItemQuantity, setNewItemQuantity] = useState("1");
    const [newItemPrice, setNewItemPrice] = useState(0);

    const addItem = () => {
        if (!newItemName) return;
        const newItem = {
            id: Date.now(),
            name: newItemName,
            quantity: newItemQuantity,
            price: parseFloat(newItemPrice) || 0,
            checked: false
        };
        setItems({
            ...items,
            [newItemCategory]: [...(items[newItemCategory] || []), newItem]
        });
        setNewItemName("");
        setNewItemQuantity("1");
        setNewItemPrice(0);
    };

    const toggleItem = (category, id) => {
        setItems({
            ...items,
            [category]: items[category].map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        });
    };

    const removeItem = (category, id) => {
        setItems({
            ...items,
            [category]: items[category].filter(item => item.id !== id)
        });
    };

    const getTotalItems = () => Object.values(items).flat().length;
    const getCheckedItems = () => Object.values(items).flat().filter(item => item.checked).length;
    const getTotalPrice = () => Object.values(items).flat().reduce((acc, i) => acc + (i.checked ? 0 : (i.price || 0)), 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
            <Navbar />
            <main className="max-w-6xl mx-auto px-6 py-12 space-y-8">
                {/* Header */}
                <div className="text-center py-8">
                    <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                        🛒 Ma Liste de Courses
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Organisez vos achats par rayons
                    </p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl">🛍️</div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{getCheckedItems()}/{getTotalItems()}</h3>
                                <p className="text-white/70">Articles achetés</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6">
                        <div className="flex items-center gap-4">
                            <div className="text-4xl">💰</div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">{getTotalPrice()} MAD</h3>
                                <p className="text-white/70">Reste à acheter</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Item Form */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">➕ Ajouter un article</h3>
                    <div className="grid md:grid-cols-5 gap-4">
                        <select
                            value={newItemCategory}
                            onChange={e => setNewItemCategory(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                        >
                            <option value="Fruits & Légumes" className="bg-slate-800">🥕 Fruits & Légumes</option>
                            <option value="Viandes & Poissons" className="bg-slate-800">🥩 Viandes & Poissons</option>
                            <option value="Produits Laitiers" className="bg-slate-800">🥛 Produits Laitiers</option>
                            <option value="Épicerie" className="bg-slate-800">🥫 Épicerie</option>
                            <option value="Boulangerie" className="bg-slate-800">🍞 Boulangerie</option>
                            <option value="Autre" className="bg-slate-800">📦 Autre</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Nom de l'article"
                            value={newItemName}
                            onChange={e => setNewItemName(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                        />
                        <input
                            type="text"
                            placeholder="Quantité"
                            value={newItemQuantity}
                            onChange={e => setNewItemQuantity(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                        />
                        <input
                            type="number"
                            placeholder="Prix (MAD)"
                            value={newItemPrice}
                            onChange={e => setNewItemPrice(e.target.value)}
                            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                        />
                        <button
                            onClick={addItem}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-colors font-medium"
                        >
                            ➕ Ajouter
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-6">
                    {Object.entries(items).map(([category, categoryItems]) => (
                        <div key={category} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-200">
                            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <span className="text-2xl">
                                    {category === "Fruits & Légumes" ? "🥕" :
                                        category === "Viandes & Poissons" ? "🥩" :
                                            category === "Produits Laitiers" ? "🥛" :
                                                category === "Épicerie" ? "🥫" :
                                                    category === "Boulangerie" ? "🍞" : "📦"}
                                </span>
                                {category}
                            </h3>

                            {categoryItems.length === 0 ? (
                                <p className="text-white/50 text-center py-8">Aucun article dans cette catégorie</p>
                            ) : (
                                <div className="space-y-3">
                                    {categoryItems.map(item => (
                                        <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between hover:bg-white/10 transition-colors">
                                            <div className="flex items-center gap-4 flex-1">
                                                <input
                                                    type="checkbox"
                                                    checked={item.checked}
                                                    onChange={() => toggleItem(category, item.id)}
                                                    className="w-5 h-5 text-indigo-600 bg-white/10 border-white/20 rounded focus:ring-indigo-500 focus:ring-2"
                                                />
                                                <div className="flex-1">
                                                    <span className={`text-white font-medium ${item.checked ? 'line-through text-white/50' : ''}`}>
                                                        {item.name}
                                                    </span>
                                                    <div className="flex gap-4 mt-1">
                                                        <span className="text-white/60 text-sm">📦 {item.quantity}</span>
                                                        <span className="text-white/60 text-sm">💰 {item.price} MAD</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeItem(category, item.id)}
                                                className="text-red-400 hover:text-red-300 transition-colors text-xl"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}