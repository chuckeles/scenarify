/**
 * The base for defining jobs and workers. Handles all
 * the defaults and minimises code duplicity.
 */


const chalk = require('chalk');

const queue = require('./workers').queue;


/**
 * Create the exports object that others shall use.
 * Use the provided functions for creating jobs and workers.
 */
exports.create = (name, worker) => {

    /**
     * Create the job and add it to the queue.
     */
    const create = (data, delay = 0) => {

        return queue
            .create(name, data)
            .delay(delay)
            .attempts(10)
            .backoff({ type: 'exponential' })
            .save(err => {
                if (err) {
                    console.error(chalk.red(`Failed to create a ${name} job`));
                    console.error(err);
                }
                else {
                    console.log(`Added new ${name} job`);
                }
            });

    };

    /**
     * Register the worker.
     */
    const register = () => {

        console.log(`Registering the ${name} worker`);
        queue.process(name, 10, worker);

    };

    return {
        create,
        register
    };

};
