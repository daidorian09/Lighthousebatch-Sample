const TARGET_PAGES = require('../constants/targetPagesConstants');

function createPageEndpoint() {
    return TARGET_PAGES.length > 1 ?
        TARGET_PAGES.join(',') :
        TARGET_PAGES;
}

module.exports = {
    createPageEndpoint: createPageEndpoint
}