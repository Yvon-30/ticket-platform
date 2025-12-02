// backend/models/User.js
const { DataTypes } = require('sequelize');
// Importation de l'objet de configuration complet
const dbConfig = require('../config/database'); 
// Extraction de l'instance Sequelize
const sequelize = dbConfig.sequelize || dbConfig;

// Importation de bcryptjs pour le hachage des mots de passe
const bcrypt = require('bcryptjs'); 

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Valide que la valeur est un email
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        // Ce champ stockera le hachage du mot de passe
    },
    role: {
        type: DataTypes.ENUM('customer', 'admin'),
        allowNull: false,
        defaultValue: 'customer',
    },
}, {
    tableName: 'users', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// --- HOOKS (Hachage du mot de passe avant l'enregistrement/mise à jour) ---
User.beforeCreate(async (user) => {
    // Le mot de passe est haché avant d'être inséré pour la première fois
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user) => {
    // Hache le mot de passe seulement s'il a été modifié
    if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

// --- MÉTHODE INSTANCE (Comparaison du mot de passe) ---
/**
 * Compare le mot de passe soumis avec le mot de passe haché dans la base de données.
 * @param {string} candidatePassword - Le mot de passe non haché soumis par l'utilisateur.
 * @returns {Promise<boolean>} Vrai si les mots de passe correspondent.
 */
User.prototype.comparePassword = async function(candidatePassword) {
    // Utilise bcrypt pour comparer le mot de passe
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;