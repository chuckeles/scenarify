/**
 * This job should be called when a scenario is removed.
 * It finds all trigger jobs for the scenario and removes them.
 */


const kue = require('kue');

const jobWorker = require('./job-worker-base');
const queue = require('./workers').queue;


/**
 * Create the definition.
 */
module.exports = jobWorker.create(
    'stop-triggers',
    scenarioId => {
        return { scenarioId };
    },
    (job, done) => {
        // TODO: Find all trigger jobs for the scenario and remove them
        done();
    });
