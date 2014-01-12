/*global app:true<% if (includeFurniture) { %>, Furniture:true<%} %>, getIGSpreadsheet:true */


(function (window, $) {

  'use strict';

  if (app.spreadsheet.id) {
    $.holdReady(true);
  }

  var processData = function processData(data) {
    app.spreadsheet.rawData = data;<% if (includeFurniture) { %>
    Furniture.setCredits(data.credits);
    if (data.options && data.options.footnotes) {
      Furniture.setFootnotes(data.options.footnotes);
    }<%} %>
  };

  // in case the Bertha request fails
  var failLoadingData = function failLoadingData(jqXHR, textStatus, errorThrown) {
    $(document.body).attr('class', '').html('Error loading data: ' + errorThrown);
    console.warn('Bertha request failed', jqXHR, textStatus, errorThrown);
  };

  var unholdReady = function unholdReady() {
    $.holdReady(false);
  };

  app.spreadsheet.get = function get(successCallback) {

    if (!this.id) {
      console.warn('Spreadsheet ID is not defined');
      return;
    }

    // do the Bertha ajax request
    this.request = getIGSpreadsheet(this.id, this.options)
                                    .done(processData)
                                    .done(successCallback || function(){})
                                    .done(unholdReady)
                                    .fail(failLoadingData);
  };

  $(function () {
    // The body is hidden until all the data has been rendered
    $(document.body).removeClass('invisible');
  });

}(this, jQuery));
