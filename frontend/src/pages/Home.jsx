import { Link } from "react-router-dom";
import { motion } from "framer-motion";


export default function Home() {
  const events = [
    {
      id: 1,
      title: "Concert Gospel Night",
      date: "15 Nov 2025",
      price: "5000 FCFA",
      image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
    },
    {
      id: 2,
      title: "Conférence Tech Africa",
      date: "28 Nov 2025",
      price: "10000 FCFA",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
    {
      id: 3,
      title: "Festival de la musique",
      date: "10 Dec 2025",
      price: "7500 FCFA",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
  ];

  const categories = [
    { id: 1, name: "🎶 Concerts" },
    { id: 2, name: "💻 Conférences" },
    { id: 3, name: "🎭 Spectacles" },
    { id: 4, name: "⚽ Sports" },
    { id: 5, name: "🙏 Événements religieux" },
  ];

  const avantages = [
    { emoji: "⚡", title: "Achat rapide", desc: "Réservez vos billets en quelques clics." },
    { emoji: "🔒", title: "Paiement sécurisé", desc: "Transactions 100% protégées." },
    { emoji: "📱", title: "Mobile Friendly", desc: "Une expérience fluide sur tous vos appareils." },
    { emoji: "🎫", title: "Gestion simplifiée", desc: "Organisez, suivez et partagez vos événements." },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 text-gray-800">

      {/* Section Hero */}
      <section className="text-center py-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <motion.h1
          className="text-3xl sm:text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Bienvenue sur <span className="text-yellow-300">TicketPlatform</span> 🎟️
        </motion.h1>
        <motion.p
          className="max-w-2xl mx-auto text-lg opacity-90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Découvrez, réservez et gérez vos événements préférés facilement et rapidement !
        </motion.p>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            to="/events"
            className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-yellow-200 transition"
          >
            Explorer les événements
          </Link>
        </motion.div>
      </section>

      {/* Section Événements à venir */}
      <section className="py-12 px-6 text-center">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          🎉 Événements à venir
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 w-80"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <img src={event.image} alt={event.title} className="rounded-t-2xl h-48 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-indigo-800">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date}</p>
                <p className="text-green-700 font-bold mt-1">{event.price}</p>
                <button className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-700 transition">
                  Voir détails
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Catégories */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">📂 Catégories populaires</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              className="bg-indigo-100 px-5 py-3 rounded-full font-medium text-indigo-800 shadow-sm hover:bg-indigo-200 cursor-pointer transition"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {cat.name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Organisez votre événement */}
      <section className="py-16 px-6 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <motion.h2
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          🎤 Organisez votre propre événement
        </motion.h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg opacity-90">
          Vous êtes promoteur ou organisateur ? Publiez vos événements sur TicketPlatform et touchez un large public en quelques clics.
        </p>
        <Link
          to="/organiser"
          className="bg-yellow-400 text-indigo-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
        >
          Créer un événement →
        </Link>
      </section>

      {/* Section Avantages */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8">💡 Pourquoi choisir TicketPlatform ?</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {avantages.map((av, index) => (
            <motion.div
              key={index}
              className="w-64 bg-indigo-50 p-6 rounded-xl shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="text-4xl mb-3">{av.emoji}</div>
              <h3 className="font-semibold text-indigo-800 mb-2">{av.title}</h3>
              <p className="text-sm text-gray-700">{av.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Newsletter */}
      <section className="py-16 px-6 text-center bg-gradient-to-r from-indigo-700 to-purple-700 text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">📩 Restez informé</h2>
        <p className="mb-6 opacity-90">Inscrivez-vous à notre newsletter pour ne rien manquer des prochains événements.</p>
        <div className="flex justify-center flex-wrap gap-3">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="px-4 py-2 rounded-full text-gray-800 w-64 sm:w-80"
          />
          <button className="bg-yellow-400 text-indigo-900 px-5 py-2 rounded-full font-semibold hover:bg-yellow-300 transition">
            S’abonner
          </button>
        </div>
      </section>

    </div>
  );
}
