const sales = [
  {
    productId: 1,
    quantity: 1,
  },
];

const serviceReturn = {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
};

const updateServiceReturn = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 1,
    },
  ],
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

module.exports = {
  sales,
  serviceReturn,
  updateServiceReturn,
  getAllReturn,
};
