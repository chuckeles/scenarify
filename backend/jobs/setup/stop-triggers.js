/**
 * This job should be called when a scenario is removed.
 * It finds all trigger jobs for the scenario and removes them.
 */


const jobWorker = require('./../job-worker-base');


/**
 * Create the definition.
 */
module.exports = jobWorker.create(
    'stop-triggers',
    (job, done) => {
        // TODO: Find all trigger jobs for the scenario and remove them
        done();
    });
