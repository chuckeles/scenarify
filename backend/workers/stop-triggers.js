/**
 * The worker that finds all trigger jobs associated with the
 * scenario and stops them.
 */


const Scenario = require('../models/scenario');


/**
 * Register the worker.
 */
exports.register = queue => {

    queue.process('stop-triggers', (job, done) => {
        // TODO: For each trigger node, do the `Job.rangeByType`, find
        //       the ones for this scenario and remove them
        done();
    });

};
