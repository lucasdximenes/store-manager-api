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
  getAllReturn,
  saleNotFoundError,
  updateServiceReturn,
  updateBodyRequest,
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

  describe('When getAll method is called', function () {
    it('should return an array with all sales', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getAll').resolves(getAllReturn);

      await salesControllers.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getAllReturn);
    });
  });

  describe('When getById method is called', function () {
    it('should return an array with the sale', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getById').resolves(getAllReturn[0]);

      await salesControllers.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(getAllReturn[0]);
    });

    it('should return an error if the service returns an error', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'getById').resolves(saleNotFoundError);

      await salesControllers.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Sale not found',
      });
    });
  });

  describe('When update method is called', function () {
    it('should return an object with the updated sale', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: updateBodyRequest,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'update').resolves(updateServiceReturn);

      await salesControllers.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updateServiceReturn);
    });

    it('should return an error if the service returns an error', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
        body: updateBodyRequest,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'update').resolves(saleNotFoundError);

      await salesControllers.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Sale not found',
      });
    });
  });

  describe('When exclude method is called', function () {
    it('should return 204 if sale successfully deleted', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'remove').resolves({ isError: false });

      await salesControllers.exclude(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('should return an error if sale not found', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesServices, 'remove').resolves(saleNotFoundError);

      await salesControllers.exclude(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Sale not found',
      });
    });
  });
});
