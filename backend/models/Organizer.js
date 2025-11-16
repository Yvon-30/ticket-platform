// backend/models/Organizer.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Organizer = sequelize.define('Organizer', {
  organizer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password_hash: { // 💡 Ajout de cette colonne pour corriger l'avertissement
        type: DataTypes.STRING,
        allowNull: false,
    },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'organizers', 
  timestamps: true,
});

module.exports = Organizer;