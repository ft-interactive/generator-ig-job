<% if (includeBerthaSpreadsheet || includeHandlebars) { %>/*global<% if (includeBerthaSpreadsheet) { %> app:true<% } if (includeHandlebars) { %> JST:true<% } %> */<% } %>

(function (window, $) {

  'use strict';
<% if (includeBerthaSpreadsheet) { %>
  app.spreadsheet.get(function (data) {
    // TODO: process the data
    console.log('data', data);
    <% if (includeHandlebars) { %>Handlebars.createOptionsHelper(data.options);<% } %>
  });
<% } %>
  $(function () {
<% if (includeHandlebars) { %>
    // A quick 3 step example of how to use templates...

    // 1. You have a model, perhaps from Bertha
    //    Let's say you have a collections of things
    var model = [
      {
        title: 'Article One',
        subtitle: 'Subtitle one',
        body: 'paragraph one\nparagraph two\n\nparagraph three',
        image: { filename: 'images/content/image1.png' }
      },
      {
        title: 'Article Two',
        subtitle: 'Subtitle 2',
        body: 'paragraph one',
        image: { filename: 'images/content/image2.png' }
      }
    ];

    // 2. you turn the data into markup
    //    The template name is based on
    //    the .hbs filename
    var dom = JST.example_template(model);

    // 3. add the markup to the page
    $('#main-content').append(dom);<% } else { %>
    // TODO: do render implementation
<% } %>
  });

}(this, jQuery));
