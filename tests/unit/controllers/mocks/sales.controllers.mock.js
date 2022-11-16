const correctServiceReturn = {
  id: 1,
  itemsSold: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 2 },
  ],
};

const bodyRequest = [
  { productId: 1, quantity: 1 },
  { productId: 2, quantity: 2 },
];

const serviceProductNotFoundError = {
  isError: true,
  statusCode: 404,
  message: 'Product not found',
};

const getAllReturn = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2,
  },
];

const saleNotFoundError = {
  isError: true,
  statusCode: 404,
  message: 'Sale not found',
};

module.exports = {
  correctServiceReturn,
  bodyRequest,
  serviceProductNotFoundError,
  getAllReturn,
  saleNotFoundError,
};
