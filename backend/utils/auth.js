// backend/utils/auth.js
const bcrypt = require('bcrypt');
const saltRounds = 10; // Niveau de complexité pour le hachage

/**
 * Hache un mot de passe en utilisant bcrypt.
 * @param {string} password Le mot de passe en clair.
 * @returns {Promise<string>} Le hachage du mot de passe.
 */
const hashPassword = async (password) => {
    return bcrypt.hash(password, saltRounds);
};

/**
 * Compare un mot de passe en clair avec un hachage existant.
 * @param {string} password Le mot de passe en clair à vérifier.
 * @param {string} hash Le hachage stocké dans la base de données.
 * @returns {Promise<boolean>} True si les mots de passe correspondent.
 */
const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

module.exports = {
    hashPassword,
    comparePassword,
};