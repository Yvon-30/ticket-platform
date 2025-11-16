// backend/server.js
require('dotenv').config(); 

const express = require('express');
const cors = require('cors'); 
const { sequelize, initializeDatabase } = require('./config/database');
// Importation du routeur dédié aux événements
const eventRoutes = require('./routes/eventRoutes'); 

// 1. IMPORTATION EXPLICITE de tous les modèles
const Organizer = require('./models/Organizer'); 
const Category = require('./models/Category'); 
const Event = require('./models/Event');
const Ticket = require('./models/Ticket'); 

// 2. DÉFINITION CENTRALISÉE DES ASSOCIATIONS
Organizer.hasMany(Event, { foreignKey: 'organizer_id', onDelete: 'CASCADE' });
Event.belongsTo(Organizer, { foreignKey: 'organizer_id' }); 

Category.hasMany(Event, { foreignKey: 'category_id', onDelete: 'SET NULL' });
Event.belongsTo(Category, { foreignKey: 'category_id' }); 

Event.hasMany(Ticket, { foreignKey: 'event_id', onDelete: 'CASCADE' });
Ticket.belongsTo(Event, { foreignKey: 'event_id' });

const app = express();
const PORT = process.env.PORT || 5000;

// =================================================================
// CORRECTION CORS : CHANGEMENT DU PORT DE 3000 À 5173
// Votre frontend sur 5173 est maintenant autorisé.
// =================================================================
app.use(cors({
    origin: 'http://localhost:5173' // <-- C'EST LA LIGNE CORRIGÉE !
}));

// Middleware pour parser le JSON
app.use(express.json());

// --- DÉFINITION DES ROUTES ---

// Endpoint de test de base
app.get('/', (req, res) => {
    res.send('Backend TicketPlatform est actif.');
});

// Endpoint de test pour l'API
app.get('/api', (req, res) => {
    res.json({ message: 'API active. Utilisez /api/events pour la liste des événements.' });
});

// ROUTAGE CRITIQUE : Utilisation du routeur d'événements
// Toutes les requêtes vers /api/events seront gérées par eventRoutes
app.use('/api/events', eventRoutes); 


// Fonction de démarrage du serveur
const startServer = async () => {
    try {
        await initializeDatabase();
        
        // Synchroniser le schéma (cela efface et recrée les tables avec { force: true })
        await sequelize.sync({ force: true }); 
        console.log('Les tables ont été synchronisées (schema créé).');

        const seedCategories = require('./seeders/seedCategories');
        const seedEvents = require('./seeders/seedEvents');
        
        // Exécuter le seeding
        await seedCategories();
        await seedEvents(); 
        
        // Démarrer le serveur Express
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
            console.log(`CORS est configuré pour l'origine: http://localhost:5173`);
        });

    } catch (error) {
        console.error('Erreur de démarrage du serveur ou de connexion à la DB:', error);
        // Quitter l'application si la base de données ne peut pas être initialisée
        process.exit(1);
    }
};

startServer();