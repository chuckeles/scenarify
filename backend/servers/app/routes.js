/**
 * App route for the index file.
 */


const Router = require('express').Router;


/**
 * App router.
 */
module.exports = Router()
    .get('/', (req, res) => res.send('app is not created yet'));
