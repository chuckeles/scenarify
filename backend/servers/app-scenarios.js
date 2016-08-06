/**
 * Scenario CRUD routes.
 */


const Router = require('express').Router;

const mongo = require('../databases/mongo');
const scenarios = mongo.db.collection('scenarios');


/**
 * Scenarios router.
 */
module.exports = Router()
    .get('/', (req, res) => {
        scenarios
            .find({})
            .toArray()
            .then(data => res.send(data))
            .catch(err => {
                console.error(err);
                res.status(500).send(err);
            });
    })
    .get('/:id', (req, res) => {
        scenarios
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
        scenarios
            .insertOne(req.body)
            .then(data => res.send(data.insertedId))
            .catch(err => {
                console.error(err);
                res.status(500).send(err);
            });
    })
    .put('/:id', (req, res) => {
        scenarios
            .updateOne({ _id: mongo.ObjectId(req.params.id) }, req.body)
            .then(() => res.status(200).send())
            .catch(err => {
                console.error(err);
                res.status(500).send(err);
            });
    })
    .delete('/:id', (req, res) => {
        scenarios
            .deleteOne({ _id: mongo.ObjectId(req.params.id) })
            .then(() => res.status(200).send())
            .catch(err => {
                console.error(err);
                res.status(500).send(err);
            });
    });
