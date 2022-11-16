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

    it('should return an error if id is not found', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves({
        isError: true,
        statusCode: 404,
        message: 'Product not found',
      });

      await productsControllers.getById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });

  describe('when create method is called', function () {
    it('Should return a new product if it is created successfully', async function () {
      const res = {};
      const req = { body: { name: 'Product 1' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'insert').resolves({
        id: 1,
        name: 'Product 1',
      });

      await productsControllers.create(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        name: 'Product 1',
      });
    });
  });

  describe('when update method is called', function () {
    it('Should return a product if it is updated successfully', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { name: 'Product 1' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'update').resolves({
        id: 1,
        name: 'Product 1',
      });

      await productsControllers.update(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith({
        id: 1,
        name: 'Product 1',
      });
    });

    it('Should return an error if product is not found', async function () {
      const res = {};
      const req = { params: { id: 1 }, body: { name: 'Product 1' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'update').resolves({
        isError: true,
        statusCode: 404,
        message: 'Product not found',
      });

      await productsControllers.update(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });

  describe('when exclude method is called', function () {
    it('Should return only status code 204 if product is excluded successfully', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'remove').resolves({
        isError: false,
      });

      await productsControllers.exclude(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it('Should return an error if product is not found', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'remove').resolves({
        isError: true,
        statusCode: 404,
        message: 'Product not found',
      });

      await productsControllers.exclude(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: 'Product not found',
      });
    });
  });

  describe('when searchByQuery method is called', function () {
    it('Should return a list of products if search is successful', async function () {
      const res = {};
      const req = { query: { q: 'Martelo' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsServices, 'searchByQuery').resolves([productList[0]]);

      await productsControllers.searchByQuery(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([productList[0]]);
    });
  });
});
