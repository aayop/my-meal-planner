import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const navigate = useNavigate();

    const [users, setUsers] = useState([
        { id: 1, nom: "Dupont", prenom: "Jean", email: "jean@email.com", date: "15/12/2025", statut: "Actif" },
        { id: 2, nom: "Martin", prenom: "Sophie", email: "sophie@email.com", date: "14/12/2025", statut: "Actif" },
        { id: 3, nom: "Bernard", prenom: "Marie", email: "marie@email.com", date: "13/12/2025", statut: "Inactif" }
    ]);

    const [menus, setMenus] = useState([
        { id: 1, nom: "Menu Végétarien", semaine: "Semaine 51", repas: 7, user: "Jean Dupont", budget: "45" },
        { id: 2, nom: "Menu Équilibré", semaine: "Semaine 52", repas: 7, user: "Sophie Martin", budget: "60" },
        { id: 3, nom: "Menu Sport", semaine: "Semaine 51", repas: 5, user: "Marie Bernard", budget: "55" }
    ]);

    const [recettes, setRecettes] = useState([
        { id: 1, nom: "Salade César", categorie: "Entrée", temps: "15", difficulte: "Facile", calories: "250" },
        { id: 2, nom: "Poulet Rôti", categorie: "Plat", temps: "45", difficulte: "Moyen", calories: "450" },
        { id: 3, nom: "Tarte aux Pommes", categorie: "Dessert", temps: "60", difficulte: "Difficile", calories: "320" }
    ]);

    const [courses, setCourses] = useState([
        { id: 1, produit: "Tomates", quantite: "1", prix: "3.50", categorie: "Légumes" },
        { id: 2, produit: "Poulet", quantite: "1.5", prix: "12.00", categorie: "Viandes" },
        { id: 3, nom: "Pommes", quantite: "2", prix: "4.00", categorie: "Fruits" }
    ]);

    const utilisateursData = [
        { mois: "Sept", utilisateurs: 12 },
        { mois: "Oct", utilisateurs: 19 },
        { mois: "Nov", utilisateurs: 25 },
        { mois: "Déc", utilisateurs: 35 }
    ];

    const menusData = [
        { name: "Végétarien", value: 35 },
        { name: "Équilibré", value: 28 },
        { name: "Sport", value: 20 },
        { name: "Régime", value: 17 }
    ];

    const recettesData = [
        { difficulte: "Facile", count: 45 },
        { difficulte: "Moyen", count: 32 },
        { difficulte: "Difficile", count: 18 }
    ];

    const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#f59e0b"];

    const handleDelete = (type, id) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
        if (type === "users") setUsers(users.filter(u => u.id !== id));
        if (type === "menus") setMenus(menus.filter(m => m.id !== id));
        if (type === "recettes") setRecettes(recettes.filter(r => r.id !== id));
        if (type === "courses") setCourses(courses.filter(c => c.id !== id));
    };

    const stats = {
        totalUsers: users.length,
        totalMenus: menus.length,
        totalRecettes: recettes.length,
        totalCourses: courses.length,
        budgetTotal: menus.reduce((sum, m) => sum + parseFloat(m.budget), 0).toFixed(2)
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white">
            <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">👨‍💼</span>
                        <div>
                            <h1 className="text-xl font-bold">Dashboard Admin</h1>
                            <p className="text-sm text-white/60">MealPlanner</p>
                        </div>
                    </div>
                    <button onClick={() => navigate("/")} className="px-6 py-2 bg-red-600/20 border border-red-500/30 rounded-xl hover:bg-red-600/30 transition-all">
                        Déconnexion
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                    {[
                        { icon: "👥", value: stats.totalUsers, label: "Utilisateurs", color: "indigo" },
                        { icon: "📅", value: stats.totalMenus, label: "Menus", color: "purple" },
                        { icon: "🥗", value: stats.totalRecettes, label: "Recettes", color: "pink" },
                        { icon: "🛒", value: stats.totalCourses, label: "Produits", color: "cyan" },
                        { icon: "💰", value: `${stats.budgetTotal}€`, label: "Budget Total", color: "green" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="text-4xl">{stat.icon}</div>
                                <span className={`text-3xl font-bold text-${stat.color}-400`}>{stat.value}</span>
                            </div>
                            <h3 className="text-lg font-semibold">{stat.label}</h3>
                        </div>
                    ))}
                </div>

                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-2 mb-6 flex gap-2 overflow-x-auto">
                    {["overview", "users", "menus", "recettes", "courses"].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === tab ? "bg-gradient-to-r from-indigo-600 to-purple-600" : "hover:bg-white/10"
                                }`}>
                            {tab === "overview" && "📊 Vue d'ensemble"}
                            {tab === "users" && "👥 Utilisateurs"}
                            {tab === "menus" && "📅 Menus"}
                            {tab === "recettes" && "🥗 Recettes"}
                            {tab === "courses" && "🛒 Courses"}
                        </button>
                    ))}
                </div>

                {activeTab === "overview" && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4">📈 Croissance Utilisateurs</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <LineChart data={utilisateursData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                    <XAxis dataKey="mois" stroke="#ffffff60" />
                                    <YAxis stroke="#ffffff60" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff20', borderRadius: '12px' }} />
                                    <Line type="monotone" dataKey="utilisateurs" stroke="#8b5cf6" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4">🍽️ Répartition Menus</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie data={menusData} cx="50%" cy="50%" labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80} dataKey="value">
                                        {menusData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff20', borderRadius: '12px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4">📊 Recettes par Difficulté</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={recettesData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                                    <XAxis dataKey="difficulte" stroke="#ffffff60" />
                                    <YAxis stroke="#ffffff60" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #ffffff20', borderRadius: '12px' }} />
                                    <Bar dataKey="count" fill="#ec4899" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold mb-4">🔔 Activité Récente</h3>
                            <div className="space-y-3">
                                {[
                                    { msg: "Nouvel utilisateur inscrit", time: "2h", color: "indigo" },
                                    { msg: "Menu créé par Sophie", time: "5h", color: "purple" },
                                    { msg: "3 nouvelles recettes", time: "Hier", color: "pink" }
                                ].map((act, i) => (
                                    <div key={i} className={`bg-white/5 p-4 rounded-xl border-l-4 border-${act.color}-500`}>
                                        <p className="text-sm font-semibold">{act.msg}</p>
                                        <p className="text-xs text-white/50">Il y a {act.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "users" && (
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">👥 Utilisateurs</h2>
                            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold hover:shadow-lg transition-all">
                                ➕ Créer
                            </button>
                        </div>
                        <table className="w-full">
                            <thead><tr className="border-b border-white/10">
                                {["ID", "Nom", "Prénom", "Email", "Date", "Statut", "Actions"].map(h => (
                                    <th key={h} className="text-left py-4 px-4 font-semibold">{h}</th>
                                ))}
                            </tr></thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-4 px-4">{u.id}</td>
                                        <td className="py-4 px-4 font-semibold">{u.nom}</td>
                                        <td className="py-4 px-4">{u.prenom}</td>
                                        <td className="py-4 px-4 text-indigo-400">{u.email}</td>
                                        <td className="py-4 px-4">{u.date}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs ${u.statut === "Actif" ? "bg-green-600/20 text-green-400" : "bg-gray-600/20 text-gray-400"}`}>
                                                {u.statut}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-2">
                                                <button className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 transition-all">✏️ Modifier</button>
                                                <button onClick={() => handleDelete("users", u.id)} className="px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/40 transition-all">🗑️ Supprimer</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "menus" && (
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">📅 Menus</h2>
                            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold hover:shadow-lg transition-all">➕ Créer</button>
                        </div>
                        <table className="w-full">
                            <thead><tr className="border-b border-white/10">
                                {["ID", "Nom", "Semaine", "Repas", "Utilisateur", "Budget", "Actions"].map(h => (
                                    <th key={h} className="text-left py-4 px-4 font-semibold">{h}</th>
                                ))}
                            </tr></thead>
                            <tbody>
                                {menus.map(m => (
                                    <tr key={m.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-4 px-4">{m.id}</td>
                                        <td className="py-4 px-4 font-semibold">{m.nom}</td>
                                        <td className="py-4 px-4">{m.semaine}</td>
                                        <td className="py-4 px-4"><span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg">{m.repas}</span></td>
                                        <td className="py-4 px-4">{m.user}</td>
                                        <td className="py-4 px-4 text-green-400 font-semibold">{m.budget}€</td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-2">
                                                <button className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 transition-all">✏️ Modifier</button>
                                                <button onClick={() => handleDelete("menus", m.id)} className="px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/40 transition-all">🗑️ Supprimer</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "recettes" && (
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">🥗 Recettes</h2>
                            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold hover:shadow-lg transition-all">➕ Créer</button>
                        </div>
                        <table className="w-full">
                            <thead><tr className="border-b border-white/10">
                                {["ID", "Nom", "Catégorie", "Temps", "Difficulté", "Calories", "Actions"].map(h => (
                                    <th key={h} className="text-left py-4 px-4 font-semibold">{h}</th>
                                ))}
                            </tr></thead>
                            <tbody>
                                {recettes.map(r => (
                                    <tr key={r.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-4 px-4">{r.id}</td>
                                        <td className="py-4 px-4 font-semibold">{r.nom}</td>
                                        <td className="py-4 px-4"><span className="px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-lg text-sm">{r.categorie}</span></td>
                                        <td className="py-4 px-4">{r.temps} min</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-lg text-sm ${r.difficulte === "Facile" ? "bg-green-600/20 text-green-400" :
                                                    r.difficulte === "Moyen" ? "bg-yellow-600/20 text-yellow-400" :
                                                        "bg-red-600/20 text-red-400"
                                                }`}>{r.difficulte}</span>
                                        </td>
                                        <td className="py-4 px-4">{r.calories} kcal</td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-2">
                                                <button className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 transition-all">✏️ Modifier</button>
                                                <button onClick={() => handleDelete("recettes", r.id)} className="px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/40 transition-all">🗑️ Supprimer</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "courses" && (
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">🛒 Courses</h2>
                            <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold hover:shadow-lg transition-all">➕ Créer</button>
                        </div>
                        <table className="w-full">
                            <thead><tr className="border-b border-white/10">
                                {["ID", "Produit", "Quantité", "Prix", "Catégorie", "Actions"].map(h => (
                                    <th key={h} className="text-left py-4 px-4 font-semibold">{h}</th>
                                ))}
                            </tr></thead>
                            <tbody>
                                {courses.map(c => (
                                    <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-4 px-4">{c.id}</td>
                                        <td className="py-4 px-4 font-semibold">{c.produit}</td>
                                        <td className="py-4 px-4">{c.quantite} kg</td>
                                        <td className="py-4 px-4 text-green-400">{c.prix}€</td>
                                        <td className="py-4 px-4"><span className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-lg text-sm">{c.categorie}</span></td>
                                        <td className="py-4 px-4">
                                            <div className="flex gap-2">
                                                <button className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/40 transition-all">✏️ Modifier</button>
                                                <button onClick={() => handleDelete("courses", c.id)} className="px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/40 transition-all">🗑️ Supprimer</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}