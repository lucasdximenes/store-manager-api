const Boom = require('@hapi/boom');
const { idSchema } = require('./schema');

const validadeId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) {
    return Boom.badRequest(error.message);
  }
};

module.exports = {
  validadeId,
};
