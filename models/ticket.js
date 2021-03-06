var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
passportLocalMongoose = require('passport-local-mongoose');


var TicketSchema = new Schema({
    email: String,
    phoneNumber: String, // Must be in the format +1303777777
    needs: String,
    about: String,
    longitude: Number,
    latitude: Number,
    location: String,
    auth: String,
    ident: String
});

TicketSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Ticket', TicketSchema, 'Ticket');