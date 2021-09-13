const OrdersRepository = require('../../src/repositories/orders');

jest.mock('../../src/main/factories/db', () => {
    return () => ({
        persistMany: () => mockCreateProductParams().length,
        select: () => []
    });
});

const mockCreateProductParams = () => ([[
    'valid_product_id',
    'valid_price',
]]);

const makeSut = () => {
    return new OrdersRepository();
};

describe('OrdersRepository', () => {
    describe('create()', () => {
        it('should return inserted rows length on success', async () => {
            const sut = makeSut();
            const params = mockCreateProductParams();
            const insertedRows = await sut.create(params);
            expect(insertedRows).toBe(1);
        });
    });

    describe('findAll()', () => {
        it('should return orders list with data of the order, product and supplier', async () => {
            const sut = makeSut();
            const orders = await sut.findAll();
            expect(orders).toEqual([]);
        });
    });
});
