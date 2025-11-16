// backend/models/Category.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Nom de la catégorie (ex: Concerts)',
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Version kebab-case du nom (ex: concerts)',
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Emoji ou chemin d icône pour la catégorie',
    },
}, {
    tableName: 'Categories',
    timestamps: false,
});

module.exports = Category;