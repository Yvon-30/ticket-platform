import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-gray-300 py-8 mt-16"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">🎟️ TicketPlatform</h2>
          <p className="text-sm">
            Découvrez, réservez et gérez vos événements préférés facilement et rapidement !
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="text-white font-semibold mb-2">Liens rapides</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-indigo-400">Accueil</a></li>
            <li><a href="/events" className="hover:text-indigo-400">Événements</a></li>
            <li><a href="/contact" className="hover:text-indigo-400">Contact</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-white font-semibold mb-2">Suivez-nous</h3>
          <div className="flex space-x-3">
            <a href="#" className="hover:text-indigo-400">Facebook</a>
            <a href="#" className="hover:text-indigo-400">Instagram</a>
            <a href="#" className="hover:text-indigo-400">Twitter</a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TicketPlatform. Tous droits réservés.
      </div>
    </motion.footer>
  );
}
