/**
 * This job should be called when a new scenario is saved.
 * It looks at all the nodes, finds the triggers, and creates
 * jobs for them.
 */

const Scenario = require('../../models/scenario');
const jobWorker = require('./../job-worker-base');


/**
 * Create the job and worker definition.
 */
module.exports = jobWorker.create(
    'start-triggers',
    scenarioId => {
        return { scenarioId };
    },
    (job, done) => {
        job.log('Fetching the scenario');

        Scenario
            .findById(job.data.scenarioId)
            .then(scenario => {
                job.log('Adding jobs for triggers');

                const nodesCount = scenario.nodes.length;
                job.progress(0, nodesCount);

                scenario.nodes.forEach((node, i) => {
                    switch (node.type) {
                        default:
                            job.log(`Non-trigger node ${node.type} (${node._id}) ignored`);
                            break;
                    }

                    job.progress(i, nodesCount);
                });

                done();
            })
            .catch(done);
    });
