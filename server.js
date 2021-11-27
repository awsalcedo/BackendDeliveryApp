const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const passport = require('passport');
const io = require('socket.io')(server);
const mercadopago = require('mercadopago');

/*
* Configuración Mercado Pago
*/
mercadopago.configure({
    access_token: 'TEST-6028900970379574-062302-e3e5d11b7871ee742832e6351694608f-191014229'
});

/*
* Sockets
*/
const orderDeliverySocket = require('./sockets/orders_delivery_socket');

/*
 * Inicializar Firebase Admin
 */

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

/* Permite recibir en la ruta (usersRoutes.js) un archivo que se subira a Firebase*/
const upload = multer({
    storage: multer.memoryStorage()
})

/*
 * Rutas
 */
const users = require('./routes/usersRoutes');
const categories = require('./routes/categoriesRoutes');
const products = require('./routes/productsRoutes');
const address = require('./routes/addressRoutes');
const orders = require('./routes/ordersRoutes');

app.set('port', port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.disable('x-powered-by');

// Llamar al socket
orderDeliverySocket(io);

/*
 * Llamando a las rutas
 */
users(app, upload);
categories(app);
address(app);
orders(app);
products(app, upload);

server.listen(3000, '192.168.100.88' || 'localhost', function() {
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada...');
});

//ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}