    import React, { useState, useEffect } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Loader2, Calendar, MapPin, Tag, Euro } from 'lucide-react';

    const API_URL = 'http://localhost:3000/api/events';

    // Fonction utilitaire pour formater la date (copiée de HomePage.jsx)
    const formatDate = (isoString) => {
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

    export default function EventDetailPage() {
        // Récupère l'ID de l'événement depuis le chemin de l'URL (e.g., /events/123)
        const { id } = useParams();
        const [event, setEvent] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        // --- LOGIQUE D'APPEL API POUR UN SEUL ÉVÉNEMENT ---
        useEffect(() => {
            const fetchEventDetails = async () => {
                if (!id) {
                    setError("ID d'événement manquant.");
                    setLoading(false);
                    return;
                }

                try {
                    // Appel à l'endpoint spécifique de l'événement
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
        }, [id]); // Déclenche le useEffect à chaque changement d'ID

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
                        <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">
                            ← Retour à l'accueil
                        </Link>
                    </div>
                </div>
            );
        }

        if (!event) {
            // Devrait être capturé par le bloc 'error' ci-dessus, mais c'est une sécurité
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
                {/* Image d'en-tête (utilisant le nouveau champ image_url) */}
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
                            
                            <InfoBadge icon={<Calendar className="h-5 w-5 text-indigo-600" />} label="Date et Heure" value={formatDate(event.date)} />
                            
                            <InfoBadge icon={<MapPin className="h-5 w-5 text-indigo-600" />} label="Lieu" value={event.location} />

                            <InfoBadge 
                                icon={<Euro className="h-5 w-5 text-green-600" />} 
                                label="Prix" 
                                value={event.price ? `${event.price.toFixed(2)}€` : 'Gratuit'} 
                            />
                            
                            {/* Remarque: categoryId est un ID numérique. On afficherait le nom de la catégorie si on avait fait une jointure dans l'API */}
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
                            onClick={() => alert(`Réservation de ${event.title} lancée!`)} // Remplacer par un vrai modal
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
                                    Organisateur ID: <span className="font-semibold">{event.organizerId || 'N/A'}</span>
                                </p>
                                <p className="text-sm mt-4 text-gray-500">
                                    Pour toute question, veuillez contacter le support via l'ID organisateur.
                                </p>
                                
                                <Link to="/" className="mt-6 block text-center text-indigo-600 hover:text-indigo-800 font-medium transition">
                                    ← Retour à l'accueil
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Petit composant réutilisable pour les badges d'info
    const InfoBadge = ({ icon, label, value }) => (
        <div className="text-center p-3 bg-indigo-50 rounded-lg">
            {icon}
            <p className="text-xs font-semibold text-gray-500 uppercase mt-1">{label}</p>
            <p className="text-base font-medium text-gray-800 break-words">{value}</p>
        </div>
    );