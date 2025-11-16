// backend/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
// Importe les fonctions du contrôleur
const { getAllEvents } = require('../controllers/eventController'); 

// Définit la route GET /api/events/
// Note: Le préfixe /api/events sera appliqué dans server.js
router.get('/', getAllEvents);

module.exports = router;