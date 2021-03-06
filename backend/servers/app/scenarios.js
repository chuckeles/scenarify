/**
 * The scenario CRUD router.
 */


const Scenario = require('../../models/scenario');
const crudRouter = require('../crud-router');
const startTriggers = require('../../jobs/setup/start-triggers');
const restartTriggers = require('../../jobs/setup/restart-triggers');
const stopTriggers = require('../../jobs/setup/stop-triggers');


/**
 * Make and export the router.
 */
module.exports = crudRouter
    .create(Scenario, {
        created: true,
        updated: true,
        postHook: scenarioId => startTriggers.create({ scenarioId }),
        putHook: scenarioId => restartTriggers.create({ scenarioId }),
        deleteHook: scenarioId => stopTriggers.create({ scenarioId })
    });
