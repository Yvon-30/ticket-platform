import React, { useState, useEffect } from 'react';
// Importation des icônes Lucide pour une touche esthétique
import { Calendar, MapPin, Tag, Users, Loader2, Zap } from 'lucide-react';

/**
 * Composant principal de l'application affichant la liste des événements.
 */
const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour récupérer les données de l'API
  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      // Remplacez 'http://localhost:5000' par l'URL de votre backend si elle change.
      const response = await fetch('http://localhost:5000/api/events');
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      console.error("Échec de la récupération des événements:", err);
      setError("Impossible de charger les événements. Vérifiez que le serveur backend (port 5000) est démarré.");
    } finally {
      setLoading(false);
    }
  };

  // Lance la récupération des données au montage du composant
  useEffect(() => {
    fetchEvents();
  }, []);

  // Composants d'état de l'interface utilisateur (Loading, Erreur, Vide)

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="ml-2 text-lg font-medium text-gray-700">Chargement des événements...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 max-w-lg mx-auto bg-red-100 border-l-4 border-red-500 text-red-700 shadow-md mt-10 rounded-lg">
        <h2 className="font-bold text-xl mb-2 flex items-center"><Zap className="w-5 h-5 mr-2"/> Erreur de Connexion</h2>
        <p>{error}</p>
        <button
          onClick={fetchEvents}
          className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-150"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="p-10 max-w-md mx-auto bg-white shadow-xl rounded-xl mt-10 text-center">
        <h2 className="font-bold text-2xl text-gray-800">Aucun événement trouvé</h2>
        <p className="mt-2 text-gray-500">Créez de nouveaux événements pour les voir apparaître ici.</p>
      </div>
    );
  }

  // Composant Carte d'Événement
  const EventCard = ({ event }) => (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* Image de l'événement */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={event.image}
          alt={`Image pour ${event.title}`}
          className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
          // Utilisation d'un placeholder simple en cas d'erreur de chargement de l'image
          onError={(e) => {
            e.target.onerror = null; // Évite les boucles infinies
            e.target.src = "https://placehold.co/600x400/1e293b/ffffff?text=Image+Indisponible"; 
          }}
        />
        {/* Étiquette de la catégorie */}
        <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center">
          {event.categoryIcon} {event.categoryName}
        </div>
      </div>
      
      {/* Contenu de la carte */}
      <div className="p-5 flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{event.title}</h3>
        
        {/* Détails principaux */}
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-indigo-500" />
            <span className="font-semibold text-gray-700">{event.date_time}</span>
          </div>
          <div className="flex items-start">
            <MapPin className="w-4 h-4 mr-2 text-indigo-500 flex-shrink-0 mt-0.5" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Tag className="w-4 h-4 mr-2 text-indigo-500" />
            <span className="font-bold text-lg text-green-600">{event.price}</span>
          </div>
        </div>

        {/* Description courte (optionnel) */}
        <p className="mt-3 text-sm text-gray-500 line-clamp-3">{event.description}</p>
      </div>

      {/* Footer de la carte */}
      <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <div className="text-xs text-gray-500 flex items-center">
            <Users className="w-4 h-4 mr-1 text-gray-400" />
            Organisé par: <span className="ml-1 font-medium text-gray-700">{event.organizerName}</span>
        </div>
        <button className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-indigo-600 transition duration-150 transform hover:scale-105">
            Détails
        </button>
      </div>
    </div>
  );

  // Rendu de la liste principale
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-600">
            TicketPlatform Events
          </h1>
          <p className="text-gray-500 mt-1">Découvrez et réservez vos prochains événements.</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </main>

      <footer className="py-8 text-center text-gray-500 text-sm border-t mt-12">
        &copy; {new Date().getFullYear()} TicketPlatform. Tous droits réservés.
      </footer>
    </div>
  );
};

export default App;