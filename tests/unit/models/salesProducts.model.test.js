const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { expect } = chai;

const connection = require('../../../src/models/connection');
const { salesProductsModel } = require('../../../src/models');

describe('Testing the salesProducts model', function () {
  afterEach(sinon.restore);

  describe('When insert method is called', function () {
    it('return true if insert is successful', async function () {
      sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
      const result = await salesProductsModel.insert(1, 1, 1);
      expect(result).to.be.equal(true);
    });
  });
});
