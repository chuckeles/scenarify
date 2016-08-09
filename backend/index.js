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
    .option('kue', {
        describe: 'port for the Kue UI',
        type: 'number',
        default: 3001
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
const databasesPromise = require('./databases/databases').connectAll();


/**
 * Start the Kue workers.
 */
const workersPromise = require('./workers/workers').startAll(argv);


/**
 * Start the express servers.
 */
Promise
    .all([databasesPromise, workersPromise])
    .then(() => {
        require('./servers/servers')
            .startAll(argv);
    })
    .catch(err => {
        throw err;
    });
