const AddressController = require('../controllers/addressController');
const passport = require('passport');

module.exports = (app) => {

    /**
     * Get routes
     */
     //app.get('/api/categories/getAll', passport.authenticate('jwt', {session: false}), CategoriesController.getAll);

    /**
     * Post routes
     */
    app.post('/api/address/create', passport.authenticate('jwt', {session: false}), AddressController.create);


}