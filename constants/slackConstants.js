const uuid = require('uuid')
const SLACK_HEADERS = Object.freeze({
    'Content-Type'    : 'application/json',
    'x-correlationId' :  uuid.v1(),
    'X-Requested-By'  : 'X-Requested-By',
    'x-agentName'     : 'lighthousebatch-analyzer'
});

const SLACK_URL = Object.freeze({
    'url' : 'your-slack-hook-url'
});

module.exports = {
    SLACK_HEADERS : SLACK_HEADERS,
    SLACK_URL : SLACK_URL
 };