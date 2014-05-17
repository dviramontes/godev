var sendgridAuth = require('./config');
var mongoose = require('mongoose');
var mongodb = require('./config').api.mongodb;
var restify = require('restify');

var Ticket = require('./models/ticket');

var server = restify.createServer({
	name: 'GovDev'
});

server.listen()

// mongoose.connect('mongodb://'+ mongodb.user +':'+ mongodb.pass+'@'+ mongodb.url);
mongoose.connect('mongodb://'+ mongodb.url);

mongoose.connection.on('open', function() {
    console.log('database opened');
});

mongoose.connection.on('error', function(err) {
	if(err)throw err;
	console.log(error)
});

var api_user = sendgridAuth.api.sendgrid.username;
var api_key = sendgridAuth.api.sendgrid.password;

var sendgrid = require('sendgrid')(api_user, api_key);


server.get(/.*/, restify.serveStatic({
    'directory': './build',
    'default': 'index.html'
}));

// sendgrid.send({
//     to: 'dviramontes@gmail.com',
//     from: 'other@example.com',
//     subject: 'Hello World!! batman',
//     text: 'My first email through SendGrid.'
// }, function(err, json) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log(json);
// });
