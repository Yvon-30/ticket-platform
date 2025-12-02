// backend/controllers/bookingController.js

const { sequelize } = require('../config/database');
const Booking = require('../models/Booking');
const Event = require('../models/Event');

/**
 * Gère la création d'une nouvelle réservation de billets.
 * Utilise une transaction pour garantir la cohérence des stocks de billets.
 */
exports.createBooking = async (req, res) => {
    // 1. Validation des données d'entrée
    const { event_id, quantity, customer_name, customer_email } = req.body;

    if (!event_id || !quantity || !customer_name || !customer_email) {
        return res.status(400).json({ message: "Veuillez fournir l'ID de l'événement, la quantité, le nom et l'email du client." });
    }

    const numQuantity = parseInt(quantity, 10);
    if (isNaN(numQuantity) || numQuantity <= 0) {
        return res.status(400).json({ message: "La quantité de billets doit être un nombre positif." });
    }

    let transaction; // Déclaration de la variable de transaction

    try {
        // Début de la transaction pour l'atomicité de l'opération
        transaction = await sequelize.transaction();

        // 2. Récupérer l'événement et verrouiller la ligne pour la transaction
        const event = await Event.findByPk(event_id, { transaction, lock: transaction.LOCK.UPDATE });

        if (!event) {
            await transaction.rollback();
            return res.status(404).json({ message: "Événement non trouvé." });
        }

        const ticketsAvailable = event.total_tickets;
        
        // 3. Vérification du stock disponible
        if (ticketsAvailable < numQuantity) {
            await transaction.rollback();
            return res.status(409).json({ message: `Seulement ${ticketsAvailable} billets sont disponibles pour cet événement.` });
        }

        // 4. Calcul du prix total
        const ticketPrice = event.price_numeric || 10; // Utilisation d'un champ numérique pour le prix, ou 10 par défaut
        const totalPrice = numQuantity * ticketPrice;

        // 5. Création de la réservation
        const newBooking = await Booking.create({
            event_id,
            customer_name,
            customer_email,
            quantity: numQuantity,
            total_price: totalPrice,
            status: 'Confirmed', // Définir comme confirmé pour cet exemple
        }, { transaction });

        // 6. Mise à jour du stock d'événements
        const newStock = ticketsAvailable - numQuantity;
        await event.update({ total_tickets: newStock }, { transaction });

        // 7. Validation de la transaction
        await transaction.commit();

        res.status(201).json({ 
            message: "Réservation réussie. Le paiement est simulé.",
            booking: newBooking,
            new_stock: newStock
        });

    } catch (error) {
        // En cas d'erreur, annuler toute modification effectuée dans la transaction
        if (transaction) await transaction.rollback();
        console.error("Erreur lors de la création de la réservation:", error);
        res.status(500).json({ message: "Erreur interne du serveur lors de la réservation." });
    }
};