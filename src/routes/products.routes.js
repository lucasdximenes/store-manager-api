const express = require('express');

const router = express.Router();

const { productsControllers } = require('../controllers');
const { productsMiddlewares } = require('../middlewares');

router.get('/', productsControllers.getAll);

router.get('/:id', productsMiddlewares.validateId, productsControllers.getById);

router.post('/', productsMiddlewares.validateInsertProductBody, productsControllers.create);

module.exports = router;
