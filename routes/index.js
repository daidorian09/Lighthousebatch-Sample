const fs = require('fs')

module.exports = (app) => {
  
  // Register API routes
  fs.readdirSync(__dirname + '/apis/').forEach((file) => {
    require(`./apis/${file.substr(0, file.indexOf('.'))}`)(app)
  })
}