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
        (job, done) => {
            job.log('Fetching the scenario');

            Scenario
                .findById(job.data.scenarioId)
                .then(scenario => {
                    job.log('Output of the previous node is');
                    job.log(job.data.output);

                    job.log('Getting active connections');

                    const connections = scenario.connections.filter(connection => {
                        return connection.from.nodeId === job.data.nodeId &&
                            job.data.activeConnectors.includes(connection.from.connector);
                    });

                    job.log(`Found ${connections.length} active connections`);

                    connections.forEach(connection => {
                        const node = scenario.nodes.find(node => node.id === connection.to.nodeId);

                        try {
                            require(`../nodes/${node.type}`)
                                .create({ scenarioId: job.data.scenarioId, nodeId: node.id, input: job.data.output });

                            job.log(`Created a new job for node ${node.type} (${node.id})`)
                        }
                        catch (e) {
                            job.log(`Unrecognized node ${node.type} (${node.id}) ignored`);
                        }
                    });

                    done();
                })
                .catch(done);
        }
    );
