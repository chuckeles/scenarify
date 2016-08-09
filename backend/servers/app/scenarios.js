/**
 * The scenario CRUD router.
 */


const Scenario = require('../../models/scenario');
const crudRouter = require('../crud-router');


/**
 * Make and export the router.
 */
module.exports = crudRouter
    .create(Scenario, {
        created: true,
        updated: true,
        postHook: (id) => {},
        putHook: (id) => {},
        deleteHook: (id) => {}
    });
