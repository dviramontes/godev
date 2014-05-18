var sendgridAuth = require('./config');
var mongoose = require('mongoose');
//var mongodb = require('./config').api.mongodb;
var mongodb = sendgridAuth.api.mongodb;
var restify = require('restify');
var crypto = require('crypto');
var Ticket = require('./models/ticket');

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
var twilio = require('./twilio.js');

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

server.get('/ticket/:id', function(req, res, next) {
    // console.log('pritingin..');
    // console.log(typereq.params.id);
    Ticket.find({"id":req.params.id}, function(err, ticket) {
        if (err) {
            res.json(500, {
                err: err.message
            });
        } else {
            res.json(200, ticket);
        }
    });
});

server.del('/ticket/:auth', function(req, res, next) {

    Ticket.remove({
        auth: req.params.auth
    }, function(err, ticket) {
        if (err) {
            return next(
                new restify.InvalidArgumentError(JSON.stringify(err.errors))
            );
        }
        res.send(204);
    });

    // Ticket.find({
    //     auth: req.params.auth
    // }).exec(function(err, ticket) {
    //     if (err) {
    //         res.json(500, {
    //             err: err.message
    //         });
    //     } else {
    //         ticket.remove(function(err) {
    //             if (err) {
    //                 res.json(500, {
    //                     err: err.message
    //                 });
    //             } else {
    //                 res.status(204);
    //                 res.end();
    //             }
    //         });
    //     }
    // });
});


server.get('/random', function(req, res, next) {
    // var num = req.params.number;
    Ticket.find()
        .limit(1)
        .skip(Math.floor(Math.random() * 20))
        .exec(function(err, doc) {
            if (err) throw err;
            res.json(200, doc);
        });
        
});

server.get(/.*/, restify.serveStatic({
    'directory': './build',
    'default': 'index.html'
}));

server.listen(8080);

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
