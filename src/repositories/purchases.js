const makeDbInstance = require('../main/factories/db');

const db = makeDbInstance();

module.exports = class PurchasesRepository {
    async findAll() {
        const sql = `
            SELECT purchase_orders.*, products.*, suppliers.*
            FROM purchase_orders
            JOIN products
            ON purchase_orders.product_id = products.id      
            JOIN suppliers
            ON products.supplier_id = suppliers.id                     
        `;
        const purchases = await db.select(sql);

        return purchases;
    }

    async create(purchases) {
        const sql = `
            INSERT INTO 
                purchases_orders (product_id, price) 
            VALUES 
                (?, ?);
        `;

        return db.persistMany(sql, purchases);
    }
};
