/**
 * CRUD router that interacts with the Mongo database.
 */


const Router = require('express').Router;

const mongo = require('../databases/mongo');


/**
 * Create a CRUD router based on a named collection.
 */
exports.create = name => {

    const collection = mongo.db.collection(name);

    return Router()
        .get('/', (req, res) => {
            collection
                .find({})
                .toArray()
                .then(data => res.send(data))
                .catch(err => {
                    console.error(err);
                    res.status(500).send(err);
                });
        })
        .get('/:id', (req, res) => {
            collection
                .find({ _id: mongo.ObjectId(req.params.id) })
                .limit(1)
                .next()
                .then(data => res.send(data))
                .catch(err => {
                    console.error(err);
                    res.status(500).send(err);
                });
        })
        .post('/', (req, res) => {
            collection
                .insertOne(req.body)
                .then(data => res.send(data.insertedId))
                .catch(err => {
                    console.error(err);
                    res.status(500).send(err);
                });
        })
        .put('/:id', (req, res) => {
            collection
                .updateOne({ _id: mongo.ObjectId(req.params.id) }, req.body)
                .then(() => res.status(200).send())
                .catch(err => {
                    console.error(err);
                    res.status(500).send(err);
                });
        })
        .delete('/:id', (req, res) => {
            collection
                .deleteOne({ _id: mongo.ObjectId(req.params.id) })
                .then(() => res.status(200).send())
                .catch(err => {
                    console.error(err);
                    res.status(500).send(err);
                });
        });

};
