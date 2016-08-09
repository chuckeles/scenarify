/**
 * Initialization of the workers which power Scenarify.
 */


const chalk = require('chalk');
const kue = require('kue');
const kueUi = require('kue-ui');


/**
 * Set up the Kue and the workers.
 */
exports.startAll = () => {

    console.log('Setting up', chalk.blue('Kue'));

    setUpKue();
    setUpWorkers();
    startKueUi();

};


/**
 * Set up the Kue queue.
 */
function setUpKue() {

}


/**
 * Set up all the workers for Kue.
 */
function setUpWorkers() {

}


/**
 * Start the Kue UI server.
 */
function startKueUi() {

}
