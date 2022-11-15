const connection = require('./connection');

const insert = async (saleId, productId, quantity) => {
  const [{ affectedRows }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return affectedRows === 1;
};

module.exports = {
  insert,
};
