/**
 * Scenario CRUD routes.
 */


const Router = require('express').Router;


/**
 * Scenarios router.
 */
module.exports = Router()
    .get('/', function getScenarios(req, res) {
        res.send('list of all scenarios');
    })
    .get('/:id', function getScenario(req, res) {
        res.send('scenario ' + req.params.id);
    })
    .post('/', function createScenario(req, res) {
        res.send('created new scenario');
    })
    .put('/:id', function updateScenario(req, res) {
        res.send('updated scenario ' + req.params.id)
    })
    .delete('/:id', function deleteScenario(req, res) {
        res.send('deleted scenario ' + req.params.id)
    });
