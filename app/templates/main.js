/*global app:true */
<% if (includeHandlebars) { %>/*global JST:true, Handlebars:true */<%} %>

(function (window, $) {

  'use strict';

  // Scope all DOM queries and manipulation to a root element, not the body or document. 
  //   - YES: $el.find('#my-div');
  //   - NO : $('#my-div');
  var $el = $(app.config.container);
<% if (includeBerthaSpreadsheet) { %>
  app.spreadsheet.get(function (data) {

    // REMOVE: this console when you are happy the data is coming from the server 
    console.log('Data returned from Bertha', data);

    // Makes "options" sheet available from a template helper
    <% if (includeHandlebars) { %>Handlebars.createOptionsHelper(data.options);<% } %>


    // ***** TODO: prepare data model *****


  });
<% } %>
  $(function () {
<% if (includeHandlebars) { %>

    // REMOVE: these two lines once you are happy that the templates are working as expected
    console.log('You can see what template helpers have been registered here:', Handlebars.helpers);
    if (window.JST) {
      console.log('Templates have been attached to JST', JST);
    }
<% } %>


<% if (includeBerthaSpreadsheet) { %>
    // ***** TODO: render the data model *****
<% } %>



  });

}(this, jQuery));
