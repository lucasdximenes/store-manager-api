const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { expect } = chai;

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { getAllReturn } = require('./mocks/sales.model.mock');

describe('Testing the sales model', function () {
  afterEach(sinon.restore);

  describe('When insert method is called', function () {
    it('returns the id of the inserted sale', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await salesModel.insert();
      expect(result).to.be.deep.equal(1);
    });
  });

  describe('When getAll method is called', function () {
    it('returns an array with all sales', async function () {
      sinon.stub(connection, 'execute').resolves([getAllReturn]);
      const result = await salesModel.getAll();
      expect(result).to.be.deep.equal(getAllReturn);
    });
  });

  describe('When getById method is called', function () {
    it('returns an array with the sale', async function () {
      sinon.stub(connection, 'execute').resolves([[getAllReturn[0]]]);
      const result = await salesModel.getById(1);
      expect(result).to.be.deep.equal([getAllReturn[0]]);
    });
  });

  describe('When existSale method is called', function () {
    it('Return if sale exists', async function () {
      sinon.stub(connection, 'execute').resolves([[{ id: 1 }]]);
      const result = await salesModel.existSale(1);
      expect(result).to.be.deep.equal([{ id: 1 }]);
    });
  });

  describe('When remove method is called', function () {
    it('Remove is successful', async function () {
      sinon.stub(connection, 'execute').resolves();
      await salesModel.remove(1);
      expect(connection.execute).to.have.been.calledWith(
        'DELETE FROM StoreManager.sales WHERE id = ?',
        [1],
      );
    });
  });
});
