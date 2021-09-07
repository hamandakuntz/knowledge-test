const { serverError, success } = require('../../utils/http/http-helper');

module.exports = class FindAllPurchasesController {
    constructor(repository) {
        this.repository = repository;
    }

    async handle() {
        try {
            const purchases = await this.repository.findAll();
            return success({ purchases });
        } catch (error) {
            return serverError(error);
        }
    }
};
