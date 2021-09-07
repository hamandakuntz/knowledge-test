const PurchasesRepository = require('../../src/repositories/purchases');

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
    return new PurchasesRepository();
};

describe('PurchasesRepository', () => {
    describe('create()', () => {
        it('should return inserted rows length on success', async () => {
            const sut = makeSut();
            const params = mockCreateProductParams();
            const insertedRows = await sut.create(params);
            expect(insertedRows).toBe(1);
        });
    });

    describe('findAll()', () => {
        it('should return purchases list with data of the purchase, product and supplier', async () => {
            const sut = makeSut();
            const purchases = await sut.findAll();
            expect(purchases).toEqual([]);
        });
    });
});
