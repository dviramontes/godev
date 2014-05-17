var twilioAuth = require("./config");
accountSid = twilioAuth.api.twilio.accountSid;
authToken = twilioAuth.api.twilio.authToken;
console.log(twilioAuth.api.twilio);
var client = require('twilio')(accountSid, authToken);

client.calls.create({
    from: "+17208970284",
    to: "+13038596599",
    url: "http://107.170.192.17:8080/", //"http://127.0.0.1:1337/", //"http://demo.twilio.com/welcome/voice/"
    //method: "GET",
    //fallbackMethod: "GET",
    //statusCallbackMethod: "GET",
    //record: "false"
}, function(err, call) {
    console.log(call.sid);
});

var sendText = function(msg) {
    client.sendMessage({
            to: '+13038596599',
            from: "+17208970284",
            body: msg
        },
        function(err, responseData) { //this function is executed when a response is received from Twilio

            if (!err) { // "err" is an error received during the request, if any

                // "responseData" is a JavaScript object containing data received from Twilio.
                // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
                // http://www.twilio.com/docs/api/rest/sending-sms#example-1

                console.log(responseData.from); // outputs "+14506667788"
                console.log(responseData.body); // outputs "word to your mother."
            }
        });
}

//var resp = new twilio.TwimlResponse();