var sendgridAuth = require('./config');
var mongoose = require('mongoose');
var twilio = require('twilio');
var messageSender = require('./twilio.js').functions;
//var mongodb = require('./config').api.mongodb;
var mongodb = sendgridAuth.api.mongodb;
var restify = require('restify');
var crypto = require('crypto');
var Ticket = require('./models/ticket');
var twilioNumber = '+17208970284';
var incrementer = 0;

var messages = {
    messageOne: {
        message: 'Whats crackin?',
        voice: 'woman',
        language: 'en-gb'
    },
    messageTwo: {
        message: 'Whats crackin2?',
        voice: 'woman',
        language: 'en-gb'
    }
}

var server = restify.createServer({
    name: 'GovDev'
});

server.use(restify.bodyParser({
    mapParams: false
}));

// mongoose.connect('mongodb://'+ mongodb.user +':'+ mongodb.pass+'@'+ mongodb.url);
console.log("Mongo URL is " + mongodb.url);
mongoose.connect('mongodb://' + mongodb.url);

mongoose.connection.on('open', function() {
    console.log('database opened');
});

mongoose.connection.on('error', function(err) {
    if (err) {
        throw err;
    }

    console.log(error)
});

var api_user = sendgridAuth.api.sendgrid.username;
var api_key = sendgridAuth.api.sendgrid.password;
var sendgrid = require('sendgrid')(api_user, api_key);

server.put('/tickets', function(req, res, next) {
    crypto.randomBytes(16, function(err, buffer) {
        if (err) {
            res.json(500, {
                err: err.message
            });
            console.log("Error Message in first if " + err.message);
        } else {
            var data = JSON.parse(req.body);
            data.auth = buffer.toString('hex');

            Ticket.create(data, function(err, ticket) {
                if (err) {
                    res.json(500, {
                        err: err.message
                    });
                    console.log("There was an error. Unable to send text message");
                } else {
                    // TODO: email or text with link to manage page
                    twilio.functions.sendText(undefined, undefined, undefined);
                    res.status(201);
                    res.end();
                }
            });
        }
    });
});

server.get('/tickets/:id', function(req, res, next) {
    var document = Ticket.findById(req.params.id, function(err, ticket) {
        if (err) {
            res.json(500, {
                err: err.message
            });
        } else {
            res.json(200, ticket);
        }
    });
});


server.get('/random', function(req, res, next) {
    res.json(404, {
        err: "not written yet"
    });
    // TODO: return random ticket data
});

server.get('/message/:personID', function(req, res) {
    console.log("Here 1");
    Ticket.findOne({
            auth: req.params.personID
        },
        function(err, person) {
            console.log(person);
            console.log("Something else");
            //var contactMethod = person.phoneNumber || person.email;
            //messages.functions.sendText(personID.phoneNumber, );
            console.log(messageSender);
            //messageSender.sendText(person.phoneNumber, undefined, undefined);
            console.log("After function call");
            if (person.phoneNumber) {
                console.log("IN IF!!");
                messageSender.sendText(person.phoneNumber, undefined, undefined);
                //return;
            }
            sendEmail(person.email, "jnels1242012@gmail.com", "This is a subject", "This is a message");
        });
    //var twiml = new twilio.TwimlResponse();
    /*twiml.say('Hello World!', {
        voice: 'woman',
        language: 'en-gb'
    });
    console.log(twiml.toString());

    res.writeHead(200, {
        'Content-Type': 'text/xml'
      });*/

    //console.log("Twiml response\n" + twiml.toString());
    //res.end(twiml.toString());
});

server.del('/ticket/:auth', function(req, res, next) {
    Ticket.find({
        auth: req.params.auth
    }).exec(function(err, ticket) {
        if (err) {
            res.json(500, {
                err: err.message
            });
        } else {
            ticket.remove(function(err) {
                if (err) {
                    res.json(500, {
                        err: err.message
                    });
                } else {
                    res.status(204);
                    res.end();
                }
            });
        }
    });
});

server.get(/.*/, restify.serveStatic({
    'directory': './build',
    'default': 'index.html'
}));

server.listen(8080);

var sendEmail = function(to, from, subject, msg) {
    sendgrid.send({
        to: to, //'dviramontes@gmail.com',
        from: from, //'other@example.com',
        subject: subject, //'Hello World!! batman',
        text: msg //'My first email through SendGrid.'
    }, function(err, json) {
        if (err) {
            return console.error(err);
        }
        console.log(json);
    });
}