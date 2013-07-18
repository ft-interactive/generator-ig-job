<% if (includeBerthaSpreadsheet) { %>/*global app:true */<% } %>

(function (window, $) {

  'use strict';
<% if (includeBerthaSpreadsheet) { %>
  app.spreadsheet.get(function (data) {
    // TODO: process the data
    console.log('data', data);
  });
<% } %>
  $(function () {

    // TODO: do render implementation

  });

}(this, jQuery));
