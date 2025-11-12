import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-md fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          🎟️ Ticket<span className="text-gray-800">Platform</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
            Accueil
          </Link>
          <Link to="/events" className="text-gray-700 hover:text-indigo-600 transition">
            Événements
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition">
            Contact
          </Link>
        </div>

        {/* Bouton connexion */}
        <Link
          to="/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Connexion
        </Link>
      </div>
    </motion.nav>
  );
}
