/**
 * This is the main server for the app.
 */


const bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express');

const appRouter = require('./app-routes');
const apiRouter = require('./app-api');


/**
 * Start the app server on a port.
 */
exports.start = port => {

    let app = express();

    app.use(bodyParser.json());
    app.use((req, res, next) => {
        console.log('App server request', req.method, req.path);

        next();
    });

    app.use(appRouter);
    app.use('/api', apiRouter);

    app.listen(port, () => {
        console.log(chalk.blue('App server'), 'listening on port', port);
    });

};
