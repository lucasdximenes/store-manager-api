const { salesServices } = require('../services');

const create = async (req, res) => {
  const sale = req.body;
  const payload = await salesServices.create(sale);
  if (payload.isError) {
    const { statusCode, message } = payload;
    return res.status(statusCode).json({ message });
  }
  return res.status(201).json(payload);
};

const getAll = async (_req, res) => {
  const sales = await salesServices.getAll();
  return res.status(200).json(sales);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const payload = await salesServices.getById(id);
  if (payload.isError) {
    const { statusCode, message } = payload;
    return res.status(statusCode).json({ message });
  }
  return res.status(200).json(payload);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const payload = await salesServices.remove(id);
  if (payload.isError) {
    const { statusCode, message } = payload;
    return res.status(statusCode).json({ message });
  }
  return res.status(204).json();
};

module.exports = {
  create,
  getAll,
  getById,
  exclude,
};
