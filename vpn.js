//*********************************************//
//** INSERT SERVER IP AND CREDENTIALS HERE BEFORE EXECUTING SCRIPT **//

var server = "<INSERT ASA LOCAL IP ADDRESS>";
var username = "<INSERT USERNAME>";
var password = "<INSERT PASSWORD>";

//*********************************************//

var https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var data = {};

var api_path = "/api/cli";    // param

var data = {
  "commands": [
    
    // REMOVE COMMENTS BELOW FOR THE SPECIFIC COMMAND YOU WANT TO RUN

    // SHOW ALL VPN SESSIONS
    "show vpn-sessiondb anyconnect | inc name|IP|Group|Time|Duration"

    // LOGOFF SESSION FOR SINGLE USER
    //"vpn-sessiondb logoff name chance.whittaker noconfirm"

    // LOGOFF SESSION FOR ALL USERS
    //"vpn-sessiondb logoff all noconfirm"
  ]
};

var dataString = JSON.stringify(data);

var options = {
    host: server,
    path: api_path,
    method:"POST",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64'),
        'Content-Length': dataString.length,
        'User-Agent': 'REST API Agent'
    }
}

var req = https.request(options, function(res) {
    console.log("statusCode: ", res.statusCode);
    console.log("headers: ", res.headers);

    res.on('data', function(d) {
        process.stdout.write(d);
        //console.log(d)
    });
});
req.write(dataString);
req.end();

req.on('error', function(e) {
    console.error(e);
});