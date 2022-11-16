const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM StoreManager.products ORDER BY id');
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM StoreManager.products WHERE id=?', [
    id,
  ]);
  return product;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return insertId;
};

const update = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    `
    UPDATE
      StoreManager.products
    SET
      name = ?
    WHERE
      id =  ?`,
    [name, id],
  );

  return affectedRows > 0;
};

const remove = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return affectedRows > 0;
};

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove,
};
