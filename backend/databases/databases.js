/**
 * Initializer file for databases.
 */


const mongo = require('./mongo');


/**
 * Connect all databases.
 */
exports.connectAll = function connectDatabases() {
    mongo.connect();
};
