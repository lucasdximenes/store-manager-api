const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { productList } = require('./mocks/products.model.mock');
const { expect } = chai;

describe('Testing the product model', function () {
  afterEach(sinon.restore);

  describe('when getAll method is called', function () {
    it('returns a list of products', async function () {
      sinon.stub(connection, 'execute').resolves([productList]);
      const result = await productsModel.getAll();
      expect(result).to.be.deep.equal(productList);
    });
  });

  describe('when getById method is called', function () {
    it('returns a specific product', async function () {
      sinon.stub(connection, 'execute').resolves([productList[0]]);
      const result = await productsModel.getById(1);
      expect(result).to.be.deep.equal(productList[0]);
    });
  });
});
