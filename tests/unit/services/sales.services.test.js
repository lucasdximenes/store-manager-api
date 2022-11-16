const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { salesServices } = require('../../../src/services');
const { salesModel, salesProductsModel, productsModel } = require('../../../src/models');
const { sales, serviceReturn, getAllReturn } = require('./mocks/sales.services.mock');

const { expect } = chai;

describe('Testing the sales services', function () {
  afterEach(sinon.restore);

  describe('When create method is called', function () {
    it('return an object with the new sale', async function () {
      sinon.stub(productsModel, 'getById').resolves([{ id: 1, name: 'Product 1' }]);
      sinon.stub(salesModel, 'insert').resolves(1);
      sinon.stub(salesProductsModel, 'insert').resolves(true);
      const result = await salesServices.create(sales);
      expect(result).to.be.deep.equal(serviceReturn);
    });

    it('return an error if some product is not found', async function () {
      sinon.stub(productsModel, 'getById').resolves([]);
      const result = await salesServices.create(sales);
      expect(result).to.have.property('isError', true);
      expect(result).to.have.nested.property('statusCode', 404);
      expect(result).to.have.nested.property('message', 'Product not found');
    });

    it('Return an error if insert fails', async function () {
      sinon.stub(productsModel, 'getById').resolves([{ id: 1, name: 'Product 1' }]);
      sinon.stub(salesModel, 'insert').resolves(1);
      sinon.stub(salesProductsModel, 'insert').resolves(false);
      const result = await salesServices.create(sales);
      expect(result).to.have.property('isError', true);
      expect(result).to.have.nested.property('statusCode', 500);
      expect(result).to.have.nested.property('message', 'Error inserting sale');
    });
  });

  describe('When getAll method is called', function () {
    it('returns an array with all sales', async function () {
      sinon.stub(salesModel, 'getAll').resolves(getAllReturn);
      const result = await salesServices.getAll();
      expect(result).to.be.deep.equal(getAllReturn);
    });
  });

  describe('When getById method is called', function () {
    it('returns an array with the sale if found', async function () {
      sinon.stub(salesModel, 'getById').resolves([getAllReturn[0]]);
      const result = await salesServices.getById(1);
      expect(result).to.be.deep.equal([getAllReturn[0]]);
    });

    it('returns an error if not found', async function () {
      sinon.stub(salesModel, 'getById').resolves([]);
      const result = await salesServices.getById(1);
      expect(result).to.have.property('isError', true);
      expect(result).to.have.nested.property('statusCode', 404);
      expect(result).to.have.nested.property('message', 'Sale not found');
    });
  });
});
