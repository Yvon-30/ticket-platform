// backend/seeders/seedEvents.js
const Event = require('../models/Event');
const Organizer = require('../models/Organizer'); // Import de l'Organizer pour trouver l'ID
const { hashPassword } = require('../utils/auth'); // Import de la fonction de hachage

const seedEvents = async () => {
    try {
        // 1. CRÉATION/RÉCUPÉRATION DE L'ORGANISATEUR PRINCIPAL
        
        // Créer l'organisateur principal si non existant, ou le récupérer
        const [mainOrganizer, created] = await Organizer.findOrCreate({
            where: { email: 'admin@ticketplatform.com' },
            defaults: {
                name: 'Main Organizer',
                password_hash: await hashPassword('password123'),
                phone: '0123456789',
            },
        });

        // Récupérer l'ID de cet organisateur
        const organizerId = mainOrganizer.organizer_id;

        if (created) {
            console.log(`✅ Organisateur principal créé (ID: ${organizerId}).`);
        } else {
            console.log(`✅ Organisateur principal récupéré (ID: ${organizerId}).`);
        }
        
        // 2. DONNÉES DES ÉVÉNEMENTS
        // CHAMPS OBLIGATOIRES (basés sur Event.js) : organizer_id, title, date_time, location, status
        const eventsData = [
            {
                organizer_id: organizerId,
                title: 'Concert Gospel Night',
                // Utilisation du format MySQL DATE/TIME
                date_time: '2025-11-15 20:00:00',
                location: 'Grand Théâtre de la Ville',
                status: 'Published',
                image_url: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2',
                description: 'Une soirée inoubliable de louange et d\'adoration avec des artistes locaux et internationaux.',
            },
            {
                organizer_id: organizerId,
                title: 'Conférence Tech Africa',
                date_time: '2025-11-28 09:00:00',
                location: 'Palais des Congrès, Salle Alpha',
                status: 'Published',
                image_url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
                description: 'Le plus grand rassemblement de la technologie africaine. Venez découvrir les innovations de demain.',
            },
            // Événements supplémentaires
            {
                organizer_id: organizerId,
                title: 'Festival Jazz Étoile',
                date_time: '2025-09-10 18:30:00', 
                location: 'Parc de la Musique, Scène Principale',
                status: 'Published',
                image_url: 'https://images.pexels.com/photos/9002783/pexels-photo-9002783.jpeg?_gl=1*1ujkq8x*_ga*MTI3NDU5Mjg2My4xNzYzMzAyMzY4*_ga_8JE65Q40S6*czE3NjMzMDIzNjgkbzEkZzAkdDE3NjMzMDIzNjgkajYwJGwwJGgw',
                description: 'Trois jours de concerts avec des légendes du jazz et des talents émergents. Ambiance garantie !',
            },
            {
                organizer_id: organizerId,
                title: 'Marathon de la Ville',
                date_time: '2025-12-05 07:00:00', 
                location: 'Départ : Place Centrale',
                status: 'Published',
                image_url: 'https://images.unsplash.com/photo-1503433596707-e837136f4d8a',
                description: 'La course annuelle de 42,195 km. Défiez vos limites et explorez la ville en courant !',
            },
            {
                organizer_id: organizerId,
                title: 'Atelier de Cuisine Végétale',
                date_time: '2026-01-20 16:00:00', 
                location: 'École de Cuisine Gourmande',
                status: 'Draft', 
                image_url: 'https://images.unsplash.com/photo-1579684360340-e223b98c3b77',
                description: 'Apprenez les bases de la cuisine saine et végétale avec le Chef Antoine.',
            },
        ];

        // 3. INSERTION EN MASSE
        await Event.bulkCreate(eventsData);
        console.log("Événements amorcés avec succès.");

    } catch (error) {
        // En cas d'erreur, loggez les détails pour le débogage
        console.error("Erreur critique lors de l'amorçage des événements:", error.parent?.sqlMessage || error.message);
        throw error;
    }
};

module.exports = seedEvents;