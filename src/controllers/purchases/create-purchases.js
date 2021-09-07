const { serverError, badRequest, created } = require('../../utils/http/http-helper');

module.exports = class CreatePurchaseController {
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

            const serializedPurchase = this.serializePurchaseToDb(request.body);
            await this.repository.create(serializedPurchase);
            return created(request.body);
        } catch (error) {
            return serverError(error);
        }
    }

    serializeProductsToDb(purchases) {
        purchases = Array.isArray(purchases) ? purchases : [purchases];

        return purchases.map(purchase => ([
            purchase.product_id,
            purchase.price,           
        ]));
    }
};
