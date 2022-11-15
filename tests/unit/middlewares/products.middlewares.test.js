const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsMiddlewares } = require('../../../src/middlewares');

describe('Test validateId middeware', function () {
  it('should return an error if id is string', async function () {
    const res = {};
    const req = { params: { id: 'test' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsMiddlewares.validateId(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({
      message: '"value" must be a number',
    });
  });

  it('should return an error if id is negative', async function () {
    const res = {};
    const req = { params: { id: -1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await productsMiddlewares.validateId(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({
      message: '"value" must be greater than or equal to 1',
    });
  });

  it('should call next if id is number', async function () {
    const res = {};
    const req = { params: { id: 1 } };
    const next = sinon.stub().returns();

    await productsMiddlewares.validateId(req, res, next);

    expect(next).to.have.been.called;
  });
});
