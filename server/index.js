/**
 * The entry server file. This file should be run from the command line.
 * It handles command arguments and starts the server.
 */


const yargs = require('yargs');


/**
 * Set up command line.
 */
const argv = yargs
    .usage('$0 [options]')
    .help('help')
    .wrap(null)
    .argv;
