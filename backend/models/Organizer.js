// backend/models/Organizer.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Organizer = sequelize.define('Organizer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    // Le champ manquant qui cause l'erreur
    contact_email: { 
        type: DataTypes.STRING,
        allowNull: true, // Peut être nul, mais il est préférable de le définir
        validate: {
            isEmail: true, // Validation pour s'assurer que c'est un format d'email
        }
    },
    // Ajout d'une description pour plus de contexte
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    // Options du modèle
    tableName: 'organizers',
    timestamps: true, // Ajoute createdAt et updatedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

module.exports = Organizer;