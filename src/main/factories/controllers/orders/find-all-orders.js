const OrdersRepository = require('../../../../repositories/orders');
const FindAllOrdersController = require('../../../../controllers/orders/find-all-orders');

module.exports = () => {
    const repository = new OrdersRepository();

    return new FindAllOrdersController(repository);
};
