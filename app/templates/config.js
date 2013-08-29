/* exported app */

var app = app || {};

app.config = {
    container: '#main-content'
};

app.spreadsheet = {
<% if (!spreadsheetId) { %>
  // TODO: insert Bertha Spreadsheet ID here
<% } %>
  id: '<%= spreadsheetId %>',

  // Optional Bertha settings
  options: {

    /**
    * Preset
    *
    * Only use in combination with the 'ig' plugin
    *
    * Available presets
    *    - profiles
    *    - timelines
    */
    //preset: '',

    /**
    * Method
    *
    * Available methods:
    *   - long (default): long cache headers
    *   - short: short cache headers
    *   - view: no caching - most basic method
    */
    method: 'view'//,

    /**
    * Host
    *
    * To override the Bertha server that the
    * data is coming from
    */
    // host: '',

    /**
    * Which Bertha plugin to use
    * Available plugins:
    *   - ig (default)
    *   - gss
    */
    // plugin: '',

    /*
    * An array of custom sheets
    */
    // sheets: []
  }

};
