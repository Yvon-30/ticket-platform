const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const Event = sequelize.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    // NOUVEAU CHAMP CRITIQUE POUR L'AFFICHAGE FRONTAUX
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
        // Fournir une image de placeholder par défaut si aucune URL n'est fournie
        defaultValue: 'https://placehold.co/600x400/CCCCCC/333333?text=Image+Bient%C3%B4t+Disponible',
    },
    // Clé étrangère pour la Catégorie
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // Clé étrangère pour l'Organisateur
    organizerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: 'events',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    // Mettre `underscored: true` est une bonne pratique
    underscored: true,
});

module.exports = Event;