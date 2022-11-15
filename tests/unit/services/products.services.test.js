const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { productsServices } = require('../../../src/services');
const { productsModel } = require('../../../src/models');
const { productList } = require('./mocks/products.services.mock');

const { expect } = chai;

describe('Testing the product service', function () {
  afterEach(sinon.restore);

  describe('when getAll method is called', function () {
    it('returns a list of products', async function () {
      sinon.stub(productsModel, 'getAll').resolves(productList);
      const result = await productsServices.getAll();
      expect(result).to.be.deep.equal(productList);
    });
  });

  describe('when getById method is called', function () {
    it('should successfully if id is valid', async function () {
      sinon.stub(productsModel, 'getById').resolves([productList[0]]);
      const result = await productsServices.getById(1);
      expect(result).to.be.deep.equal(productList[0]);
    });

    it('should return an error if id is not found', async function () {
      sinon.stub(productsModel, 'getById').resolves([]);
      const result = await productsServices.getById(1);
      expect(result).to.have.property('isError', true);
      expect(result).to.have.nested.property('statusCode', 404);
      expect(result).to.have.nested.property('message', 'Product not found');
    });
  });

  describe('whe insert method is called', function () {
    it('should successfully if id is valid', async function () {
      sinon.stub(productsModel, 'insert').resolves(1);
      sinon.stub(productsModel, 'getById').resolves([productList[0]]);
      const result = await productsServices.insert('Product 1');
      expect(result).to.be.deep.equal(productList[0]);
    });
  });
});
