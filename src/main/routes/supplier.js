const { adaptRoute } = require('../adapters/express-router-adapter');
const makeFindAllSuppliersController = require('../factories/controllers/suppliers/find-all-suppliers');
const makeCreateSupplierController = require('../factories/controllers/suppliers/create-suppliers');

module.exports = (router) => {
    router.get('/suppliers', adaptRoute(makeFindAllSuppliersController()));
    router.post('/suppliers', adaptRoute(makeCreateSupplierController()));
};