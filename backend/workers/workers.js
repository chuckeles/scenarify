/**
 * Initialization of the workers which power Scenarify.
 */


const chalk = require('chalk');
const kue = require('kue');
const fs = require('fs');


/**
 * Set up the Kue and the workers.
 */
exports.startAll = () => {

    console.log('Setting up', chalk.blue('Kue'));

    setUpKue();
    setUpWorkers();

};


/**
 * Set up the Kue queue.
 */
function setUpKue() {

    exports.queue = kue.createQueue();

    exports.queue.on('error', err => {
        console.error(chalk.red('Error in Kue'));
        console.error(err);
    });

    exports.queue.watchStuckJobs(1000);

}


/**
 * Set up all the workers for Kue.
 */
function setUpWorkers() {

    console.log('Registering the workers');

    fs
        .readdirSync(__dirname)
        .forEach(file => {
            if (file === 'workers.js') {
                return;
            }

            require(`./${file}`).register(exports.queue);
        });

}
