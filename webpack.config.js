/**
 * The webpack configuration file. Webpack watches and builds all resources
 * for the frontend. It also injects them into the browsers.
 */


module.exports = {

    entry: './frontend/scripts/app.js',
    output: {
        path: './frontend/build',
        filename: 'scripts.js'
    }

};
