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
exports.connect = function connectMongo() {
    return mongodb
        .MongoClient
        .connect(url)
        .then(db => {
            console.log('Connected to the', chalk.blue('Mongo database'));
            exports.db = db;
        })
};
