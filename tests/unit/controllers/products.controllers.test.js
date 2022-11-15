const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { expect } = chai;

const { productsControllers } = require('../../../src/controllers');
const { productsServices } = require('../../../src/services');
const { productList } = require('./mocks/products.controllers.mock');

describe('Testing the product controller', function () {
  afterEach(sinon.restore);

  describe('when getAll method is called', function () {
    it('returns a list of products', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').resolves(productList);

      await productsControllers.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList);
    });
  });

  describe('when getById method is called', function () {
    it('should successfully if id is valid', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves(productList[0]);

      await productsControllers.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productList[0]);
    });

    it('should return an error if id is string', async function () {
      const res = {};
      const req = { params: { id: 'a' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves({
        isBoom: true,
        output: {
          statusCode: 400,
          payload: {
            message: '"value" must be a number',
          },
        },
      });

      await productsControllers.getById(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"value" must be a number',
      });
    });

    it('should return an error if id is negative', async function () {
      const res = {};
      const req = { params: { id: -1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves({
        isBoom: true,
        output: {
          statusCode: 400,
          payload: {
            message: '"value" must be greater than or equal to 1',
          },
        },
      });

      await productsControllers.getById(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"value" must be greater than or equal to 1',
      });
    });

    it('should return an error if id is not found', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves({
        isBoom: true,
        output: {
          statusCode: 404,
          payload: {
            message: 'Product not found',
          },
        },
      });

      await productsControllers.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });
});
