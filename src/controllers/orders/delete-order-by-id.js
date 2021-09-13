const { serverError, noContent, badRequest } = require('../../utils/http/http-helper');

module.exports = class DeleteOrderByIdController {
    constructor(repository, validation) {
        this.repository = repository;
        this.validation = validation;
    }

    async handle(request) {
        try {
            const errors = this.validation.validate(request.route);
            if (errors.length > 0) {
                return badRequest(errors);
            }

            await this.repository.deleteOrderById(request.route.id);            
            return noContent();
        } catch (error) {
            return serverError(error);
        }
    }
};
