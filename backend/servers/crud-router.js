/**
 * CRUD router that interacts with the Mongo database.
 */


const Router = require('express').Router;


/**
 * Create a CRUD router based on a named collection.
 */
exports.create = (Model, options = {}) => {

    return Router()
        .get('/', (req, res) => {
            Model
                .find({})
                .then(data => res.send(data))
                .catch(err => res.status(400).send(err));
        })
        .get('/:id', (req, res) => {
            Model
                .findById(req.params.id)
                .then(data => {
                    if (data) {
                        res.send(data);
                    }
                    else {
                        res.status(404).send();
                    }
                })
                .catch(err => res.status(400).send(err));
        })
        .post('/', (req, res) => {
            var instance = new Model(req.body);

            if (options.created) {
                instance.created = instance.updated = Date.now();
            }

            instance
                .save()
                .then(data => res.send(data))
                .catch(err => res.status(400).send(err));
        })
        .put('/:id', (req, res) => {
            if (options.updated) {
                req.body.updated = Date.now();
            }

            Model
                .findByIdAndUpdate(req.params.id, req.body)
                .then(() => res.send())
                .catch(err => res.status(400).send(err));
        })
        .delete('/:id', (req, res) => {
            Model
                .findByIdAndRemove(req.params.id)
                .then(() => res.send())
                .catch(err => res.status(400).send(err));
        });

};
