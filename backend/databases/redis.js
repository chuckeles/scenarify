/**
 * Global redis client.
 */


const chalk = require('chalk');
const Redis = require('ioredis');


/**
 * Connect to the database.
 */
exports.connect = () => {

    return new Promise((resolve) => {
        exports.db = new Redis();

        console.log('Connected to', chalk.blue('Redis'));
        resolve();
    });

};
