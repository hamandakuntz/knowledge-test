const OrdersRepository = require('../../../../repositories/orders');
const CreateOrderController = require('../../../../controllers/orders/create-orders');
const makeCreateOrderValidators = require('../../validators/orders/create-order');

module.exports = () => {
    const repository = new OrdersRepository();
    const validators = makeCreateOrderValidators();

    return new CreateOrderController(repository, validators);
};
