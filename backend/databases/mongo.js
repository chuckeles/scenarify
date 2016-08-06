/**
 * Global mongo client.
 */


const chalk = require('chalk');
const mongodb = require('mongodb');


/**
 * The connection URL.
 */
const url = 'mongodb://localhost:27017/scenarify';


/**
 * Connect to the database.
 */
exports.connect = () => {
    return mongodb
        .MongoClient
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
 * Export the ObjectId.
 */
exports.ObjectId = mongodb.ObjectId;
