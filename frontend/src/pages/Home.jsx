import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react'; // Utilisation d'une icône de loading moderne

const API_URL = 'http://localhost:5000/api/events';

export default function HomePage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- LOGIQUE D'APPEL API ---
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
                setError(null);
            } catch (err) {
                console.error("Échec de la récupération des événements:", err);
                setError("Impossible de charger les événements. Le backend est-il démarré sur le port 5000 ?");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);
    // --- FIN LOGIQUE D'APPEL API ---

    // --- Composants de statut et d'affichage ---

    const EventStatus = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mr-2" />
                    <p className="text-lg text-indigo-600">Chargement des événements...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-4 text-center bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-lg mx-auto">
                    <h3 className="text-xl font-bold mb-2">Erreur de Connexion</h3>
                    <p className="text-sm">{error}</p>
                </div>
            );
        }

        if (events.length === 0) {
            return (
                <div className="p-4 text-center bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg max-w-lg mx-auto">
                    <h3 className="text-xl font-bold mb-2">Aucun Événement Trouvé</h3>
                    <p>Revenez bientôt pour de nouveaux événements !</p>
                </div>
            );
        }

        // Affichage de la grille des événements si tout va bien
        return (
            <div className="flex flex-wrap justify-center gap-6">
                {/* Limiter à 3 événements pour la page d'accueil */}
                {events.slice(0, 3).map((event, index) => (
                    <motion.div
                        key={event.id}
                        className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 w-80"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <img 
                            // Utilisez la clé 'image' que nous avons définie dans le contrôleur
                            src={event.image} 
                            alt={event.title} 
                            className="rounded-t-2xl h-48 w-full object-cover" 
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/600x400/CCCCCC/333333?text=Image+Manquante";
                            }}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-indigo-800 truncate">{event.title}</h3>
                            <p className="text-sm text-gray-600 flex items-center mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2V5"/><path d="M16 2V5"/><path d="M21 4H3"/><path d="M3 10H21"/><path d="M12 10V21"/><path d="M12 21H7"/><path d="M12 21H17"/><rect width="18" height="18" x="3" y="4" rx="2"/></svg>
                                {/* Utilise date_time (formatée par le contrôleur) */}
                                {event.date_time}
                            </p>
                            {/* Utilise price (formaté par le contrôleur) */}
                            <p className="text-green-700 font-bold mt-1">{event.price}</p>
                            <button className="mt-3 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-700 transition">
                                Voir détails
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    };

    // --- Rendu principal de la page ---
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

            {/* Section Événements à venir (DYNAMIQUE) */}
            <section className="py-12 px-6 text-center">
                <motion.h2
                    className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    🎉 Événements à venir
                </motion.h2>

                <EventStatus />
                
                {events.length > 3 && (
                    <Link
                        to="/events"
                        className="mt-10 inline-block bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-600 transition shadow-lg"
                    >
                        Voir tous les {events.length} événements
                    </Link>
                )}
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