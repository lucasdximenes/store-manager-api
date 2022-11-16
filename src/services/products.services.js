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

const insert = async (name) => {
  const insertId = await productsModel.insert(name);
  const [product] = await productsModel.getById(insertId);
  return product;
};

const update = async (id, name) => {
  const updated = await productsModel.update(id, name);
  if (!updated) {
    return {
      isError: true,
      statusCode: 404,
      message: 'Product not found',
    };
  }
  const [product] = await productsModel.getById(id);
  return product;
};

const remove = async (id) => {
  const deleted = await productsModel.remove(id);
  if (!deleted) {
    return {
      isError: true,
      statusCode: 404,
      message: 'Product not found',
    };
  }
  return {
    isError: false,
  };
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
