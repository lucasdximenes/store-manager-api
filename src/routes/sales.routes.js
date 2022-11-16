const express = require('express');

const router = express.Router();

const { salesControllers } = require('../controllers');
const { salesMiddlewares } = require('../middlewares');

router.get('/', salesControllers.getAll);

router.get('/:id', salesMiddlewares.validateId, salesControllers.getById);

router.post('/', salesMiddlewares.validateInsertSaleBody, salesControllers.create);

router.put(
  '/:id',
  salesMiddlewares.validateId,
  salesMiddlewares.validateInsertSaleBody,
  salesControllers.update,
);

router.delete('/:id', salesMiddlewares.validateId, salesControllers.exclude);

module.exports = router;
