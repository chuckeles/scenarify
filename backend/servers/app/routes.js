/**
 * App route for the index file.
 */


const express = require('express');
const Router = express.Router;


/**
 * App router.
 */
module.exports = Router()
    .use('/static', express.static(`${process.cwd()}/frontend/static`))
    .get('*', (req, res) => {
        res.sendFile(`${process.cwd()}/frontend/index.html`);
    });
