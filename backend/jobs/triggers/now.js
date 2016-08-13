/**
 * Trigger node job that instantly starts the scenario flow.
 */


const jobWorker = require('../job-worker-base');
const handleConnections = require('../connections/handle-connections');


/**
 * Export the definition.
 */
module.exports = jobWorker.create(
    'now',
    (scenarioId, nodeId) => ({ scenarioId, nodeId }),
    (job, done) => {
        handleConnections.create(job.data.scenarioId, job.data.nodeId, [0]);

        job.log('Now triggered and started the scenario');
        done();
    }
);
