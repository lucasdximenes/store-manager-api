const { salesModel, salesProductsModel, productsModel } = require('../models');

const allProductsExist = async (itemsSold) => {
  const productsExist = await Promise.all(
    itemsSold.map(async (item) => {
      const [product] = await productsModel.getById(item.productId);
      return product;
    }),
  ).then((products) => products.every((product) => product));

  if (!productsExist) {
    return {
      isError: true,
      statusCode: 404,
      message: 'Product not found',
    };
  }

  return true;
};

const insertProducts = async (itemsSold) => {
  const saleId = await salesModel.insert();

  const itemsSoldInserted = await Promise.all(
    itemsSold.map(async (item) => {
      const inserted = await salesProductsModel.insert(saleId, item.productId, item.quantity);
      return inserted;
    }),
  ).then((itens) => itens.every((item) => item));

  if (!itemsSoldInserted) {
    return {
      isError: true,
      statusCode: 500,
      message: 'Error inserting sale',
    };
  }

  return saleId;
};

const create = async (itemsSold) => {
  const allItemsSoldExist = await allProductsExist(itemsSold);
  if (allItemsSoldExist.isError) {
    return allItemsSoldExist;
  }

  const saleId = await insertProducts(itemsSold);
  if (saleId.isError) {
    return saleId;
  }

  return {
    id: saleId,
    itemsSold,
  };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale.length) {
    return {
      isError: true,
      statusCode: 404,
      message: 'Sale not found',
    };
  }

  return sale;
};

const verifyIfSaleExist = async (id) => {
  const sale = await salesModel.existSale(id);
  if (!sale.length) {
    return {
      isError: true,
      statusCode: 404,
      message: 'Sale not found',
    };
  }

  return true;
};

const update = async (id, itemsSold) => {
  const saleExist = await verifyIfSaleExist(id);
  if (saleExist.isError) {
    return saleExist;
  }

  const allItemsSoldExist = await allProductsExist(itemsSold);
  if (allItemsSoldExist.isError) {
    return allItemsSoldExist;
  }

  await salesProductsModel.remove(id);

  await Promise.all(
    itemsSold.map(async (item) => {
      await salesProductsModel.insert(id, item.productId, item.quantity);
    }),
  );

  return {
    saleId: Number(id),
    itemsUpdated: itemsSold,
  };
};

const remove = async (id) => {
  const saleExist = await verifyIfSaleExist(id);
  if (saleExist.isError) {
    return saleExist;
  }

  await salesModel.remove(id);
  await salesProductsModel.remove(id);

  return {
    isError: false,
  };
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
