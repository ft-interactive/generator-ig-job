/*global app:true */
/*global domready :true */

(function () {

  'use strict';

  app.views.main.render = function() {

    var html = this.model ? <% if (includeHandlebars) { %>this.template(this.model)<% } else { %>''<% } %> : this.messages.no_data;

<% if (flavour === 'jquery') { %>
    this.$el.html(html);
<% } else { %>
    this.el.innerHTML = html;
<% } %>
<% if (includeIFrame) { %>
    /**
    * IFRAME RESIZING OPTION 1
    * Set the size of the iframe to equal the content of this page.
    */
    //IG.iframeUtils.resizeParentFrameToContentSize();

    /**
    * IFRAME RESIZING OPTION 2
    * Sets the size of the iframe along the sides
    * that have not been set on the parent document - i.e it will never override
    * the iframe's explicitly defined dimensions (unless it's 0px).
    
    * For more, see code docs:
    * /bower_compnents/ig-utils/js/iframe-utils.js
    */
    // IG.iframeUtils.resizeZeroParentFrameValuesToContent();
<% } %>
    return this;
  };


  domready(function () {

    // Render the main view (see above)
    app.views.main.render();

    // Now the view has been rendered, unhide the content
    // by removing the `invisible` class from the body.
    document.body.className = document.body.className.replace(/\binvisible\b/, '');

  });

}());
