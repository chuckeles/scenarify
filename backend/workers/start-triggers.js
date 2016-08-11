/**
 * The worker that iterates all triggers in a scenario
 * and adds jobs for each trigger.
 */


const Scenario = require('../models/scenario');


/**
 * Register the worker.
 */
exports.register = queue => {

    queue.process('start-triggers', (job, done) => {
        job.log('Fetching the scenario');

        Scenario
            .findById(job.data.scenarioId)
            .then(scenario => {
                job.log('Adding jobs for triggers');

                let nodesCount = scenario.nodes.length;
                job.progress(0, nodesCount);

                scenario.nodes.forEach((node, i) => {
                    switch (node.type) {

                    }

                    job.progress(i, nodesCount);
                });

                done();
            })
            .catch(done);
    });

};
