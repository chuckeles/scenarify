/**
 * This job should be called when a new scenario is saved.
 * It looks at all the nodes, finds the triggers, and creates
 * jobs for them.
 */


const chalk = require('chalk');

const queue = require('../workers/workers').queue;


/**
 * Create the job and add it to the queue.
 */
exports.create = (scenarioId) => {

    return queue
        .create('start-triggers', scenarioId)
        .attempts(10)
        .backoff({ type: 'exponential' })
        .save(err => {
            console.error(chalk.red('Failed to create a start-trigger job'));
            console.error(err);
        });

};
