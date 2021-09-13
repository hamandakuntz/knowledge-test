const faker = require('faker');

const CreateOrderController = require('../../../src/controllers/orders/create-orders');
const ServerError = require('../../../src/utils/errors/server');
const MissingParamError = require('../../../src/utils/errors/missing-param');
const { badRequest, serverError, created } = require('../../../src/utils/http/http-helper');
const ValidationSpy = require('../mocks/mock-validation');
const OrderRepositorySpy = require('../mocks/mock-order-repository');

const mockOrder = () => ({
    product_id: 'valid_product_id',
    price: 'valid_price',
});

const mockRequest = () => {
    return {
        body: mockOrder(),
    };
};

const mockArrayRequest = () => {
    return {
        body: [
            mockOrder(),
            mockOrder(),
        ]
    };
};

const makeSut = () => {
    const validationSpy = new ValidationSpy();
    const orderRepositorySpy = new OrderRepositorySpy();
    const sut = new CreateOrderController(orderRepositorySpy, validationSpy);
    return {
        sut,
        validationSpy,
        orderRepositorySpy,
    };
};

describe('CreateOrder Controller', () => {
    it('should return 500 if OrderRepository create() throws', async () => {
        const { sut, orderRepositorySpy } = makeSut();
        jest.spyOn(orderRepositorySpy, 'create').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(null)));
    });

    it('should call OrderRepository create() with correct values', async () => {
        const { sut, orderRepositorySpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(orderRepositorySpy.params).toEqual(sut.serializeOrdersToDb(request.body));
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
