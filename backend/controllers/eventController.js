
// backend/controllers/eventController.js



// Importation des modèles après qu'ils aient été associés dans models/associations.js

const { Event, Category, Organizer } = require('../models/associations');



// Définition de l'objet d'inclusion pour la réutilisation dans getAllEvents et getEventById

const eventIncludeOptions = [

    {

        model: Category,

        as: 'category_data',

        attributes: ['id', 'name']

    },

    {

        model: Organizer,

        as: 'organizer_data',

        attributes: ['id', 'name', 'contact_email']

    }

];



/**

 * Récupère tous les événements avec leurs détails de catégorie et d'organisateur.

 */

exports.getAllEvents = async (req, res) => {

    try {

        const events = await Event.findAll({

            // Inclusion des modèles associés

            include: eventIncludeOptions,

            // Ordonner les événements par date

            order: [

                ['date', 'ASC']

            ]

        });



        if (!events || events.length === 0) {

            return res.status(404).json({ message: 'Aucun événement trouvé.' });

        }

       

        res.status(200).json(events);

    } catch (err) {

        console.error('Erreur lors de la récupération des événements:', err);

        res.status(500).json({

            error: 'Échec de la récupération des événements en raison d\'une erreur interne du serveur.',

            details: err.message

        });

    }

};



/**

 * Récupère un événement spécifique par son ID, y compris ses associations.

 */

exports.getEventById = async (req, res) => {

    try {

        const event = await Event.findByPk(req.params.id, {

            // Inclusion des modèles associés

            include: eventIncludeOptions,

        });



        if (!event) {

            return res.status(404).json({ message: `Événement avec ID ${req.params.id} non trouvé.` });

        }



        res.status(200).json(event);

    } catch (err) {

        console.error(`Erreur lors de la récupération de l'événement ${req.params.id}:`, err);

        res.status(500).json({

            error: 'Échec de la récupération de l\'événement en raison d\'une erreur interne du serveur.',

            details: err.message

        });

    }

};



/**

 * Crée un nouvel événement.

 */

exports.createEvent = async (req, res) => {

    try {

        // Valide les données ici si nécessaire (ex: s'assurer que category_id et organizer_id sont présents)

        const newEvent = await Event.create(req.body);



        // Optionnel: récupérer l'événement créé avec les associations pour le renvoyer

        const createdEvent = await Event.findByPk(newEvent.id, {

            include: eventIncludeOptions

        });



        res.status(201).json(createdEvent);

    } catch (err) {

        console.error('Erreur lors de la création de l\'événement:', err);

        // 400 Bad Request pour les erreurs de validation de données/Sequelize

        res.status(400).json({

            error: 'Échec de la création de l\'événement.',

            details: err.message

        });

    }

};



/**

 * Met à jour un événement existant par son ID.

 */

exports.updateEvent = async (req, res) => {

    try {

        const [updatedRowsCount] = await Event.update(req.body, {

            where: { id: req.params.id }

        });



        if (updatedRowsCount === 0) {

            return res.status(404).json({ message: `Événement avec ID ${req.params.id} non trouvé ou aucune donnée à mettre à jour.` });

        }



        // Récupérer l'événement mis à jour pour le renvoyer au client

        const updatedEvent = await Event.findByPk(req.params.id, {

            include: eventIncludeOptions

        });



        res.status(200).json(updatedEvent);

    } catch (err) {

        console.error(`Erreur lors de la mise à jour de l'événement ${req.params.id}:`, err);

        // 400 Bad Request pour les erreurs de validation de données/Sequelize

        res.status(400).json({

            error: 'Échec de la mise à jour de l\'événement.',

            details: err.message

        });

    }

};



/**

 * Supprime un événement par son ID.

 */

exports.deleteEvent = async (req, res) => {

    try {

        const deletedRowCount = await Event.destroy({

            where: { id: req.params.id }

        });



        if (deletedRowCount === 0) {

            return res.status(404).json({ message: `Événement avec ID ${req.params.id} non trouvé.` });

        }



        // 204 No Content est la réponse standard pour une suppression réussie sans corps de réponse.

        res.status(204).send();

    } catch (err) {

        console.error(`Erreur lors de la suppression de l'événement ${req.params.id}:`, err);

        res.status(500).json({

            error: 'Échec de la suppression de l\'événement en raison d\'une erreur interne du serveur.',

            details: err.message

        });

    }

}