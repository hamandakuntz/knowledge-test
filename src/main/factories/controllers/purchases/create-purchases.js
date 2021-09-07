const PurchasesRepository = require('../../../../repositories/purchases');
const CreatePurchaseController = require('../../../../controllers/purchases/create-purchases');
const makeCreatePurchaseValidators = require('../../validators/purchase/create-purchase');

module.exports = () => {
    const repository = new PurchasesRepository();
    const validators = makeCreatePurchaseValidators();

    return new CreatePurchaseController(repository, validators);
};
