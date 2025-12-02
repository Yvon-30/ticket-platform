const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Event = require('./Event'); 

const Ticket = sequelize.define('Ticket', {
    ticket_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // 🛑 CORRIGÉ : Retrait de la définition "references" manuelle.
        // La relation est gérée dans server.js via Ticket.belongsTo(Event).
    },
    buyer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Nom du client',
    },
    buyer_email: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Email du client pour envoi du billet',
    },
    ticket_type: {
        type: DataTypes.ENUM('Standard', 'VIP', 'Early Bird'),
        defaultValue: 'Standard',
        allowNull: false,
        comment: 'Type de billet',
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
        allowNull: false,
        comment: 'Prix payé (ou 0 pour MVP test)',
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: 'Nombre de billets achetés',
    },
    unique_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Code unique pour la validation',
    },
    purchase_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Date de l acquisition',
    },
    is_valid: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, 
        allowNull: false,
        comment: 'Statut de validité du billet (true=non scanné)',
    },
}, {
    tableName: 'tickets',
    timestamps: false,
});

// Définition de la relation (si elle était dans Ticket.js)
Ticket.belongsTo(Event, { foreignKey: 'event_id' });
Event.hasMany(Ticket, { foreignKey: 'event_id' });

module.exports = Ticket;