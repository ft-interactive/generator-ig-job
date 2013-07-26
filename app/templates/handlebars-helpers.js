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
