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

/*
 * Llamando a las rutas
 */
users(app, upload);

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