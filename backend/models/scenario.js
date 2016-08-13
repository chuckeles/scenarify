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
    },
    created: Date,
    updated: Date,
    nodes: [{
        id: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true
        },
        data: {}
    }],
    connections: [{
        from: {
            nodeId: {
                type: Number,
                required: true
            },
            connector: {
                type: Number,
                default: 0
            }
        },
        to: {
            nodeId: {
                type: Number,
                required: true
            },
            connector: {
                type: Number,
                default: 0
            }
        }
    }],
    lastNodeId: {
        type: Number,
        default: 0
    }
});


/**
 * Export the model.
 */
module.exports = mongoose.model('Scenario', schema);
