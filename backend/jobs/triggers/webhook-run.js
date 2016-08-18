/**
 * Job that gets run when a webhook node actually gets triggered.
 */


const jobWorker = require('../job-worker-base');
const handleConnections = require('../connections/handle-connections');


/**
 * Export the definition.
 */
module.exports = jobWorker.create(
    'webhook-run',
    (job, done) => {
        handleConnections.create({
            scenarioId: job.data.scenarioId,
            nodeId: job.data.nodeId,
            activeConnectors: [0],
            output: job.data.webhookData
        });

        job.log('Webhook triggered and started the scenario with this data');
        job.log(job.data.webhookData);
        done();
    }
);
