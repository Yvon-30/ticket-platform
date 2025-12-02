const express = require('express');
const router = express.Router();

// Importation du contrôleur. C'est ici que l'objet 'eventController' est 'undefined' 
// si une dépendance circulaire existe.
const eventController = require('../controllers/eventController'); 

// --- DEBOGAGE : Si ces logs indiquent 'undefined', la boucle d'importation est le problème ---
// Le fait que vous les ayez vus dans la console confirme ce diagnostic.
console.log('Vérification de getAllEvents:', typeof eventController.getAllEvents);
console.log('Vérification de getEventById:', typeof eventController.getEventById);
// --- FIN DEBOGAGE ---

// Route pour la création d'un événement (Souvent placé avant les routes d'ID pour une meilleure clarté)
// Chemin complet : POST /api/events
router.post('/', eventController.createEvent);

// Route pour récupérer TOUS les événements
// Chemin complet : GET /api/events
router.get('/', eventController.getAllEvents); 

// Route pour récupérer UN seul événement par ID
// Chemin complet : GET /api/events/:id
router.get('/:id', eventController.getEventById); 

// Route pour la mise à jour d'un événement
// Chemin complet : PUT /api/events/:id
router.put('/:id', eventController.updateEvent);

// Route pour la suppression d'un événement
// Chemin complet : DELETE /api/events/:id
router.delete('/:id', eventController.deleteEvent);

module.exports = router;