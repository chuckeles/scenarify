/**
 * App route for the index file.
 */


const Router = require('express').Router;


/**
 * App router.
 */
module.exports = Router()
    .get('/', function getIndex(req, res) {
        res.send('app is not created yet');
    });
