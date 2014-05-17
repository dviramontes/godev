var api_user,
api_key;

var sendgridAuth = require('./config');

api_user = sendgridAuth.api.sendgrid.username;
api_key = sendgridAuth.api.sendgrid.password;

console.log(sendgridAuth)

var sendgrid  = require('sendgrid')(api_user, api_key);

sendgrid.send({
  to:       'dviramontes@gmail.com',
  from:     'other@example.com',
  subject:  'Hello World!! batman' ,
  text:     'My first email through SendGrid.'
}, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});