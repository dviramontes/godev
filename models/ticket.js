var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
passportLocalMongoose = require('passport-local-mongoose');


var TicketSchema = new Schema({
    materials: Array
});

TicketSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Ticket', TicketSchema, 'Ticket');