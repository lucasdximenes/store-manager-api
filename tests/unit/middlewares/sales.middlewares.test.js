const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesMiddlewares } = require('../../../src/middlewares');

describe('Test validateInsertSaleBody middleware', function () {
  afterEach(sinon.restore);

  describe('when validateInsertSaleBody is called', function () {
    it("Should return an error if req.body isn't array", async function () {
      const res = {};
      const req = { body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"sales" must be an array' });
    });

    it('Should return an error if req.body is empty', async function () {
      const res = {};
      const req = { body: [] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"sales" is empty' });
    });

    it("Should return an error if some product doesn't have quantity", async function () {
      const res = {};
      const req = { body: [{ productId: 1 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });

    it("Should return an error if some product doesn't have productId", async function () {
      const res = {};
      const req = { body: [{ quantity: 1 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it("Should return an error if some product's quantity is string", async function () {
      const res = {};
      const req = { body: [{ productId: 1, quantity: 'test' }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" should be a type of "number"',
      });
    });

    it("Should return an error if some product's quantity is negative", async function () {
      const res = {};
      const req = { body: [{ productId: 1, quantity: -1 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1',
      });
    });

    it("Should return an error if some product's productId is string", async function () {
      const res = {};
      const req = { body: [{ productId: 'test', quantity: 1 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" should be a type of "number"',
      });
    });

    it("Should return an error if some product's productId is negative", async function () {
      const res = {};
      const req = { body: [{ productId: -1, quantity: 1 }] };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateInsertSaleBody(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" must be greater than or equal to 1',
      });
    });

    it('Should call next if req.body is valid', async function () {
      const res = {};
      const req = { body: [{ productId: 1, quantity: 1 }] };

      const next = sinon.stub();

      await salesMiddlewares.validateInsertSaleBody(req, res, next);

      expect(next).to.have.been.called;
    });
  });

  describe('When validateId is called', function () {
    it('Should return an error if id is not a number', async function () {
      const res = {};
      const req = { params: { id: 'test' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateId(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"id" must be a number',
      });
    });

    it('Should return an error if id is negative', async function () {
      const res = {};
      const req = { params: { id: -1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesMiddlewares.validateId(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"id" must be greater than or equal to 1',
      });
    });

    it('Should call next if id is valid', async function () {
      const res = {};
      const req = { params: { id: 1 } };

      const next = sinon.stub();

      await salesMiddlewares.validateId(req, res, next);

      expect(next).to.have.been.called;
    });
  });
});
