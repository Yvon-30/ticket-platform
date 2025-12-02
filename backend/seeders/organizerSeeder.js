// backend/seeders/organizerSeeder.js
const Organizer = require('../models/Organizer');
const { hashPassword } = require('../utils/auth'); // Import de l'utilitaire de hachage

const seedOrganizer = async () => {
    try {
        let mainOrganizer = await Organizer.findByPk(1);

        if (!mainOrganizer) {
            // Un mot de passe par défaut est nécessaire pour le hachage
            const defaultPassword = 'superSecurePassword42!'; 
            const passwordHash = await hashPassword(defaultPassword);

            // Création de l'organisateur AVEC le champ password_hash
            mainOrganizer = await Organizer.create({
                organizer_id: 1,
                name: "Main Organizer (Admin)",
                email: "admin@ticketplatform.com",
                password_hash: passwordHash, // <-- Correction ici : fournit la valeur non-null
                contact_phone: '+33 1 23 45 67 89'
            });
            console.log(`✅ Organisateur principal créé (ID: ${mainOrganizer.organizer_id}). Mot de passe par défaut: "${defaultPassword}"`);
        } else {
            console.log("L'organisateur principal existe déjà. Amorçage ignoré.");
        }
    } catch (error) {
        // Afficher uniquement l'erreur de message pour ne pas surcharger la console
        console.error("Erreur lors de l'amorçage de l'organisateur:", error.message);
    }
};

module.exports = seedOrganizer;