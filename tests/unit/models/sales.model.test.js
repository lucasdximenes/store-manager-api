const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { expect } = chai;

const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');

describe('Testing the sales model', function () {
  afterEach(sinon.restore);

  describe('When insert method is called', function () {
    it('returns the id of the inserted sale', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const result = await salesModel.insert();
      expect(result).to.be.deep.equal(1);
    });
  });
});
