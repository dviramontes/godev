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
      res.json(500, { err: err.message });
    } else {
      var data = json.parse(req.body);
      data.auth = buffer.toString('hex');

      Ticket.create(data, function(err, ticket) {
        if (err) {
          res.json(500, { err: err.message });
        } else {
          // TODO: email or text with link to manage page

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
      res.json(500, { err: err.message });
    } else {
      res.json(200, ticket);
    }
  });
});

server.get('/random', function(req, res, next) {
  res.json(404, { err: "not written yet" });
  // TODO: return random ticket data
});

server.delete('/ticket/:auth', function(req, res, next) {
  Ticket.find({ auth: req.params.auth }).exec(function(err, ticket) {
    if (err) {
      res.json(500, { err: err.message });
    } else {
      ticket.remove(function(err) {
        if (err) {
          res.json(500, { err: err.message });
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
