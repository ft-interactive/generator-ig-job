/*global app:true */
<% if (includeHandlebars) { %>/*global JST:true, Handlebars:true */<%} %>

(function (window, $) {

  'use strict';
<% if (includeIFrame) { %>
  IG.iframeUtils.setDocumentDomain();
<% } %>
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

    // REMOVE these two lines once you are happy that the templates are working as expected
    console.log('You can see what template helpers have been registered here:', Handlebars.helpers);
    if (window.JST) {
      console.log('Templates have been attached to JST', JST);
    }
<% } %>


<% if (includeBerthaSpreadsheet) { %>
    // ***** TODO: render the data model *****
<% } %>

<% if (includeIFrame) { %>
    /**
    * call this method after the DOM has rendered the initial view
    * i.e after we know the height of the content.
    * It will set the size of the parent frame to be the same
    * as the size of the content.
    */
    IG.iframeUtils.resizeParentFrameToContentSize();

    /**
    * ... or, instead of the above example, you can
    * call the following method...
    * 
    * It sets the size of the parent frame along the sides
    * that have not been set on the frame - i.e it will never override
    * the iframe's explicitly defined dimensions (unless it's 0px).
    */
    // IG.iframeUtils.resizeZeroParentFrameValuesToContent();

    /**
    * This method makes sure all links open in a new tab.
    * When using this you don't need to have target attributes
    * on link (<a>) elements. Values: '_blank', '_top', '_parent'
    */
    IG.iframeUtils.targetLinks('_blank');
<% } %>
  });

}(this, jQuery));
