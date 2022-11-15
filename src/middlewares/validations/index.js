const { idSchema, productNameSchema } = require('./schema');

const validadeId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) {
    return {
      statusCode: 422,
      message: error.message,
    };
  }
};

const validateName = (name) => {
  const { error } = productNameSchema.validate(name);
  if (error) {
    return {
      statusCode: 422,
      message: error.message,
    };
  }
};

module.exports = {
  validadeId,
  validateName,
};
