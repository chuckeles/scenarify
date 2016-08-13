/**
 * Initialization of the workers which power Scenarify.
 */


const chalk = require('chalk');
const kue = require('kue');
const fs = require('fs');


/**
 * Set up the Kue and the workers.
 */
exports.startAll = () => {

    console.log('Setting up', chalk.blue('Kue'));

    setUpKue();
    setUpWorkers();

};


/**
 * Set up the Kue queue.
 */
function setUpKue() {

    exports.queue = kue.createQueue();

    exports.queue.on('error', err => {
        console.error(chalk.red('Error in Kue'));
        console.error(err);
    });

    exports.queue.watchStuckJobs(1000);

}


/**
 * Set up all the workers for Kue.
 */
function setUpWorkers() {

    console.log('Registering the', chalk.blue('workers'));

    const registerFolder = (file, parents = '') => {
        if (file === 'workers.js') {
            return;
        }

        if (fs.statSync(`${__dirname}${parents}/${file}`).isDirectory()) {
            fs.readdirSync(`${__dirname}${parents}/${file}`)
              .forEach(innerFile => registerFolder(innerFile, `${parents}/${file}`));
        }
        else {
            const worker = require(`.${parents}/${file}`);
            if (worker.register) {
                worker.register();
            }
        }
    };

    fs.readdirSync(__dirname)
      .forEach(file => registerFolder(file, ''));

}
