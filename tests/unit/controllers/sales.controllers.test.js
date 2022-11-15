const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { expect } = chai;

const { salesControllers } = require('../../../src/controllers');
const { salesServices } = require('../../../src/services');
const {
  correctServiceReturn,
  bodyRequest,
  serviceProductNotFoundError,
} = require('./mocks/sales.controllers.mock');

describe('Testing the sales controller', function () {
  afterEach(sinon.restore);

  describe('Whe create method is called', function () {
    it('should return an object with the new sale', async function () {
      const res = {};
      const req = {
        body: bodyRequest,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'create').resolves(correctServiceReturn);

      await salesControllers.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(correctServiceReturn);
    });

    it('should return an error if the service returns an error', async function () {
      const res = {};
      const req = {
        body: bodyRequest,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'create').resolves(serviceProductNotFoundError);

      await salesControllers.create(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });
});
