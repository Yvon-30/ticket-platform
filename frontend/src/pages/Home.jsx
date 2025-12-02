import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Calendar, MapPin, Tag, Euro } from 'lucide-react';

// URL de l'API utilisée par les deux composants
const API_URL = 'http://localhost:3000/api/events';

// ====================================================================
// I. Fonctions Utilitaires & Sous-Composants
// ====================================================================

// Fonction utilitaire pour formater la date pour la carte (HomePage)
const formatDateSimple = (isoString) => {
    if (!isoString) return 'Date inconnue';
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (e) {
        return 'Date invalide';
    }
};

// Fonction utilitaire pour formater la date détaillée (EventDetailPage)
const formatDateDetail = (isoString) => {
    if (!isoString) return 'Date inconnue';
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        return 'Date invalide';
    }
};

// Petit composant réutilisable pour les badges d'info (EventDetailPage)
const InfoBadge = ({ icon, label, value }) => (
    <div className="text-center p-3 bg-indigo-50 rounded-lg">
        {icon}
        <p className="text-xs font-semibold text-gray-500 uppercase mt-1">{label}</p>
        <p className="text-base font-medium text-gray-800 break-words">{value}</p>
    </div>
);

// ====================================================================
// II. Composant EventDetailPage (Adapté pour utiliser 'id' en prop)
// ====================================================================

