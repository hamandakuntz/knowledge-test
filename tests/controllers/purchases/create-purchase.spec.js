const faker = require('faker');

const CreatePurchaseController = require('../../../src/controllers/purchases/create-purchases');
const ServerError = require('../../../src/utils/errors/server');
const MissingParamError = require('../../../src/utils/errors/missing-param');
const { badRequest, serverError, created } = require('../../../src/utils/http/http-helper');
const ValidationSpy = require('../mocks/mock-validation');
const PurchaseRepositorySpy = require('../mocks/mock-purchase-repository');

const mockPurchase = () => ({
    product_id: 'valid_product_id',
    price: 'valid_price',
});

const mockRequest = () => {
    return {
        body: mockPurchase(),
    };
};

const mockArrayRequest = () => {
    return {
        body: [
            mockPurchase(),
            mockPurchase(),
        ]
    };
};

const makeSut = () => {
    const validationSpy = new ValidationSpy();
    const purchaseRepositorySpy = new PurchaseRepositorySpy();
    const sut = new CreatePurchaseController(purchaseRepositorySpy, validationSpy);
    return {
        sut,
        validationSpy,
        productPurchaseSpy,
    };
};

describe('CreatePurchase Controller', () => {
    it('should return 500 if PurchaseRepository create() throws', async () => {
        const { sut, purchaseRepositorySpy } = makeSut();
        jest.spyOn(purchaseRepositorySpy, 'create').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(null)));
    });

    it('should call PurchaseRepository create() with correct values', async () => {
        const { sut, purchaseRepositorySpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(productPurchaseSpy.params).toEqual(sut.serializeProductsToDb(request.body));
    });

    it('should call Validation with correct value', async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request.body);
    });

    it('should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 400 if Validation returns an error array', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 200 if valid array data is provided', async () => {
        const { sut } = makeSut();
        const request = mockArrayRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse).toEqual(created(request.body));
    });

    it('should return 200 if valid data is provided', async () => {
        const { sut } = makeSut();
        const request = mockRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse).toEqual(created(request.body));
    });
});
