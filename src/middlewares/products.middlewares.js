const { validadeId } = require('./validations');

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const error = validadeId(id);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  return next();
};

module.exports = {
  validateId,
};
