const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const Rol = require('../models/rol');
const storage = require('../utils/cloud_storage');

module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener los usuarios'
            });
        }
    },


    // Insertar datos de usuario sin imagenes
    async register(req, res, next) {
        try {
            const user = req.body;
            const data = await User.create(user);

            //Se crea el rol Cliente por defecto
            await Rol.create(data.id, 1);

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente, ahora inicie sesión',
                data: data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error
            });
        }
    },

    // Insertar datos de usuario con imagenes
    async registerWithImage(req, res, next) {
        try {
            const user = JSON.password(req.body.user);
            console.log(`Datos enviados del usuario: ${user}`);

            // Recibir el archivo a almacenar
            const files = req.files;
            if (files.length > 0) {
                // Crear el nombre con el que se almacenara la imagen en Firebase Storage
                const pathImage = `image_${Date.now()}`;

                // Obtener la url del archivo almacenado
                const url = await storage(files[0],  pathImage);

                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

            const data = await User.create(user);

            //Se crea el rol Cliente por defecto
            await Rol.create(data.id, 1);

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente, ahora inicie sesión',
                data: data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con el registro del usuario',
                error: error
            });
        }
    },

    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const myUser = await User.findByEmail(email);
            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            if (User.isPasswordMatched(password, myUser.password)) {
                const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {
                    //expiresIn: (60*60*24) // 1 HORA
                });
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles
                }

                console.log(`USUARIO ENVIADO ${data}`);

                return res.status(201).json({
                    success: true,
                    data: data,
                    message: 'El usuario ha sido autenticado'
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'La constraseña es incorrecta'
                });
            }

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de realizar login',
                error: error
            });
        }
    }


};