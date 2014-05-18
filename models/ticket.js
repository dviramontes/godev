var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
passportLocalMongoose = require('passport-local-mongoose');


var TicketSchema = new Schema({
    needs: String,
    about: String,
    longitude: Number,
    latitude: Number,
    location: String,
    auth: String
});

TicketSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Ticket', TicketSchema, 'Ticket');