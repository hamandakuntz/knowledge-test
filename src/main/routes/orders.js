const { adaptRoute } = require('../adapters/express-router-adapter');
const makeFindAllOrdersController = require('../factories/controllers/orders/find-all-orders');
const makeCreateOrdersController = require('../factories/controllers/orders/create-orders');
const makeDeleteOrderByIdController = require('../factories/controllers/orders/delete-order-by-id');

module.exports = (router) => {
    router.get('/orders', adaptRoute(makeFindAllOrdersController()));
    router.post('/orders', adaptRoute(makeCreateOrdersController()));
    router.delete('/orders/:id', adaptRoute(makeDeleteOrderByIdController()));
};