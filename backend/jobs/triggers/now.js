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
    (job, done) => {
        handleConnections.create({
            scenarioId: job.data.scenarioId,
            nodeId: job.data.nodeId,
            activeConnectors: [0]
        });

        job.log('Now triggered and started the scenario');
        done();
    }
);
