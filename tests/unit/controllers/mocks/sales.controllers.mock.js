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

module.exports = {
  correctServiceReturn,
  bodyRequest,
  serviceProductNotFoundError,
};
