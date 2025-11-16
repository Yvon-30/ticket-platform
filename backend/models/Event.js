
// backend/models/Event.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Event = sequelize.define('Event', {
    event_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // CORRECTION : Renommé en date_time pour correspondre au seeder
    date_time: {
        type: DataTypes.DATE,
        allowNull: false, 
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false, 
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    total_tickets: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    // NOUVEAU : Ajouté pour correspondre aux données du seeder
    status: {
        type: DataTypes.ENUM('Draft', 'Published', 'Cancelled', 'Completed'),
        allowNull: false,
        defaultValue: 'Draft',
    },
    // NOUVEAU : Ajouté pour correspondre aux données du seeder
    image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    organizer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: 'events',
    timestamps: true,
});

// Les associations sont définies dans server.js.

module.exports = Event;