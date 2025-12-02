// backend/server.js

const sequelize = require('./config/database').sequelize; // S'assurer que vous importez l'instance de sequelize
const seedDatabase = require('./seeders/seedData');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors'); // <-- NOUVEAU: Importation du middleware CORS

// ----------------------------------------------------------------------
// Importation des modèles et des associations
// ----------------------------------------------------------------------
require('./models/User');
require('./models/Category');
require('./models/Organizer');
require('./models/Event');
require('./models/Ticket'); 
require('./models/Booking'); 
require('./models/associations'); 

// Importation des routes API
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes'); // Importation des routes d'authentification

// --- Phase 1: Connexion et Synchronisation BDD ---
async function startApplication() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données établie avec succès.');

        // NOUVEAU: Utiliser `force: true` en mode DEV pour un environnement propre
        const isDevelopment = process.env.NODE_ENV !== 'production';
        
        // Laisser la synchronisation avec force: true pour le développement initial
        await sequelize.sync({ force: isDevelopment });
        
        console.log('✅ Synchronisation des modèles avec la base de données terminée.');

        // --- Phase 2: Seeding des données ---
        if (isDevelopment) {
            console.log('--- Début du Seeding des données ---');
            await seedDatabase();
            console.log('--- Seeding des données terminé ---');
        }

        // --- Phase 3: Démarrage du serveur et configuration des routes ---
        
        // Configuration CORS pour autoriser le frontend (Vite/React sur port 5173)
        const corsOptions = {
            // L'origine de votre application React (qui fait la requête)
            origin: 'http://localhost:5173', 
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
            optionsSuccessStatus: 204
        };

        // 1. Middleware CORS: doit venir en premier pour autoriser l'accès
        app.use(cors(corsOptions));
        
        // 2. Middleware pour parser le JSON dans le corps des requêtes
        app.use(express.json());

        // Middleware de routage
        // Routes d'authentification: /api/auth/...
        app.use('/api/auth', authRoutes); 
        
        // Routes des événements: /api/events/...
        app.use('/api/events', eventRoutes); 

        // Route par défaut (si l'utilisateur accède à la racine)
        app.get('/', (req, res) => {
            res.send('Bienvenue sur l\'API de la plateforme de billetterie. Utilisez /api/events pour la liste des événements ou /api/auth pour vous connecter/inscrire.');
        });

        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.error('ERREUR GRAVE: Le serveur n\'a pas pu démarrer.');
        const errorMessage = error.message || (error.parent && error.parent.sqlMessage) || 'Erreur inconnue';
        console.error('Détails de l\'erreur:', errorMessage);
        console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        process.exit(1); 
    }
}

startApplication();