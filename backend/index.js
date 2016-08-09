/**
 * The entry server file. This file should be run from the command line.
 * It handles command arguments and starts the server.
 */


const chalk = require('chalk');
const yargs = require('yargs');


/**
 * Set up command line.
 */
const argv = yargs
    .usage('$0 [options]')
    .version(() => require('../package').version)
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
 * Set up unhandled rejection tracking.
 */
process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red('Possibly unhandled rejection!'));
    console.error(chalk.red(reason));
    console.error(promise);
});


/**
 * Connect the database clients.
 */
require('./databases/databases')
    .connectAll()
    .then(() => {
        /**
         * Start the Kue workers.
         */
        require('./workers/workers')
            .startAll();

        /**
         * Start the express servers.
         */
        require('./servers/servers')
            .startAll(argv);
    })
    .catch(() => {
        console.error(chalk.red('Databases could not connect'));
    });
