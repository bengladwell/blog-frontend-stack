(function () {
  "use strict";
  
  var $ = window.$,
    CountriesTableView = require('./views/CountriesTable');
  
  $(function () {
    $('body').append(new CountriesTableView().render().el);
  });
  
}());
