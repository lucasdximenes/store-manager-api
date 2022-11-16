const { productsServices } = require('../services');

const getAll = async (_req, res) => {
  const payload = await productsServices.getAll();
  return res.status(200).json(payload);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const payload = await productsServices.getById(id);
  if (payload.isError) {
    const { statusCode, message } = payload;
    return res.status(statusCode).json({ message });
  }
  return res.status(200).json(payload);
};

const create = async (req, res) => {
  const { name } = req.body;
  const payload = await productsServices.insert(name);
  return res.status(201).json(payload);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const payload = await productsServices.update(id, name);
  if (payload.isError) {
    const { statusCode, message } = payload;
    return res.status(statusCode).json({ message });
  }
  return res.status(200).json(payload);
};

const exclude = async (req, res) => {
  const { id } = req.params;
  const payload = await productsServices.remove(id);
  if (payload.isError) {
    const { statusCode, message } = payload;
    return res.status(statusCode).json({ message });
  }
  return res.status(204).json();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
