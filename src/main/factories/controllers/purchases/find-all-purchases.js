const PurchasesRepository = require('../../../../repositories/purchases');
const FindAllPurchasesController = require('../../../../controllers/purchases/find-all-purchases');

module.exports = () => {
    const repository = new PurchasesRepository();

    return new FindAllPurchasesController(repository);
};
