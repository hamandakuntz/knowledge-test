const RequiredFieldValidator = require('../../../../validators/required-field');
const SchemaValidator = require('../../../../validators/schema');
const ValidationComposite = require('../../../../validators/validation-composite');

const getMandatoryFields = () => [
    'product_id',
    'price',
];

const getSchema = () => ({
    price: value => typeof value === 'string' && value.length <= 50,
    product_id: value => typeof value === 'number',
});

module.exports = () => {
    const validations = [];
    const fields = getMandatoryFields();
    const schema = getSchema();

    validations.push(new RequiredFieldValidator(fields));
    validations.push(new SchemaValidator(schema));

    return new ValidationComposite(validations);
};
