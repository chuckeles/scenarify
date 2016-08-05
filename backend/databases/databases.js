/**
 * Initializer file for databases.
 */


const mongo = require('./mongo');


/**
 * Connect all databases.
 */
exports.connectAll = () => {

    console.log('Connecting databases');

    return mongo.connect();

};
