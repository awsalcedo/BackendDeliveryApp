const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');

module.exports = {
    async create(req, res, next) {
        try {
            let order = req.body;
            order.status = 'PAGADO';
            // Crear la orden
            const data = await Order.create(order);

            // Recorrer todos los productos agregados a la orden
            for(const product of order.products){
                await OrderHasProducts.create(data.id, product.id, product.quantity);
            }

            return res.status(201).json({
                message: 'La orden fue creada correctamente',
                success: true,
                data: data.id
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al crear la orden',
                success: false,
                error: error
            });        
        }
    },

    async findByStatus(req, res, next) {

        try {
            // Obtener el parámetro status enviando desde el cliente
            const status = req.params.status;
            // Obtener la información de las ordenes por estado
            const data = await Order.findByStatus(status);
            console.log(`Status ${JSON.stringify(data)}`);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                message: 'Hubo un error al tratar de obtener las ordenes por estado',
                error: error,
                success: false
            })
        }

    }
}