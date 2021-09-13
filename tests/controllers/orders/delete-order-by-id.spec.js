const faker = require('faker');
const DeleteOrderByIdController = require('../../../src/controllers/orders/delete-order-by-id');
const ServerError = require('../../../src/utils/errors/server');
const MissingParamError = require('../../../src/utils/errors/missing-param');
const { badRequest, serverError, noContent } = require('../../../src/utils/http/http-helper');
const ValidationSpy = require('../mocks/mock-validation');
const OrderRepositorySpy = require('../mocks/mock-order-repository');

const mockOrder = () => ({
    id: 'valid_id'
});

const mockRequest = () => {
    return {
        route: mockOrder(),
    };
};

const makeSut = () => {
    const validationSpy = new ValidationSpy();
    const orderRepositorySpy = new OrderRepositorySpy();
    const sut = new DeleteOrderByIdController(orderRepositorySpy, validationSpy);
    return {
        sut,
        validationSpy,
        orderRepositorySpy,
    };
};

describe('DeleteOrder Controller', () => {
    it('should return 500 if OrderRepository deleteOrderById() throws', async () => {
        const { sut, orderRepositorySpy } = makeSut();
        jest.spyOn(orderRepositorySpy, 'deleteOrderById').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(null)));
    });

    it('should call OrderRepository deleteOrderById() with acceptable values', async () => {
        const { sut, orderRepositorySpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(orderRepositorySpy.params).toEqual(request.route.id);
    });

    it('should call Validation with acceptable value', async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request.route);
    });

    it('should return 400 if validation returns an error', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 400 if validation returns an error array', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 204 if the id is valid', async () => {
        const { sut } = makeSut();
        const request = mockRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse).toEqual(noContent());
    });
});