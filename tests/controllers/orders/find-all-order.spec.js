const FindAllOrdersController = require('../../../src/controllers/orders/find-all-orders');
const ServerError = require('../../../src/utils/errors/server');
const { serverError, success } = require('../../../src/utils/http/http-helper');
const OrdersRepositorySpy = require('../mocks/mock-order-repository');

const makeSut = () => {
    const orderRepositorySpy = new OrdersRepositorySpy();
    const sut = new FindAllOrdersController(orderRepositorySpy);
    return {
        sut,
        orderRepositorySpy,
    };
};

describe('FindAllOrder Controller', () => {
    it('should return 500 if ProductOrder findAll() throws', async () => {
        const { sut, orderRepositorySpy } = makeSut();
        jest.spyOn(orderRepositorySpy, 'findAll').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle();
        expect(httpResponse).toEqual(serverError(new ServerError(null)));
    });

    it('should return 200 if repository returns orders', async () => {
        const { sut, orderRepositorySpy } = makeSut();
        orderRepositorySpy.result = [];
        const httpResponse = await sut.handle();
        expect(httpResponse).toEqual(success({ orders: [] }));
    });
});
