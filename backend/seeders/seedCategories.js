// backend/seeders/seedCategories.js
const Category = require('../models/Category');

const seedCategories = async () => {
    try {
        // --- NETTOYAGE RETIRÉ ---
        // Le nettoyage (TRUNCATE/DELETE) est désormais géré de manière
        // centralisée et sécurisée dans server.js.

        const categoriesData = [
            { name: "Concerts", slug: "concerts", icon: "🎶" },
            { name: "Conférences", slug: "conferences", icon: "💻" },
            { name: "Spectacles", slug: "spectacles", icon: "🎭" },
            { name: "Sports", slug: "sports", icon: "⚽" },
            { name: "Théâtre", slug: "theatre", icon: "🎭" },
            { name: "Expositions", slug: "expositions", icon: "🖼️" },
            { name: "Événements religieux", slug: "religieux", icon: "🙏" },
        ];

        await Category.bulkCreate(categoriesData);
        console.log("Catégories amorcées avec succès.");
    } catch (error) {
        console.error("Erreur lors de l'amorçage des catégories:", error);
    }
};

module.exports = seedCategories;