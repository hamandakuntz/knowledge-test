const FindAllPurchasesController = require('../../../src/controllers/purchases/find-all-purchases');
const ServerError = require('../../../src/utils/errors/server');
const { serverError, success } = require('../../../src/utils/http/http-helper');
const ProductRepositorySpy = require('../mocks/mock-product-repository');

const makeSut = () => {
    const productRepositorySpy = new ProductRepositorySpy();
    const sut = new FindAllPurchasesController(productRepositorySpy);
    return {
        sut,
        productRepositorySpy,
    };
};

describe('FindAllPurchases Controller', () => {
    it('should return 500 if ProductPurchases findAll() throws', async () => {
        const { sut, productRepositorySpy } = makeSut();
        jest.spyOn(productRepositorySpy, 'findAll').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle();
        expect(httpResponse).toEqual(serverError(new ServerError(null)));
    });

    it('should return 200 if repository returns purchases', async () => {
        const { sut, productRepositorySpy } = makeSut();
        productRepositorySpy.result = [];
        const httpResponse = await sut.handle();
        expect(httpResponse).toEqual(success({ purchases: [] }));
    });
});
