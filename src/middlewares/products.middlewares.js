const { validadeId } = require('./validations');

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const isError = validadeId(id);
  if (isError) {
    const { statusCode, message } = isError;
    return res.status(statusCode).json({ message });
  }
  return next();
};

module.exports = {
  validateId,
};
