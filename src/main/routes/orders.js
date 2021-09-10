const { adaptRoute } = require('../adapters/express-router-adapter');
const makeFindAllOrdersController = require('../factories/controllers/orders/find-all-orders');
const makeCreateOrdersController = require('../factories/controllers/orders/create-orders');

module.exports = (router) => {
    router.get('/orders', adaptRoute(makeFindAllOrdersController()));
    router.post('/orders', adaptRoute(makeCreateOrdersController()));
};