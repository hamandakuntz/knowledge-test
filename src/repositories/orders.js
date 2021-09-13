const makeDbInstance = require('../main/factories/db');
const db = makeDbInstance();

module.exports = class OrdersRepository {
    async findAll() {
        const sql = `
            SELECT purchase_orders.id, purchase_orders.price, products.*, suppliers.*
            FROM purchase_orders
            JOIN products
            ON purchase_orders.product_id = products.id      
            JOIN suppliers
            ON products.supplier_id = suppliers.id AND
            purchase_orders.deletion_flag = 'false'                  
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

    async deleteOrderById(id) {         
        const sql = `UPDATE 
        purchase_orders
        SET deletion_flag = "true"
        WHERE id = ?`;
        return await db.update(sql, id);
    }
};

