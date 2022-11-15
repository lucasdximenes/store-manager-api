const express = require('express');

const router = express.Router();

const { productsControllers } = require('../controllers');

router.get('/', productsControllers.getAll);

router.get('/:id', productsControllers.getById);

module.exports = router;
