/**
 * Model for scenarios.
 */


const mongoose = require('mongoose');


/**
 * Scenario schema.
 */
const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});


/**
 * Export the model.
 */
module.exports = mongoose.model('Scenario', schema);
