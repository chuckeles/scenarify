/**
 * This job should be called when a scenario is removed.
 * It finds all trigger jobs for the scenario and removes them.
 */


const jobWorker = require('../job-worker-base');
const redis = require('../../databases/redis');


/**
 * Create the definition.
 */
module.exports = jobWorker.create(
    'stop-triggers',
    (job, done) => {
        job.log('Removing trigger jobs and listeners');

        Promise
            .all([
                redis.db.del(`webhooks:${job.data.scenarioId}`),
                redis.db.srem(`webhooks`, job.data.scenarioId)
            ])
            .then(() => {
                job.log('Removed all Redis listeners');
                done();
            })
            .catch(done);
    });
