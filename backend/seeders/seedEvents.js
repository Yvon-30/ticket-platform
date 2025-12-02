// backend/seeders/seedEvents.js

const Event = require('../models/Event');
const Category = require('../models/Category');
const Organizer = require('../models/Organizer');
const { Op } = require('sequelize');

const seedEvents = async () => {
    try {
        // 1. Récupérer l'organisateur principal (ID 1)
        const mainOrganizer = await Organizer.findByPk(1);
        if (!mainOrganizer) {
            console.error("L'organisateur principal (ID 1) n'a pas été trouvé. Impossible d'amorcer les événements.");
            return; 
        }

        // 2. Récupérer les IDs des catégories (Basé sur le seeder de catégories fourni)
        const categoryNames = ['Concerts', 'Conférences', 'Sports', 'Spectacles', 'Théâtre'];
        const categories = await Category.findAll({
            attributes: ['category_id', 'name'],
            where: { name: { [Op.in]: categoryNames } }
        });
        
        // Mapping des catégories par nom pour une attribution facile
        const getCategoryId = (name) => {
            const category = categories.find(c => c.name === name);
            return category ? category.category_id : null; 
        };

        const eventData = [
            {
                title: "Grand Concert Symphonique",
                description: "Le chef d'orchestre R. Dubois dirige le 9e de Beethoven. Une soirée mémorable.",
                date_time: new Date('2026-03-20T20:00:00Z'),
                location: "Salle Pleyel",
                price: 80.00,
                total_tickets: 1500,
                status: "Published",
                image_url: "https://images.unsplash.com/photo-1548457701-c6a5aa364f49?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                organizer_id: mainOrganizer.organizer_id,
                category_id: getCategoryId('Concerts') 
            },
            {
                title: "Sommet de l'IA et de l'Éthique",
                description: "Une journée complète de débats sur l'impact social et éthique de l'Intelligence Artificielle.",
                date_time: new Date('2026-04-15T09:00:00Z'),
                location: "Centre des Congrès Paris",
                price: 150.00,
                total_tickets: 600,
                status: "Published",
                image_url: "https://media.istockphoto.com/id/2224633029/photo/ai-ethical-concept.jpg?s=1024x1024&w=is&k=20&c=D45oQP6erCbJpc_vWB8wiU0UW2j-9RtynDW8jDYFTnc=",
                organizer_id: mainOrganizer.organizer_id,
                category_id: getCategoryId('Conférences')
            },
            {
                title: "Match de Football : Finale de la Ligue",
                description: "La finale très attendue entre les deux meilleures équipes de la saison.",
                date_time: new Date('2026-05-01T21:00:00Z'),
                location: "Stade de France",
                price: 110.00,
                total_tickets: 50000,
                status: "Published",
                image_url: "https://images.unsplash.com/photo-1695203063729-f0251b8e9e4c?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                organizer_id: mainOrganizer.organizer_id,
                category_id: getCategoryId('Sports')
            },
            {
                title: "La Pièce 'Le Dîner de Cons'",
                description: "Revivez ce classique de l'humour français. Une soirée de rires garantis.",
                date_time: new Date('2026-02-10T19:00:00Z'),
                location: "Théâtre des Variétés",
                price: 45.00,
                total_tickets: 300,
                status: "Published",
                image_url: "http://images.unsplash.com/photo-1571397946750-99369f2a4e53?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                organizer_id: mainOrganizer.organizer_id,
                category_id: getCategoryId('Théâtre')
            }
        ];

        const existingEventsCount = await Event.count();

        if (existingEventsCount === 0) {
            // Filtrer les événements pour lesquels la catégorie a été trouvée (catégorie_id non null)
            const validEventData = eventData.filter(e => e.category_id !== null);
            await Event.bulkCreate(validEventData);
            console.log(`✅ ${validEventData.length} Événements amorcés avec succès.`);
        } else {
            console.log('Les événements existent déjà. Amorçage ignoré.');
        }

    } catch (error) {
        console.error("Erreur lors de l'amorçage des événements:", error);
    }
};

module.exports = seedEvents;