function EventDetailPage({ id, navigate }) {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Si l'ID est null/undefined (par ex. suite à un appel API raté), nous naviguons vers l'accueil.
    useEffect(() => {
        if (!id) {
            navigate('/');
            return;
        }

        const fetchEventDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (data) {
                    setEvent(data);
                } else {
                    setError(`Événement avec l'ID ${id} non trouvé.`);
                }
                
                setError(null);
            } catch (err) {
                console.error(`Échec de la récupération des détails de l'événement ${id}:`, err);
                setError("Impossible de charger les détails de l'événement. Vérifiez la connexion au backend.");
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id, navigate]); // Déclenche le useEffect à chaque changement d'ID ou de navigation

    // --- Rendu du statut (Chargement / Erreur) ---

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600 mr-3" />
                <p className="text-xl text-indigo-600">Chargement des détails...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen p-8 flex flex-col items-center justify-center bg-red-50">
                <div className="p-6 text-center bg-white border border-red-400 text-red-700 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-3">Erreur</h2>
                    <p className="text-sm mb-4">{error}</p>
                    {/* Utilise la fonction navigate simulée */}
                    <button onClick={() => navigate('/')} className="text-indigo-600 hover:text-indigo-800 font-medium">
                        ← Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    if (!event) {
        return <div className="text-center p-8">Événement introuvable.</div>;
    }

    // --- Rendu de la page de détails ---
    return (
        <motion.div 
            className="min-h-screen bg-gray-50 pb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Image d'en-tête */}
            <div className="relative h-64 sm:h-96 w-full overflow-hidden">
                <img 
                    src={event.image_url || 'https://placehold.co/1200x500/8B5CF6/FFFFFF?text=Image+Indisponible'}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/1200x500/8B5CF6/FFFFFF?text=Erreur+de+Chargement';
                    }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6 sm:p-10">
                    <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
                        {event.title}
                    </h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
                
                {/* Section d'information clé et bouton de réservation */}
                <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 flex flex-col lg:flex-row justify-between items-center gap-6">
                    
                    {/* Infos rapides */}
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8 w-full lg:w-auto">
                        
                        <InfoBadge 
                            icon={<Calendar className="h-5 w-5 text-indigo-600" />} 
                            label="Date et Heure" 
                            value={formatDateDetail(event.date)} 
                        />
                        
                        <InfoBadge 
                            icon={<MapPin className="h-5 w-5 text-indigo-600" />} 
                            label="Lieu" 
                            value={event.location} 
                        />

                        <InfoBadge 
                            icon={<Euro className="h-5 w-5 text-green-600" />} 
                            label="Prix" 
                            value={event.price ? `${event.price.toFixed(2)}€` : 'Gratuit'} 
                        />
                        
                        <InfoBadge 
                            icon={<Tag className="h-5 w-5 text-purple-600" />} 
                            label="Catégorie" 
                            value={`Catégorie #${event.categoryId || 'Non spécifiée'}`}
                        />
                    </div>
                    
                    {/* Bouton de réservation */}
                    <motion.button
                        className="w-full lg:w-auto flex-shrink-0 bg-indigo-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-indigo-700 transition transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => console.log(`Réservation de ${event.title} lancée!`)} 
                    >
                        Réserver ma place
                    </motion.button>
                </div>

                {/* Contenu principal de la page */}
                <div className="mt-12 grid lg:grid-cols-3 gap-10">
                    
                    {/* Description (2/3 de la largeur) */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-800 border-b pb-3 mb-6">À propos de l'événement</h2>
                        <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">
                            {event.description || "La description complète de l'événement n'est pas encore disponible. Restez connecté !"}
                        </p>
                    </div>

                    {/* Sidebar (1/3 de la largeur) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl p-6 shadow-lg sticky top-6">
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">Informations Organisateur</h3>
                            <p className="text-gray-600">
                                Organisateur: <span className="font-semibold">{event.organizer_data.name || 'N/A'}</span>
                            </p>
                            <p className="text-sm mt-4 text-gray-500">
                                Pour toute question, veuillez contacter l'organisateur le support via son email: {event.organizer_data.contact_email || 'N/A'}.
                            </p>
                            
                            {/* Utilise la fonction navigate simulée */}
                            <button onClick={() => navigate('/')} className="mt-6 block w-full text-center text-indigo-600 hover:text-indigo-800 font-medium transition">
                                ← Retour à l'accueil
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ====================================================================
// III. Composant HomePage (Adapté pour utiliser 'navigate' en prop)
// ====================================================================

function HomePage({ navigate }) {
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
                
                // Gérer les cas où l'API renvoie un tableau ou un objet avec une clé 'events'
                let eventList = [];
                if (Array.isArray(data)) {
                    eventList = data;
                } else if (data && Array.isArray(data.events)) {
                    eventList = data.events;
                } else {
                    eventList = data; // Tenter d'utiliser les données brutes
                }

                setEvents(eventList);
                setError(null);
            } catch (err) {
                console.error("Échec de la récupération des événements:", err);
                setError("Impossible de charger les événements. Vérifiez que le backend est bien démarré sur le port 3000.");
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
                            src={event.image_url} 
                            alt={event.title} 
                            className="rounded-t-2xl h-48 w-full object-cover" 
                            onError={(e) => {
                                e.target.onerror = null;
                                // Placeholder pour image manquante
                                e.target.src = "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Image+Manquante";
                            }}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-indigo-800 truncate">{event.title}</h3>
                            <p className="text-sm text-gray-600 flex items-center mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2V5"/><path d="M16 2V5"/><path d="M21 4H3"/><path d="M3 10H21"/><path d="M12 10V21"/><path d="M12 21H7"/><path d="M12 21H17"/><rect width="18" height="18" x="3" y="4" rx="2"/></svg>
                                {formatDateSimple(event.date)}
                            </p>
                            <p className="text-green-700 font-bold mt-1">
                                {event.price ? `${event.price.toFixed(2)}€` : 'Prix sur demande'}
                            </p>
                            {/* Utilise la fonction navigate simulée pour aller à la page de détails */}
                            <button onClick={() => navigate('/events', event.id)} className="mt-3 inline-block bg-indigo-600 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-700 transition">
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
                    {/* Liens remplacés par la fonction navigate simulée */}
                    <button
                        onClick={() => navigate('/events-all')}
                        className="bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold shadow hover:bg-yellow-200 transition"
                    >
                        Explorer les événements
                    </button>
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
                    <button
                        onClick={() => navigate('/events-all')}
                        className="mt-10 inline-block bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-600 transition shadow-lg"
                    >
                        Voir tous les {events.length} événements
                    </button>
                )}
            </section>
            
            {/* Section Organisez votre événement */}
            <section className="py-16 px-6 text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <motion.h2
                    className="text-3xl font-bold mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    🎤 Organisez votre propre événement
                </motion.h2>
                <p className="max-w-2xl mx-auto mb-6 text-lg opacity-90">
                    Vous êtes promoteur ou organisateur ? Publiez vos événements sur TicketPlatform et touchez un large public en quelques clics.
                </p>
                <button
                    onClick={() => navigate('/organiser')} // Simuler la navigation vers une autre page
                    className="bg-yellow-400 text-indigo-900 px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
                >
                    Créer un événement →
                </button>
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

// ====================================================================
// IV. Composant App principal (Simulateur de Routeur)
// ====================================================================

export default function App() {
    // État pour simuler la navigation (le chemin) et l'ID de l'événement
    const [path, setPath] = useState('/');
    const [eventId, setEventId] = useState(null);

    // Fonction de navigation simulée (remplace Link)
    const navigate = (newPath, id = null) => {
        setPath(newPath);
        setEventId(id);
        // Assurer que l'on revient au haut de la page lors du changement
        window.scrollTo(0, 0); 
    };

    // Logique de rendu en fonction du chemin actuel
    const renderContent = () => {
        if (path === '/' || path === '/events-all') {
            return <HomePage navigate={navigate} />;
        }
        if (path === '/events' && eventId) {
            return <EventDetailPage id={eventId} navigate={navigate} />;
        }
        // Afficher une page 404 simple pour les chemins non gérés
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 p-8">
                <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
                <p className="text-xl text-gray-700 mt-4 mb-8">Page non trouvée</p>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition"
                >
                    Retourner à l'accueil
                </button>
            </div>
        );
    };

    return (
        <div className="App">
            {renderContent()}
        </div>
    );
}