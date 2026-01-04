import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation basique
        if (formData.password !== formData.confirmPassword) {
            alert("Les mots de passe ne correspondent pas !");
            return;
        }

        // Ici vous pouvez ajouter votre logique d'inscription
        console.log("Inscription:", formData);

        // Simulation d'inscription réussie
        setIsExiting(true);
        setTimeout(() => {
            navigate("/home");
        }, 600);
    };

    const handleBack = () => {
        setIsExiting(true);
        setTimeout(() => {
            navigate("/");
        }, 600);
    };

    return (
        <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden transition-all duration-600 ${isExiting ? 'opacity-0 scale-95' : ''}`}>
            {/* Fond animé */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-[80px] opacity-60 -top-[10%] -right-[10%] animate-pulse"></div>
                <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-[80px] opacity-60 -bottom-[10%] -left-[10%] animate-pulse animation-delay-7000"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            {/* Contenu */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-8 py-12">
                <div className="w-full max-w-md">
                    {/* Bouton retour */}
                    <button
                        onClick={handleBack}
                        className="mb-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                    >
                        <span>←</span>
                        <span>Retour</span>
                    </button>

                    {/* Card d'inscription */}
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
                        <div className="text-center mb-8">
                            <div className="text-5xl mb-4">🥗</div>
                            <h2 className="text-3xl font-bold mb-2">Inscription</h2>
                            <p className="text-white/70">Créez votre compte MealPlanner</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Nom et Prénom */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="nom" className="block text-sm font-medium mb-2">
                                        Nom
                                    </label>
                                    <input
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        value={formData.nom}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="Nom"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="prenom" className="block text-sm font-medium mb-2">
                                        Prénom
                                    </label>
                                    <input
                                        type="text"
                                        id="prenom"
                                        name="prenom"
                                        value={formData.prenom}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                        placeholder="Prénom"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder="votre@email.com"
                                />
                            </div>

                            {/* Mot de passe */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">
                                    Mot de passe
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength="6"
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                                <p className="text-xs text-white/50 mt-1">Minimum 6 caractères</p>
                            </div>

                            {/* Confirmation mot de passe */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                                    Confirmer le mot de passe
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Bouton d'inscription */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 mt-6"
                            >
                                Créer mon compte
                            </button>
                        </form>

                        {/* Lien connexion */}
                        <div className="mt-6 text-center">
                            <p className="text-white/70">
                                Déjà un compte ?{" "}
                                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                                    Connectez-vous
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}