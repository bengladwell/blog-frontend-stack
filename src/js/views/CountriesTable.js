(function () {
  "use strict";
  
  var TableView = require('./Table'),
    template = require('../templates/countries-table');
  
  module.exports = TableView.extend({
  
    render: function () {
      var rows = [ {
        name: 'Austria',
        capital: 'Vienna',
        region: 'Europe'
      }, {
        name: 'Belarus',
        capital: 'Minsk',
        region: 'Europe'
      }, {
        name: 'Barbados',
        capital: 'Bridgetown',
        region: 'North America'
      }, {
        name: 'Micronesia',
        capital: 'Palikir',
        region: 'Oceania'
      }];

      this.$el.html(template({rows: rows}));

      return this;
    }
    
  });
  
}());
