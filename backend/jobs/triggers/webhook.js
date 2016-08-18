/**
 * The webhook node gets triggered when the webhook server receives
 * an HTTP request.
 */


const jobWorker = require('../job-worker-base');
const redis = require('../../databases/redis');


/**
 * Export the definition.
 */
module.exports = jobWorker.create(
    'webhook',
    (job, done) => {
        Promise
            .all([
                redis.db.sadd('webhooks', job.data.scenarioId),
                redis.db.sadd(`webhooks:${job.data.scenarioId}`, job.data.nodeId)
            ])
            .then(() => {
                job.log(`Added a new webook listener for scenario ${job.data.scenarioId} and node ${job.data.nodeId}`);
                done();
            })
            .catch(err => {
                job.log('Error adding a webhook listener to Redis');
                done(err);
            });
    }
);
