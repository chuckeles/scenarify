/**
 * This job should be called when a new scenario is saved.
 * It looks at all the nodes, finds the triggers, and creates
 * jobs for them.
 */


const chalk = require('chalk');

const queue = require('./workers').queue;
const Scenario = require('../models/scenario');


/**
 * Create the job and add it to the queue.
 */
exports.create = scenarioId => {

    return queue
        .create('start-triggers', { scenarioId })
        .attempts(10)
        .backoff({ type: 'exponential' })
        .save(err => {
            if (err) {
                console.error(chalk.red('Failed to create a start-trigger job'));
                console.error(err);
            }
            else {
                console.log('Added new start-triggers job');
            }
        });

};


/**
 * Register the worker.
 */
exports.register = () => {

    console.log('Registering the start-trigger worker');

    queue.process('start-triggers', (job, done) => {
        job.log('Fetching the scenario');

        Scenario
            .findById(job.data.scenarioId)
            .then(scenario => {
                job.log('Adding jobs for triggers');

                let nodesCount = scenario.nodes.length;
                job.progress(0, nodesCount);

                scenario.nodes.forEach((node, i) => {
                    switch (node.type) {

                    }

                    nodesCount += 1;
                    job.progress(i, nodesCount);
                });

                done();
            })
            .catch(done);
    });

};
