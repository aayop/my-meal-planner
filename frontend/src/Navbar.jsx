import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
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