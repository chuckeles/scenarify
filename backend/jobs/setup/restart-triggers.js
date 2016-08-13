/**
 * This job shall be called when a scenario is updated.
 * It runs the stop-triggers job and start-triggers after that.
 */


const startTriggers = require('./start-triggers');
const stopTriggers = require('./stop-triggers');


/**
 * Create the job and add it to the queue.
 */
exports.create = (scenarioId) => {

    stopTriggers
        .create({ scenarioId })
        .on('complete', () => startTriggers.create({ scenarioId }));

};
