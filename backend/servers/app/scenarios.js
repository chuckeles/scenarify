/**
 * The scenario CRUD router.
 */


const Scenario = require('../../models/scenario');
const crudRouter = require('../crud-router');
const startTriggersJob = require('../../jobs/start-triggers');
const restartTriggersJob = require('../../jobs/restart-triggers');
const stopTriggersJob = require('../../jobs/stop-triggers');


/**
 * Make and export the router.
 */
module.exports = crudRouter
    .create(Scenario, {
        created: true,
        updated: true,
        postHook: startTriggersJob,
        putHook: restartTriggersJob,
        deleteHook: stopTriggersJob
    });
