const { productsServices } = require('../services');

const getAll = async (_req, res) => {
  const payload = await productsServices.getAll();
  return res.status(200).json(payload);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const payload = await productsServices.getById(id);
  console.log(payload);
  if (payload.isBoom) {
    const {
      statusCode,
      payload: { message },
    } = payload.output;
    return res.status(statusCode).json({ message });
  }
  return res.status(200).json(payload);
};

module.exports = {
  getAll,
  getById,
};
