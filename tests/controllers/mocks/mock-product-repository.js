module.exports = class ProductRepository {
    constructor() {
        this.result = 0;
    }

    async create(params) {
        this.params = params;
        return this.result;
    }
};