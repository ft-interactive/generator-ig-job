(function (window, $) {

	'use strict';

	var Utils = IG.Utils;
	var NoHands = IG.NoHands;

	var onData = function onData(data) {
		
		// TODO
		// * clean up the incoming data - eg trailing spaces on cations etc
		// * check for missing data and report the errors using NoHands.addError()
		// * build a local data structure / model

	};

	var onDataError = function onDataError(err) {
		console.error(err);
	};

	var onReady = function onReady() {
		
		// TODO:
		// * render the data!

	};

	NoHands.init({
		onData: onData,
		onFail: onDataError,
		ready: onReady
	});

})(this, jQuery);