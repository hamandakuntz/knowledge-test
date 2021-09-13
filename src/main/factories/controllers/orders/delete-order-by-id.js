const OrdersRepository = require('../../../../repositories/orders');
const DeleteOrderByIdController = require('../../../../controllers/orders/delete-order-by-id');
const makeDeleteOrderValidators = require('../../validators/orders/delete-order-by-id');

module.exports = () => { 
    const repository = new OrdersRepository();
    const validators = makeDeleteOrderValidators();
    return new DeleteOrderByIdController(repository, validators);
};
