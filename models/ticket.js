var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;


var TicketSchema = new Schema({
	materials : Array
});

TicketSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Ticket', TicketSchema, 'Ticket');
