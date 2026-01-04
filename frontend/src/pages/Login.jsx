import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        userType: "user" // "user" ou "admin"
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

        // Ici vous pouvez ajouter votre logique de connexion
        console.log("Connexion:", formData);

        // Simulation de connexion réussie
        setIsExiting(true);
        setTimeout(() => {
            // Rediriger selon le type d'utilisateur
            if (formData.userType === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/home");
            }
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

                    {/* Card de connexion */}
                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8">
                        <div className="text-center mb-8">
                            <div className="text-5xl mb-4">🥗</div>
                            <h2 className="text-3xl font-bold mb-2">Connexion</h2>
                            <p className="text-white/70">Accédez à votre compte MealPlanner</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Sélection du type d'utilisateur */}
                            <div>
                                <label className="block text-sm font-medium mb-3">Type de compte</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, userType: "user" })}
                                        className={`py-3 px-4 rounded-xl font-semibold transition-all ${formData.userType === "user"
                                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
                                                : "bg-white/10 hover:bg-white/20"
                                            }`}
                                    >
                                        👤 Utilisateur
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, userType: "admin" })}
                                        className={`py-3 px-4 rounded-xl font-semibold transition-all ${formData.userType === "admin"
                                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
                                                : "bg-white/10 hover:bg-white/20"
                                            }`}
                                    >
                                        👨‍💼 Admin
                                    </button>
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
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Mot de passe oublié */}
                            <div className="text-right">
                                <Link to="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                                    Mot de passe oublié ?
                                </Link>
                            </div>

                            {/* Bouton de connexion */}
                            <button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                            >
                                Se connecter
                            </button>
                        </form>

                        {/* Lien inscription */}
                        <div className="mt-6 text-center">
                            <p className="text-white/70">
                                Pas encore de compte ?{" "}
                                <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                                    Inscrivez-vous
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}