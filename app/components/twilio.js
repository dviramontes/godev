var client = require('twilio')(accountSid, authToken);

client.calls.create({
    from: "+17208970284",
    method: "GET",
    fallbackMethod: "GET",
    statusCallbackMethod: "GET",
    record: "false"
}, function(err, call) {
    console.log(call.sid);
});