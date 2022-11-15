const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsMiddlewares } = require('../../../src/middlewares');

describe('Test validateId middeware', function () {
  afterEach(sinon.restore);

  describe('when validateId is called', function () {
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

  describe('when validateInsertProductBody is called', function () {
    it("Should return an error if name isn't provided", async function () {
      const res = {};
      const req = { body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsMiddlewares.validateInsertProductBody(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"name" is required',
      });
    });

    it("Should return an error if name isn't a string", async function () {
      const res = {};
      const req = { body: { name: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsMiddlewares.validateInsertProductBody(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" should be a type of "text"',
      });
    });

    it('Should return an error if name length is less than 5', async function () {
      const res = {};
      const req = { body: { name: 'test' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsMiddlewares.validateInsertProductBody(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });

    it('Should call next if name is valid', async function () {
      const res = {};
      const req = { body: { name: 'test test' } };
      const next = sinon.stub().returns();

      await productsMiddlewares.validateInsertProductBody(req, res, next);

      expect(next).to.have.been.called;
    });
  });
});
