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

module.exports = {
  create,
};
