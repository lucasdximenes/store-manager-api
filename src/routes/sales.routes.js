const express = require('express');

const router = express.Router();

const { salesControllers } = require('../controllers');
const { salesMiddlewares } = require('../middlewares');

router.post('/', salesMiddlewares.validateInsertSaleBody, salesControllers.create);

module.exports = router;
