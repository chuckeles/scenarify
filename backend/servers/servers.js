/**
 * Express servers. This is the server for the app, but also the listening
 * servers for incoming data.
 */


const app = require('./app/app');


/**
 * Starts all Express servers.
 */
exports.startAll = (argv) => {

    console.log('Starting the servers');

    app.start(argv.app);

};
