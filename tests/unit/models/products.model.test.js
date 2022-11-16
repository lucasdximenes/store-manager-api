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

  describe('when insert method is called', function () {
    it('returns the id of the inserted product', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await productsModel.insert('Product 1');
      expect(result).to.be.deep.equal(1);
    });
  });

  describe('when update method is called', function () {
    it('returns if have affectedRows', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await productsModel.update(1, 'Product 1');
      expect(result).to.be.deep.equal(true);
    });
  });
});
