const OrdersRepository = require('../../src/repositories/orders');

jest.mock('../../src/main/factories/db', () => {
    return () => ({
        persistMany: () => mockCreateOrderParams().length,
        select: () => [],
        update: () => mockDeleteOrderParams().length
    });
});

const mockCreateOrderParams = () => ([[
    'valid_product_id',
    'valid_price',
]]);

const mockDeleteOrderParams = () => ([[
    'valid_id',
]]);

const makeSut = () => {
    return new OrdersRepository();
};

describe('OrdersRepository', () => {
    describe('create()', () => {
        it('should return inserted rows length on success', async () => {
            const sut = makeSut();
            const params = mockCreateOrderParams();
            const insertedRows = await sut.create(params);
            expect(insertedRows).toBe(1);
        });
    });

    describe('findAll()', () => {
        it('should return orders list', async () => {
            const sut = makeSut();
            const orders = await sut.findAll();
            expect(orders).toEqual([]);
        });
    });

    describe('deleteOrderById()', () => {
        it('should return result on success', async () => {
            const sut = makeSut();
            const params = mockDeleteOrderParams();
            const deleted = await sut.deleteOrderById(params);
            expect(deleted).toBe(1);
        });
    });
});