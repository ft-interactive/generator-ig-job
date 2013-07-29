/*

Example helper for turning strings and
arrays of strings into paragraphs

Handlebars.registerHelper('p', function (text) {
  if (!text) {
    return '';
  }

  if (!(text instanceof Array)) {
    text = text.toString().split(/[\n\r]+/g);
  }

  return new Handlebars.SafeString('<p>' + text.join('</p><p>') + '</p>');
});
*/

Handlebars.createGlobalHelper = function(name, hash, commands) {
  commands = commands || {};
  Handlebars.registerHelper(name, function(context) {
    if (!context) {
      return '';
    }

    var c = context.toString();
    var val = hash[c];
    var fn = typeof commands[c] === 'function' ? commands[c] : null;

    if (fn) {
      context = val;
      val = fn.apply(this, arguments);
    }

    return val;
  });
};

Handlebars.createOptionsHelper = function(options, commands) {
  var isAbsURL = /^(https?:\/\//;
  var o = {
    'image.baseURL': function(baseURL, filename) {
      baseURL = baseURL || 'images/content';
      return isAbsURL.test(filename) ? filename : (baseURL + '/' + filename).replace(/\/{2,}/, '/');
    }
  };
  Handlebars.Utils.extend(o, commands);
  Handlebars.createGlobalHelper('options', options, o);
};
