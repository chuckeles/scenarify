/**
 * This job should be called when a scenario is removed.
 * It finds all trigger jobs for the scenario and removes them.
 */


const chalk = require('chalk');

const queue = require('./workers').queue;


/**
 * Create the job and add it to the queue.
 */
exports.create = scenarioId => {

    return queue
        .create('stop-triggers', { scenarioId })
        .attempts(10)
        .backoff({ type: 'exponential' })
        .save(err => {
            if (err) {
                console.error(chalk.red('Failed to create a stop-trigger job'));
                console.error(err);
            }
            else {
                console.log('Added new stop-triggers job');
            }
        });

};


/**
 * Register the worker.
 */
exports.register = () => {

    console.log('Registering the stop-triggers worker');

    queue.process('stop-triggers', (job, done) => {
        // TODO: For each trigger node, do the `Job.rangeByType`, find
        //       the ones for this scenario and remove them
        done();
    });

};
