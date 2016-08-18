/**
 * This server is listening for webhooks and starting
 * scenario Webhook trigger jobs.
 */


const bodyParser = require('body-parser');
const chalk = require('chalk');
const express = require('express');

const Scenario = require('../../models/scenario');
const redis = require('../../databases/redis');
const webhookRun = require('../../jobs/triggers/webhook-run');


/**
 * Tell all registered listeners about an incoming webhook.
 */
function tellListeners(req, res) {

    const data = {
        path: req.path,
        query: req.query,
        method: req.method,
        message: req.body
    };

    redis
        .db
        .smembers('webhooks')
        .then(scenarios => {
            return Promise.all(
                scenarios.map(scenarioId => {
                    Scenario
                        .findById(scenarioId)
                        .then(findTriggerNodes)
                        .then(triggerWebhookNodes);

                    function findTriggerNodes(scenario) {
                        return scenario.nodes.filter(node => {
                            return node.type === 'webhook';
                        });
                    }

                    function triggerWebhookNodes(nodes) {
                        nodes.forEach(node => {
                            webhookRun
                                .create({
                                    scenarioId: scenarioId,
                                    nodeId: node.id,
                                    webhookData: data
                                });
                        });
                    }
                })
            );
        })
        .then(() => {
            res.send();
        })
        .catch(err => {
            res.status(500).send(err);
        });

}


/**
 * Start the webhooks server on a port.
 */
exports.start = port => {

    const app = express();

    app.use(bodyParser.json());
    app.all('*', tellListeners);

    app.listen(port, () => {
        console.log(chalk.blue('Webhooks server'), 'listening on port', port);
    });

};
