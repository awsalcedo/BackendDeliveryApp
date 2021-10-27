const Address = require('../models/address');

module.exports = {
    async create(req, res, next) {
        try {
            const address = req.body;
            const data = await Address.create(address);

            return res.status(201).json({
                message: 'La dirección fue creada correctamente',
                success: true,
                data: data.id
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al crear la dirección',
                success: false,
                error: error
            });        
        }
    }
}