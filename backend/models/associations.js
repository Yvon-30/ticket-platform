// backend/models/associations.js

const User = require('./User');
const Event = require('./Event');
const Category = require('./Category');
const Organizer = require('./Organizer');
const Ticket = require('./Ticket');
const Booking = require('./Booking');

// 1. Associations One-to-Many
// A Category has many Events
Category.hasMany(Event, {
    foreignKey: 'categoryId',
    as: 'events', // Alias pour l'accès de Category à Event (ex: Category.findAll({ include: 'events' }))
});

// An Event belongs to a Category
Event.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category_data', // <<< AJOUT CRITIQUE POUR LE CONTRÔLEUR !
});

// An Organizer has many Events
Organizer.hasMany(Event, {
    foreignKey: 'organizerId',
    as: 'organized_events',
});

// An Event belongs to an Organizer
Event.belongsTo(Organizer, {
    foreignKey: 'organizerId',
    as: 'organizer_data', // <<< AJOUT CRITIQUE POUR LE CONTRÔLEUR !
});

// A User has many Bookings
User.hasMany(Booking, {
    foreignKey: 'userId',
    as: 'bookings',
});

// A Booking belongs to a User
Booking.belongsTo(User, {
    foreignKey: 'userId',
    as: 'customer',
});


// 2. Associations Many-to-Many (via Booking)
// An Event has many Tickets
Event.hasMany(Ticket, {
    foreignKey: 'eventId',
    as: 'tickets',
});

// A Ticket belongs to an Event
Ticket.belongsTo(Event, {
    foreignKey: 'eventId',
    as: 'event_details',
});

// A Ticket has many Bookings (chaque ligne de réservation correspond à un type de ticket)
Ticket.hasMany(Booking, {
    foreignKey: 'ticketId',
    as: 'ticket_bookings',
});

// A Booking belongs to a Ticket Type
Booking.belongsTo(Ticket, {
    foreignKey: 'ticketId',
    as: 'ticket_type',
});

// Exportez tous les modèles après les avoir associés pour faciliter l'importation dans les contrôleurs
module.exports = {
    User,
    Event,
    Category,
    Organizer,
    Ticket,
    Booking,
};