// backend/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
// Note: Le hachage est géré dans le modèle, nous n'avons besoin que de jwt ici.

// Clé secrète JWT (à placer dans un fichier .env en production)
const JWT_SECRET = 'votre_cle_secrete_tres_sure_et_longue'; 

// Génère un JWT pour l'utilisateur
const generateToken = (user) => {
    // Le token inclut l'ID et le rôle pour les middlewares de protection
    return jwt.sign(
        { id: user.user_id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' } // Token expire après 1 jour
    );
};

// @desc    Enregistrer un nouvel utilisateur
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    // On assume que le rôle est 'customer' par défaut pour l'inscription publique
    const { username, email, password } = req.body; 

    // Validation basique des données
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Veuillez fournir un nom d\'utilisateur, un email et un mot de passe.' });
    }

    try {
        // 1. Vérification si l'utilisateur existe déjà
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'L\'utilisateur existe déjà avec cet email.' });
        }

        // 2. Création de l'utilisateur (le hook beforeCreate va hacher le mot de passe)
        const user = await User.create({
            username,
            email,
            password,
            role: 'customer', // Toujours 'customer' pour l'inscription
        });

        // 3. Réponse (on n'inclut jamais le mot de passe)
        res.status(201).json({
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });

    } catch (error) {
        console.error('Erreur lors de l\'enregistrement:', error);
        // Gestion des erreurs de validation de Sequelize
        if (error.name === 'SequelizeValidationError') {
             return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Erreur du serveur lors de l\'enregistrement.' });
    }
};

// @desc    Authentifier l'utilisateur et obtenir le token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validation basique des données
    if (!email || !password) {
        return res.status(400).json({ message: 'Veuillez fournir un email et un mot de passe.' });
    }

    try {
        // 1. Trouver l'utilisateur par email
        const user = await User.findOne({ where: { email } });

        // 2. Vérification de l'utilisateur et du mot de passe
        if (user && (await user.comparePassword(password))) {
            // Mots de passe correspondent, renvoyer le token
            res.json({
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user),
            });
        } else {
            // Échec de la connexion
            res.status(401).json({ message: 'Email ou mot de passe invalide.' });
        }

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur du serveur lors de la connexion.' });
    }
};