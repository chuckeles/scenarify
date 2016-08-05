/**
 * App route for the index file.
 */


const Router = require('express').Router;


/**
 * Set up the routes.
 */
module.exports = Router()
    .get('/', function appGetRoute(req, res) {
        res.send('app is not created yet');
    });
