/**
 * Scenario CRUD routes.
 */


const Router = require('express').Router;

const scenarioRouter = require('./scenarios');


/**
 * Scenarios router.
 */
module.exports = Router()
    .use('/scenarios', scenarioRouter);
