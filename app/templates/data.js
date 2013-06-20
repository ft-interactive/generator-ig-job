/*global spreadsheet:true, Furniture:true, getIGSpreadsheet:true */


(function (window, $) {

  'use strict';

  $.holdReady(true);

  var processData = function processData(data) {
    spreadsheet.rawData = data;
    Furniture.setData(data.credits);
  };

  // in case the Bertha request fails
  var failLoadingData = function failLoadingData(jqXHR, textStatus, errorThrown) {
    $(document.body).attr('class', '').html('Error loading data: ' + errorThrown);
    console.warn('Bertha request failed', jqXHR, textStatus, errorThrown);
  };

  var unholdReady = function unholdReady() {
    $.holdReady(false);
  };

  spreadsheet.get = function get(successCallback) {

    successCallback = successCallback || function(){};

    // do the Bertha ajax request
    spreadsheet.request = getIGSpreadsheet(spreadsheet.id, spreadsheet.options)
                                    .done(processData)
                                    .done(successCallback)
                                    .done(unholdReady)
                                    .fail(failLoadingData);
  };


  $(function () {
    // The body is hidden until all the data has been rendered
    $(document.body).removeClass('invisible');
  });

}(this, jQuery));
