/* exported app */

var app = app || {};

app.config = {
  container: '#main-content'
};
<% if (includeBerthaSpreadsheet) { %>
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
    * data is coming from. This could be:
    *    - bertha.ig.ft.com               :  Production server via Akamai [best option] (default)
    *    - spottiswood.herokuapp.com      :  Production server origin hostname
    *    - staging.bertha.ig.ft.com       :  Staging server via Akamai
    *    - spottiswood-tupp.herokuapp.com :  Staging server origin hostname
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
    * An array of custom sheets.
    * Sheet names beginning with '+' are optional.
    *    For example "optionalsheet" will not cause an error if it's missing.
    *    ['mandatorysheet', '+optionalsheet']
    */
    // sheets: []
  }

};<% } %>
