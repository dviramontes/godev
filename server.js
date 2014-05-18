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

server.post('/reachout/:ident', function(req, res, next) {

    Ticket.findOne({
        "ident": req.params.ident
    }, function(err, ticket) {
        if (err) throw err;

        if (req.body.email && ticket.email) {
            sendEmail(ticket.email, "donotreply@howcanihelp.com", "We found someone who can help!", req.body.email + " can help you, email them to get in touch then when your need is fulfilled click on http://107.170.192.17:8080/fulfill/" + ticket.auth + " to mark it as fulfilled");
        }

        console.log(ticket.phoneNumber);
        console.log(req.body.phoneNumber);

        if (req.body.phoneNumber && ticket.phoneNumber) {
            // twilio
            // to from msg
            messageSender.sendText(ticket.phoneNumber, twilioNumber, "We found someone who can help!" + req.body.phoneNumber + " can help you, email them to get in touch then when your need is fulfilled click on http://107.170.192.17:8080/fulfill/" + ticket.auth + " to mark it as fulfilled");

        }

        res.send(201, "sent..");
    });

});

server.post('/ticket', function(req, res, next) {

    crypto.randomBytes(16, function(err, buffer) {
        if (err) {
            res.json(500, {
                err: err.message
            });
            console.log("Error in server.js post /tickets" + err.message);
        } else {

            var data = req.body;
            data.ident = buffer.toString('hex');

            crypto.randomBytes(16, function(err, buffer) {
                if (err) {
                    res.json(500, {
                        err: err.message
                    });
                    console.log("Error in server.js post /tickets" + err.message);
                } else {


                    data.auth = buffer.toString('hex');

                    Ticket.create(data, function(err, ticket) {
                        if (err) {
                            res.json(500, {
                                err: err.message
                            });
                            console.log("There was an error. Unable to send text message");
                        } else {

                            // TODO: email or text with link to manage page
                            if (data.email) {
                                sendEmail(data.email, "donotreply@howcanihelp.com", "Your request has been sent out.",
                                    "Your request sent out, when someone responds we'll (text|email) you their (number|email address) to get in touch." +
                                    "click here if you no longer need your request or it is fulfilled: 107.170.192.17:8080/fulfill/" + data.auth)
                            }
                            if (data.phoneNumber) {
                                // twilio

                            }



                            // request sent out, when someone responds we'll (text|email) you their (number|email address) to get in touch.
                            // click here if you no longer need your request or it is fulfilled: goo.gl/asdf

                            // a donator wants you to get in touch with them, their (number|email) is (666-6666|ham@steak.com).
                            // click here when you arrange for a drop off to mark your request as fulfilled: goo.gl/asdf

                            res.status(201);
                            res.end();
                        }
                    });
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

    Ticket.count(function(err, c) {

        Ticket.find()
            .limit(1)
            .skip(Math.floor(Math.random() * c))
            .exec(function(err, doc) {

                if (err) throw err;
                // TODO: we're sending auth token right now, that's bad
                res.json(200, doc);
            });
    });


});


server.get('/message/:personID', function(req, res) {

    Ticket.findOne({
            auth: req.params.personID
        },
        function(err, person) {
            if (!person.phoneNumber) {
                
                messageSender.sendText(person.phoneNumber, undefined, undefined);
                return;
            }
            sendEmail(person.email, "jnels1242012@gmail.com", "This is a subject", "This is a message");
        });
});

server.get('/fulfill/:auth', function(req, res, next) {
    
    Ticket.findOneAndRemove({
        "auth": req.params.auth
    }, function(err, ticket) {
        if (err) {
            res.json(500, {
                err: err.message
            });
        } else {
            // res.status(204);
            res.send(204);
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
