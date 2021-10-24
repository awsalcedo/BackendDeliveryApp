const Product = require('../models/product');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    async findByCategory(req, res, next) {
        try {
            const id_category = req.params.id_category;
            const data = await Product.findByCategory(id_category);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoría`,
                success: false,
                error: error
            });
        }
    },

    async create(req, res, next) {

        // Obtener el producto enviado desde el cliente
        let product = JSON.parse(req.body.product);
        
        // Obtener los archivos de imagen que se envía desde el cliente
        const files = req.files;

        // Permite saber cuantas imagenes se han almacenado 
        let inserts = 0;

        if(files.length === 0) {
            return res.status(501).json({
                message: 'Error al registrar el producto, al menos debe tener una imagen',
                success: false
            });
        } else {
            try {

                // Almacenar los datos del producto
                const data = await Product.create(product);
                product.id = data.id;

                const start = async () => {
                    await asyncForEach(files, async (file) => {
                        // Crear el nombre de la imagen como se va a llamr en Firebase
                        const pathImage = `image_${Date.now()}`;

                        // Guarda la imagen en Firebase y obtiene la url de la imagen que se almacenó en Firebase
                        const url = await storage(file, pathImage);

                        if (url !== undefined && url !== null) {
                            // Si guardó la imagen 1
                            if (inserts == 0) {
                                product.image1 = url;
                            } else if (inserts == 1) { // Guardó la imagen 2
                                product.image2 = url;
                            } else if (inserts == 2) { // Guardó la imagen 3
                                product.image3 = url;
                            }
                        }

                        // Actualizar las url de Firebase en la BDD
                        await Product.update(product);
                        inserts = inserts + 1;

                        // Validar si las 3 imagenes ya se terminaron de almacenar
                        if (inserts == files.length) {
                            return res.status(201).json({
                                success: true,
                                message: 'Producto registrado correctamente'
                            });
                        }
                    });
                }
                // Para inicializar el registro de todas las imagenes en Firebase y almacenar las urls en la BDD
                start();

            } catch (error) {
                console.log(`Error: ${error}`);
                return res.status(501).json({
                    message: `Error al registrar el producto ${error}`,
                    success: false,
                    error: error
                });
            }
        }
    }
}
