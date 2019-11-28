const https = require('https');

const options = {
    'keepAlive'      : true,
    'maxSockets'     : 35,
    'keepAliveMsecs' : 1500
};

const agent = new https.Agent(options);

const REQUEST_GLOBALS = Object.freeze({
    'gzip'           : true,
    'json'           : true,
    'strictSSL'      : false,
    'agent'          : agent
});

module.exports = REQUEST_GLOBALS;