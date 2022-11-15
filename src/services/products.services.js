const Boom = require('@hapi/boom');
const { productsModel } = require('../models');
const { validadeId } = require('./validations');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const error = validadeId(id);
  if (error) {
    return Boom.badRequest(error.message);
  }
  const [product] = await productsModel.getById(id);
  if (!product) {
    return Boom.notFound('Product not found');
  }
  return product;
};

module.exports = {
  getAll,
  getById,
};
