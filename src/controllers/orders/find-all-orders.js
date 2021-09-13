const { serverError, success } = require('../../utils/http/http-helper');

module.exports = class FindAllOrdersController {
    constructor(repository) {
        this.repository = repository;
    }

    async handle() {
        try {
            const orders = await this.repository.findAll();
            return success({ orders });
        } catch (error) {
            return serverError(error);
        }
    }
};
