// backend/config/database.js
const { Sequelize } = require('sequelize');

// Assurez-vous que les variables d'environnement sont chargées
// (Normalement géré par require('dotenv').config() dans server.js)

// Configuration de la connexion MySQL
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // Passer à true pour voir les requêtes SQL
    }
);

/**
 * Tente d'établir et d'authentifier la connexion à la base de données.
 */
const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion à MySQL établie avec succès.');
    } catch (error) {
        console.error('Impossible de se connecter à la base de données:', error);
        // En cas d'échec critique, on peut choisir de jeter l'erreur ou d'arrêter l'application
        throw new Error("Échec de l'authentification à la base de données.");
    }
};

module.exports = {
    sequelize,
    initializeDatabase, // 💡 Exportation correcte de la fonction
};