/**
 * This is the server for Kue and Kue UI.
 */


const chalk = require('chalk');
const express = require('express');
const kue = require('kue');


/**
 * Start the kue server on a port.
 */
exports.start = port => {

    const app = express();

    app.use(kue.app);

    app.listen(port, () => {
        console.log(chalk.blue('Kue server'), 'listening on port', port);
    });

};
