const rp = require('request-promise');
const SLACK_CONFIGS = require('../constants/slackConstants');
const REQUEST_GLOBALS = require('../constants/requestGlobalConstants');
const messageHelper = require('../helpers/messageHelper');

class SlackService {
    async sendAnalysisToChannel(analysisReport) {
        const url = SLACK_CONFIGS.SLACK_URL.url

        const message = messageHelper.createSlackMessage(analysisReport);

        rp.post({
            uri: url,
            body: {
                text: message
            },
            headers: SLACK_CONFIGS.SLACK_HEADERS,
            ...REQUEST_GLOBALS
        }).then(() => {
            console.log(`${analysisReport.url} analysis is sent successfully to channel`)
        }).catch(err => {
            console.error('Error on SlackService - sendAnalysisToChannel', err);
            throw err;
        })
    }
}

module.exports = SlackService
