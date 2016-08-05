/**
 * The entry server file. This file should be run from the command line.
 * It handles command arguments and starts the server.
 */


const yargs = require('yargs');

const databases = require('./databases/databases');
const servers = require('./servers/servers');


/**
 * Set up command line.
 */
const argv = yargs
    .usage('$0 [options]')
    .version(function() {
        return require('../package').version;
    })
    .help('help')
    .option('app', {
        describe: 'port for the app',
        type: 'number',
        default: 3000
    })
    .option('webhooks', {
        describe: 'port for incoming webhooks',
        type: 'number',
        default: 4000
    })
    .alias('v', 'version')
    .alias('h', 'help')
    .alias('a', 'app')
    .alias('w', 'webhooks')
    .wrap(null)
    .argv;


/**
 * Connect the database clients.
 */
databases.connectAll();


/**
 * Start the express servers.
 */
servers.startAll(argv);
