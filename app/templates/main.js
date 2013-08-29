<% if (includeBerthaSpreadsheet) { %>/*global app:true */<% } %>
<% if (includeHandlebars) { %>/*global JST:true */ <%} %>
<% if (includeHandlebars) { %>/*global Handlebars:true */ <%} %>

(function (window, $) {

  'use strict';
<% if (includeBerthaSpreadsheet) { %>
  app.spreadsheet.get(function (data) {
    // TODO: implement logic prepare data model
    console.log('Data returned from Bertha', data);
    <% if (includeHandlebars) { %>Handlebars.createOptionsHelper(data.options);<% } %>
  });
<% } %>
  $(function () {
    // TODO: implement code for rendering the data model
  });

}(this, jQuery));
