/**
 * This is the main server for the app.
 */


const bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express');


/**
 * Start the app server on a port.
 */
exports.start = function startApp(port) {

    let app = express();

    app.use(bodyParser.json());
    app.use(function logger(req, res, next) {
        console.log('App server request', req.method, req.path);

        next();
    });

    app.get('/', function getIndex(req, res) {
        res.send('the app is not important yet');
    });

    app.listen(port, function appListenCallback() {
        console.log(chalk.blue('App server'), 'listening on port', port);
    });

};
