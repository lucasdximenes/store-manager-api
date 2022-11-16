const express = require('express');

const router = express.Router();

const { productsControllers } = require('../controllers');
const { productsMiddlewares } = require('../middlewares');

router.get('/search', productsControllers.searchByQuery);

router.get('/', productsControllers.getAll);

router.get('/:id', productsMiddlewares.validateId, productsControllers.getById);

router.post('/', productsMiddlewares.validateInsertProductBody, productsControllers.create);

router.put(
  '/:id',
  productsMiddlewares.validateId,
  productsMiddlewares.validateInsertProductBody,
  productsControllers.update,
);

router.delete('/:id', productsMiddlewares.validateId, productsControllers.exclude);

module.exports = router;
