const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app) => {

     /*
    * GET ROUTES
    */
    app.get('/api/orders/findByStatus/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByStatus);
    app.get('/api/orders/findByDeliveryAndStatus/:id_delivery/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByDeliveryAndStatus);
    app.get('/api/orders/findByClientAndStatus/:id_client/:status', passport.authenticate('jwt', {session: false}), OrdersController.findByClientAndStatus);

    /**
     * Post routes
     */
    app.post('/api/orders/create', passport.authenticate('jwt', {session: false}), OrdersController.create);

    /*
   * PUT ROUTES
   */
   app.put('/api/orders/updateToDispatchedStatus', passport.authenticate('jwt', {session: false}), OrdersController.updateToDispatchedStatus);
   app.put('/api/orders/updateToOnTheWayStatus', passport.authenticate('jwt', {session: false}), OrdersController.updateToOnTheWayStatus);
   app.put('/api/orders/updateToDeliveredStatus', passport.authenticate('jwt', {session: false}), OrdersController.updateToDeliveredStatus);

}