import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Accueil() {
    const [isExiting, setIsExiting] = useState(false);
    const navigate = useNavigate();

    const handleStart = () => {
        setIsExiting(true);
        setTimeout(() => navigate("/home"), 600);
    };

    const handleLogin = () => {
        setIsExiting(true);
        setTimeout(() => navigate("/login"), 600);
    };

    const handleSignup = () => {
        setIsExiting(true);
        setTimeout(() => navigate("/signup"), 600);
    };

    return (
        <div
            className={`min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden transition-all duration-600 ${isExiting ? "opacity-0 scale-95" : ""
                }`}
        >
            {/* Header */}
            <header className="absolute top-0 left-0 right-0 z-50 p-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 text-xl font-bold">
                        <span className="text-3xl">🥗</span>
                        <span>MealPlanner</span>
                    </div>
                    <nav className="flex gap-4">
                        <button
                            onClick={handleLogin}
                            className="px-6 py-3 bg-white/10 backdrop-blur-lg rounded-xl font-semibold hover:bg-white/20 transition-all hover:-translate-y-1"
                        >
                            Connexion
                        </button>
                        <button
                            onClick={handleSignup}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            Inscription
                        </button>
                    </nav>
                </div>
            </header>

            {/* Fond animé */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-[80px] opacity-60 -top-[10%] -right-[10%] animate-pulse"></div>
                <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-[80px] opacity-60 -bottom-[10%] -left-[10%] animate-pulse animation-delay-7000"></div>
                <div className="absolute w-[350px] h-[350px] bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-[80px] opacity-60 top-[40%] left-[50%] animate-pulse animation-delay-14000"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            {/* Contenu principal — occupe tout l’écran */}
            <main className="relative z-10 flex-1 flex items-center">
                <div className="max-w-7xl mx-auto px-8 pt-32 pb-20 text-center w-full">
                    <div className="mb-12">
                        <div className="inline-block px-5 py-2 bg-white/10 backdrop-blur-lg rounded-full text-sm mb-8 border border-white/20">
                            ✨ Planification intelligente
                        </div>
                        <h1 className="text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                            Planifiez vos repas en
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                {" "}
                                quelques secondes
                            </span>
                        </h1>
                        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                            Générez des menus hebdomadaires personnalisés adaptés à votre budget,
                            vos préférences alimentaires et votre emploi du temps
                        </p>
                    </div>

                    <div className="mb-20">
                        <button
                            className="px-12 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-1 mb-4"
                            onClick={handleStart}
                        >
                            Commencer gratuitement
                        </button>
                        <p className="text-white/60 text-sm">
                            Aucune carte bancaire requise
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Feature icon="📅" title="Menus hebdomadaires" text="Plans détaillés pour toute la semaine" />
                        <Feature icon="💰" title="Budget optimisé" text="Économisez sur vos courses" />
                        <Feature icon="🥗" title="Personnalisé" text="Adapté à vos goûts et régimes" />
                        <Feature icon="⚡" title="Rapide & Simple" text="Résultats en quelques clics" />
                    </div>
                </div>
            </main>
        </div>
    );
}

function Feature({ icon, title, text }) {
    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:-translate-y-2 transition-all">
            <div className="text-6xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-white/70">{text}</p>
        </div>
    );
}
