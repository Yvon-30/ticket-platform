// backend/controllers/eventController.js
const Event = require('../models/Event');
const Organizer = require('../models/Organizer');
const Category = require('../models/Category');
const { Op } = require('sequelize'); // Utilisé pour les opérations complexes si nécessaire

/**
 * Récupère tous les événements publiés, avec les informations de l'organisateur et de la catégorie.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
const getAllEvents = async (req, res) => {
    try {
        // Option de requête pour inclure les associations (relations)
        const events = await Event.findAll({
            where: {
                status: 'Published' // On n'affiche que les événements publiés
            },
            include: [
                {
                    model: Organizer,
                    attributes: ['name', 'email'], // Sélectionne uniquement les champs nécessaires
                },
                {
                    model: Category,
                    attributes: ['name', 'icon'], // Sélectionne le nom de la catégorie et l'icône
                }
            ],
            // Tri par date pour montrer les événements à venir en premier
            order: [['date_time', 'ASC']],
        });

        // Formater la réponse pour la rendre facile à utiliser par le frontend
        const formattedEvents = events.map(event => ({
            id: event.event_id,
            title: event.title,
            description: event.description,
            // Formatage de la date pour le frontend (ex: '2025-11-16T20:00:00.000Z' -> '16 Nov 2025, 20:00')
            date_time: new Date(event.date_time).toLocaleString('fr-FR', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            location: event.location,
            price: `${event.price} XAF`, // Ajout du symbole monétaire (hypothétique)
            total_tickets: event.total_tickets,
            image: event.image_url,
            status: event.status,
            organizerName: event.Organizer ? event.Organizer.name : 'Inconnu',
            categoryName: event.Category ? event.Category.name : 'Autre',
            categoryIcon: event.Category ? event.Category.icon : '❓',
        }));

        res.status(200).json(formattedEvents);

    } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
        res.status(500).json({ 
            message: "Erreur serveur lors de la récupération des événements.",
            error: error.message 
        });
    }
};

module.exports = {
    getAllEvents,
};