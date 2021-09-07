const { adaptRoute } = require('../adapters/express-router-adapter');
const makeFindAllPurchasesController = require('../factories/controllers/purchases/find-all-purchases');
const makeCreatePurchasesController = require('../factories/controllers/purchases/create-purchases');

module.exports = (router) => {
    router.get('/purchases', adaptRoute(makeFindAllPurchasesController()));
    router.post('/purchases', adaptRoute(makeCreatePurchasesController()));
};