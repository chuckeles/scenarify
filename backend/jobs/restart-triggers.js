/**
 * This job shall be called when a scenario is updated.
 * It runs the stop-triggers job and start-triggers after that.
 */


const startTriggersJob = require('./start-triggers');
const stopTriggersJob = require('./stop-triggers');


/**
 * Create the job and add it to the queue.
 */
exports.create = (scenarioId) => {

    stopTriggersJob
        .create(scenarioId)
        .on('complete', startTriggersJob.create);

};
