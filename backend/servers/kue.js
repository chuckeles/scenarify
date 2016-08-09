/**
 * This is the server for Kue and Kue UI.
 */


const chalk = require('chalk');
const express = require('express');
const kue = require('kue');
const kueUi = require('kue-ui');


/**
 * Start the app server on a port.
 */
exports.start = port => {

    const app = express();

    kueUi.setup({
        apiUrl: '/api',
        baseURL: '/'
    });

    app.use('/', kueUi.app);
    app.use('/api', kue.app);

    app.listen(port, () => {
        console.log(chalk.blue('Kue server'), 'listening on port', port);
    });

};
