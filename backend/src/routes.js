const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.route('/devs')
  .get(DevController.index)
  .post(DevController.store);

routes.route('/search')
  .get(SearchController.index);

module.exports = routes;