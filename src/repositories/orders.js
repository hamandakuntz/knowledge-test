const makeDbInstance = require('../main/factories/db');

const db = makeDbInstance();

module.exports = class OrdersRepository {
    async findAll() {
        const sql = `
            SELECT purchase_orders.*, products.*, suppliers.*
            FROM purchase_orders
            JOIN products
            ON purchase_orders.product_id = products.id      
            JOIN suppliers
            ON products.supplier_id = suppliers.id                     
        `;
        const orders = await db.select(sql);

        return orders;
    }   

    async create(orders) {
        const sql = `
            INSERT INTO 
                purchase_orders (product_id, price) 
            VALUES 
                (?, ?);
        `;

        return db.persistMany(sql, orders);
    }
};
