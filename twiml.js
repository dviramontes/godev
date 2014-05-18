var twilio = require('twilio');
var http = require('http');
var createNewVoiceMessage = function() {

}

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

http.createServer(function(req, res) {
    //Create TwiML response
    console.log("The request is " + req.object);
    var twiml = new twilio.TwimlResponse();
    twiml.say('Hello World!', {
        voice: 'woman',
        language: 'en-gb'
    });

    res.writeHead(200, {
        'Content-Type': 'text/xml'
    });
    console.log("Twiml response\n" + twiml.toString());
    res.end(twiml.toString());

}).listen(8080, 'localhost');

console.log('TwiML servin\' server running at http://127.0.0.1:1337/');

//console.log(resp.toString());