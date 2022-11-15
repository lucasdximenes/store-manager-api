const express = require('express');

const router = express.Router();

const productsRoutes = require('./products.routes');
const salesRoutes = require('./sales.routes');

router.use('/products', productsRoutes);
router.use('/sales', salesRoutes);

module.exports = router;
