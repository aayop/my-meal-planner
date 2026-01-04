import { Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Home from "./pages/Home";
import MesMenus from "./pages/MesMenus";
import ListeCourses from "./pages/ListeCourses";
import MesRecettes from "./pages/MesRecettes";
import MonProfil from "./pages/MonProfil";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
    return (
        <Routes>
            {/* Page affichée AU DÉMARRAGE */}
            <Route path="/" element={<Accueil />} />

            {/* Pages d'authentification */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Dashboard Admin */}
            <Route path="/admin-dashboard" element={<Dashboard />} />

            {/* Pages principales */}
            <Route path="/home" element={<Home />} />
            <Route path="/mes-menus" element={<MesMenus />} />
            <Route path="/courses" element={<ListeCourses />} />
            <Route path="/mes-recettes" element={<MesRecettes />} />
            <Route path="/profil" element={<MonProfil />} />
        </Routes>
    );
}