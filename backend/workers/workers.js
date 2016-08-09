/**
 * Initialization of the workers which power Scenarify.
 */


const chalk = require('chalk');
const kue = require('kue');


/**
 * Set up the Kue and the workers.
 */
exports.startAll = (argv) => {

    console.log('Setting up', chalk.blue('Kue'));

    setUpKue();
    setUpWorkers();

};


/**
 * Set up the Kue queue.
 */
function setUpKue() {

    exports.queue = kue.createQueue();

}


/**
 * Set up all the workers for Kue.
 */
function setUpWorkers() {

}
