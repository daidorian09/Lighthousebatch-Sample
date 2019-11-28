const express = require('express');
const cors = require('cors');
const morgan  = require('morgan');
const PORT = 7071;

// Initialize the app
const app = express();

app.set('port', PORT);
app.use(cors());
app.use(morgan());


// Bind all api endpoints
require('./routes')(app)

process
    .on('unhandledRejection', (reason, p) => {
        console.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        console.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    })
    .on('rejectionHandled', err => {
        console.error(err, 'rejectionHandled');
    })

app.listen(PORT, () => {
    console.info(`App is running on http://localhost:${PORT}`)
})