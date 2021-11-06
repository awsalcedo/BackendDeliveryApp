const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {

     /*
    * GET ROUTES
    */
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByStatus);

    /**
     * Post routes
     */
    app.post('/api/orders/create', passport.authenticate('jwt', {session: false}), OrdersController.create);


}