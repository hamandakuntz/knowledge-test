const { serverError, badRequest, created } = require('../../utils/http/http-helper');

module.exports = class CreateOrderController {
    constructor(repository, validation) {
        this.repository = repository;
        this.validation = validation;
    }

    async handle(request) {
        try {
            const errors = this.validation.validate(request.body);
            if (errors.length > 0) {
                return badRequest(errors);
            }

            const serializedOrder = this.serializeOrdersToDb(request.body);
            await this.repository.create(serializedOrder);
            return created(request.body);
        } catch (error) {
            console.log(error);
            return serverError(error);
        }
    }

    serializeOrdersToDb(orders) {
        orders = Array.isArray(orders) ? orders : [orders];

        return orders.map(order => ([
            order.product_id,
            order.price,           
        ]));
    }
};
