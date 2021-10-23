const CategoriesController = require('../controllers/categoriesController');
const passport = require('passport');

module.exports = (app) => {

    /**
     * Get routes
     */
     app.get('/api/categories/getAll', passport.authenticate('jwt', {session: false}), CategoriesController.getAll);

    /**
     * Post routes
     */
    app.post('/api/categories/create', passport.authenticate('jwt', {session: false}), CategoriesController.create);


}