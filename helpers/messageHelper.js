const moment = require('moment');

function createSlackMessage(analysisReport) {
    return `\*LightHouse Analysis Report | ${moment().locale('tr').format("dddd, Do MMMM YYYY, h:mm:ss")}\*
    \*Target : ${analysisReport.url} \*\`\`\`${JSON.stringify(analysisReport, null, 2)}\`\`\`
    `;
}


module.exports = {
    createSlackMessage : createSlackMessage
}