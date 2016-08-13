/**
 * This node sends an HTTP request. It can use the
 * incoming or a user-defined data payload.
 */


const request = require('request');

const jobWorker = require('../job-worker-base');
const handleConnections = require('../connections/handle-connections');
const Scenario = require('../../models/scenario');


/**
 * Export definition.
 */
module.exports = jobWorker.create(
    'http-request',
    (job, done) => {
        job.log('Fetching the scenario');

        Scenario
            .findById(job.data.scenarioId)
            .then(scenario => {
                job.log('Getting the node');

                const node = scenario.nodes.find(node => node.id === job.data.nodeId);

                job.log('Sending the HTTP request with the message');

                request({
                    method: node.data.method,
                    uri: node.data.url,
                    body: job.data.input,
                    json: true
                }, (err, response, body) => {
                    if (err) {
                        done(err);
                        return;
                    }

                    job.log(`Message sent, got response ${response.statusCode}`);

                    handleConnections.create({
                        scenarioId: job.data.scenarioId,
                        nodeId: job.data.nodeId,
                        activeConnectors: [0],
                        output: {
                            status: response.statusCode,
                            response: body
                        }
                    });

                    done();
                });
            })
            .catch(done);
    }
);
