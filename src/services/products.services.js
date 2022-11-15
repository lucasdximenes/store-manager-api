const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const [product] = await productsModel.getById(id);
  if (!product) {
    return {
      isError: true,
      statusCode: 404,
      message: 'Product not found',
    };
  }
  return product;
};

module.exports = {
  getAll,
  getById,
};
