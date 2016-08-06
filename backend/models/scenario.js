/**
 * Model for scenarios.
 */


const mongo = require('../databases/mongo');


const schema = mongo.Schema({
    name: String
});
module.exports = mongo.model('Scenario', schema);
