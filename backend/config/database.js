// backend/config/database.js

const { Sequelize } = require('sequelize');

// CHEMIN CORRIGÉ : Accède à config.json en remontant d'un dossier (../) pour le trouver 
// dans la racine de 'backend'.
const config = require('../config.json'); 

// Nous utilisons l'environnement 'development'
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Création de l'instance Sequelize
const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
        // Ces options sont très utiles pour garantir l'UTF-8
        dialectOptions: {
            charset: 'utf8mb4'
        },
        define: {
            // Configuration underscore des noms de colonnes et tables
            underscored: true
        },
        // Utilisez la variable d'environnement pour contrôler le log des requêtes SQL
        logging: process.env.NODE_ENV === 'development' ? console.log : false
    }
);

// Cette fonction est responsable de la connexion et de la synchronisation de la BDD
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connexion à la base de données établie avec succès.');

        // Synchroniser les modèles (crée les tables si elles n'existent pas)
        // Note: { alter: true } est utile en dev pour mettre à jour les tables
        await sequelize.sync({ alter: true }); 
        console.log('✅ Synchronisation des modèles avec la base de données terminée.');

        // Ici, vous pouvez appeler vos fonctions de "seed" si nécessaire
        // Exemple : seedData(); 

    } catch (err) {
        console.error('\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        console.error('ERREUR GRAVE: Échec de la connexion ou de la synchronisation de la BDD.');
        console.error('Détails de l\'erreur:', err.message);
        console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n');
        // N'arrêtez pas le processus ici, pour permettre à nodemon de continuer à fonctionner
        // process.exit(1); 
    }
}

module.exports = {
    sequelize,
    initializeDatabase
};