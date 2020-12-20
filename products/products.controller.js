const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const productService = require('./product.service');

// routes

router.post('/store', authorize(), storeSchema, store);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function storeSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        color: Joi.string().required(),
        quantity: Joi.number().max(2).required(),
        image: Joi.string().uri().empty('')

    });
    validateRequest(req, next, schema);
}

function store(req, res, next) {
    productService.create(req.body)
        .then(() => res.json({ message: 'Product added successful'}))
        .catch(next);
}

function getAll(req, res, next) {
    productService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    productService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().empty(''),
        description: Joi.string().empty(''),
        color: Joi.string().empty(''),
        quantity: Joi.number().max(2).empty(''),
        image: Joi.string().uri().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    productService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}

function _delete(req, res, next) {
    productService.delete(req.params.id)
        .then(() => res.json({ message: 'User deleted successfully' }))
        .catch(next);
}