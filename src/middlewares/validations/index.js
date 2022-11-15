const { idSchema } = require('./schema');

const validadeId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) {
    return {
      statusCode: 422,
      message: error.message,
    };
  }
};

module.exports = {
  validadeId,
};
