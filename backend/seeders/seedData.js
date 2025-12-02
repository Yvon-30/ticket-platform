// Importation des modèles requis pour le Seeding
const Category = require('../models/Category');
const Organizer = require('../models/Organizer');
const Event = require('../models/Event');
const Ticket = require('../models/Ticket');
const User = require('../models/User'); 

// --- DONNÉES DE SEEDING ---

const categoriesData = [
    { name: 'Musique', description: 'Concerts, festivals et événements musicaux.' },
    { name: 'Sports', description: 'Compétitions, matchs et événements sportifs.' },
    { name: 'Arts & Culture', description: 'Expositions, théâtres et musées.' },
    { name: 'Conférences', description: 'Séminaires, workshops et événements professionnels.' },
];

const organizersData = [
    { name: 'EventMasters Corp', contact_email: 'contact@eventmasters.com', phone: '123-456-7890' },
    { name: 'Sportive Pro', contact_email: 'info@sportivepro.net', phone: '987-654-3210' },
];

// URLs de Placeholders publiques (pour simuler l'image sur le frontend)
const MUSIC_PLACEHOLDER = "https://placehold.co/600x400/6366f1/ffffff?text=Jazz+Festival"; // Indigo 500
const SPORTS_PLACEHOLDER = "https://placehold.co/600x400/4f46e5/ffffff?text=Tennis+Open"; // Indigo 600
const CULINARY_PLACEHOLDER = "https://placehold.co/600x400/3730a3/ffffff?text=Salon+V%C3%A9g%C3%A9tal"; // Indigo 700


const eventsData = [
    {
        title: 'Bordeaux Jazz Festival', 
        description: 'Trois jours de musique jazz avec des artistes de renommée mondiale.',
        date: new Date(new Date().setFullYear(new Date().getFullYear() + 1, 5, 15)).toISOString(),
        location: 'Parc Central, Bordeaux',
        price: 45.00,
        max_tickets: 5000,
        total_tickets: 0,
        status: 'Draft',
        image_url: MUSIC_PLACEHOLDER, // Nouvelle URL
        organizerId: 1, 
        categoryId: 1,  
    },
    {
        title: 'Open de Tennis de Paris', 
        description: 'Compétition internationale de tennis.',
        date: new Date(new Date().setFullYear(new Date().getFullYear() + 1, 6, 20)).toISOString(),
        location: 'Stade Roland Garros, Paris',
        price: 80.00,
        max_tickets: 10000,
        total_tickets: 0,
        status: 'Draft',
        image_url: SPORTS_PLACEHOLDER, // Nouvelle URL
        organizerId: 1, 
        categoryId: 2,  
    },
    {
        title: 'Salon des Dégustations Végétales', 
        description: 'Le meilleur de la gastronomie sans produits animaux.',
        date: new Date(new Date().setFullYear(new Date().getFullYear() + 1, 1, 5)).toISOString(),
        location: 'Grand Palais, Lyon',
        price: 30.00,
        max_tickets: 2000,
        total_tickets: 0,
        status: 'Draft',
        image_url: CULINARY_PLACEHOLDER, // Nouvelle URL
        organizerId: 2, 
        categoryId: 3,  
    },
];

const usersData = [
    { username: 'client1', email: 'client1@example.com', password: 'password123', role: 'customer' },
    { username: 'admin_user', email: 'admin@example.com', password: 'adminpassword', role: 'admin' },
];

// --- FONCTION DE SEEDING ---

async function seedDatabase() {
    try {
        console.log('--- Début du Seeding des données ---');

        // 1. Catégories
        await Category.bulkCreate(categoriesData);
        console.log('✅ Catégories insérées.');

        // 2. Organisateurs
        await Organizer.bulkCreate(organizersData);
        console.log('✅ Organisateurs insérés.');

        // 3. Utilisateurs (pour avoir des utilisateurs de base)
        await User.bulkCreate(usersData);
        console.log('✅ Utilisateurs insérés.');

        // 4. Événements (dépend des Catégories et Organisateurs)
        await Event.bulkCreate(eventsData); 
        console.log('✅ Événements insérés.');

        // Si tout s'est bien passé
        console.log('--- Seeding terminé avec succès ! ---');
    } catch (error) {
        console.error('❌ Erreur lors du Seeding de la base de données:', error.name, error);
        const errorMessage = error.parent && error.parent.sqlMessage ? error.parent.sqlMessage : error.message;
        throw new Error("Le Seeding a échoué. Détails: " + errorMessage);
    }
}

module.exports = seedDatabase;