/**
 * Global mongo client.
 */


const chalk = require('chalk');
const mongoose = require('mongoose');


/**
 * The connection URL.
 */
const url = 'mongodb://localhost:27017/scenarify';


/**
 * Use promises.
 */
mongoose.Promise = Promise;


/**
 * Connect to the database.
 */
exports.connect = () => {
    return mongoose
        .connect(url)
        .then(db => {
            console.log('Connected to the', chalk.blue('Mongo database'));
            exports.db = db;
        })
        .catch(err => {
            console.error(chalk.red('Could not connect to the Mongo database'));
            console.error(err);
        });
};


/**
 * Export model.
 */
exports.model = mongoose.model;


/**
 * Export the Schema.
 */
exports.Schema = mongoose.Schema;


/**
 * Export the ObjectId.
 */
exports.ObjectId = mongoose.ObjectId;
