/**
 * This job is called after a node's job finishes.
 * It looks at the node's connections and spawns an appropriate job
 * for the connected nodes.
 */


const jobWorker = require('../job-worker-base');
const Scenario = require('../../models/scenario');


/**
 * Export the definition.
 */
module.exports = jobWorker
    .create(
        'handle-connections',
        (scenarioId, nodeId, activeConnectors) => ({ scenarioId, nodeId, activeConnectors }),
        (job, done) => {
            job.log('Fetching the scenario');

            Scenario
                .findById(job.data.scenarioId)
                .then(scenario => {
                    job.log('Getting active connections');

                    const connections = scenario.nodes.filter(connection => {
                        return connection.from.nodeId === job.data.nodeId &&
                            job.data.activeConnectors.includes(connection.from.connector);
                    });

                    job.log(`Found ${connections.length} active connections`);

                    connections.forEach(connection => {
                        const node = scenario.nodes.find(node => node.id === connection.to.nodeId);

                        switch (node.type) {
                            default:
                                job.log(`Unrecognized node type ${node.type} ignored`);
                                break;
                        }
                    });
                })
                .catch(done);
        }
    );
