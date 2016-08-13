/**
 * The wait node does exactly what the name suggests.
 */


const jobWorker = require('../job-worker-base');
const handleConnections = require('../connections/handle-connections');
const Scenario = require('../../models/scenario');


/**
 * Export definition.
 */
module.exports = jobWorker.create(
    'wait',
    (job, done) => {
        job.log('Fetching the scenario');

        Scenario
            .findById(job.data.scenarioId)
            .then(scenario => {
                job.log('Getting the node');

                const node = scenario.nodes.find(node => node.id === job.data.nodeId);

                handleConnections.create({
                    scenarioId: job.data.scenarioId,
                    nodeId: job.data.nodeId,
                    activeConnectors: [0],
                    output: job.data.input
                }, node.data.delay);

                job.log(`Delaying the execution for ${node.data.delay} milliseconds, waiting for Godot...`);
                done();

            })
            .catch(done);
    }
);
