const connection = require('./connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );
  return insertId;
};

const getAll = async () => {
  const [sales] = await connection.execute(
    `
    SELECT
      s.id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity 
    FROM
      StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
    ORDER BY
      s.id ASC,
      sp.product_id ASC
    `,
  );

  return sales;
};

const getById = async (id) => {
  const [sales] = await connection.execute(
    `
    SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM
      StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS sp ON s.id = sp.sale_id
    WHERE
      s.id = ?
    ORDER BY
      s.id ASC,
      sp.product_id ASC
    `,
    [id],
  );

  return sales;
};

const existSale = async (id) => {
  const [sale] = await connection.execute('SELECT id FROM StoreManager.sales WHERE id = ?', [id]);

  return sale;
};

const remove = async (id) => {
  await connection.execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
};

module.exports = {
  insert,
  getAll,
  getById,
  existSale,
  remove,
};
