/**
 * Initializer file for databases.
 */


const mongo = require('./mongo');
const redis = require('./redis');


/**
 * Connect all databases.
 */
exports.connectAll = () => {

    console.log('Connecting databases');

    return Promise.all([
        mongo.connect(),
        redis.connect()
    ]);

};
