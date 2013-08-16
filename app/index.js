'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');


var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';

  // for hooks to resolve on mocha by default
  if (!options['test-framework']) {
    options['test-framework'] = 'mocha';
  }

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', { as: 'app' });

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.mainJsFile = '';

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'], callback: function(){
      var msg = [
        '\n\n\n  ---- ALL DONE! ----\n',
        'You might need to install some of the libraries listed below.\n',
        'For example, to download and install "lodash" and "backbone" run the following command:\n\n',
        '      $ bower install -S lodash backbone\n\n',
        '  * lowdash   : A utility library for consistency, customization, performance, and extra features.',
        '  * backbone  : Give your JS App some Backbone with Models, Views, Collections, and Events (requires lodash)',
        '  * isotope   : An exquisite jQuery plugin for magical layouts. Enables filtering, sorting, and dynamic layouts.',
        '  * d3        : A JavaScript visualization library for HTML and SVG',
        '\n',
        '...to find more libs run:\n',
        '      $ bower search\n\n'
      ];
      console.log(msg.join('\n   '));
    }});
  });

  this.yeoman = this.readFileAsString(path.join(__dirname, 'BANNER'));

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  console.log(this.yeoman);

  var prompts = [{
    type: 'checkbox',
    name: 'features',
    message: 'What more would you like?',
    choices: [{
      name: 'Twitter Bootstrap for Sass',
      value: 'compassBootstrap',
      checked: true
    }, {
      name: 'RequireJS',
      value: 'includeRequireJS',
      checked: true
    }, {
      name: 'Autoprefixer for your CSS',
      value: 'autoprefixer',
      checked: true
    }]
  }];

  // Hard coded options
  this.compassBootstrap = false;
  this.includeRequireJS = false;
  this.autoprefixer = true;
  this.spreadsheetId = null;
  this.includeBerthaSpreadsheet = false;
  this.includeHandlebars = false;

  var confirmUsingBerthaSpreadsheet = {
    type: 'confirm',
    name: 'includeBerthaSpreadsheet',
    message: 'Will you be using a Bertha Spreadsheet?',
    default: true
  };

  var promptSpreadsheetId = {
    type: 'input',
    name: 'spreadsheetId',
    message: 'If you have a Spreadsheet ID or URL paste it here. If you don\'t then skip this step:'
  };

  var promptHandlebars = {
    type: 'confirm',
    name: 'includeHandlebars',
    message: 'Include Handlebars templates?',
    default: true
  };

  function doHandlebarsPrompt() {
    this.prompt([promptHandlebars], function (answer) {
      this.includeHandlebars = !!answer.includeHandlebars;
      cb();
    }.bind(this));
  }

  this.prompt([confirmUsingBerthaSpreadsheet], function (answer) {
    if (this.includeBerthaSpreadsheet = !!answer.includeBerthaSpreadsheet) {
      this.prompt([promptSpreadsheetId], function (answer) {
        var id = (answer.spreadsheetId || '').replace(/^[\ \'\"']+/, '').replace(/[\ \'\"']+$/, '');
        if (id.substring(0,8) === 'https://') {
            id = require('url').parse(id, true).query.key;
        }
        this.spreadsheetId = id;
        doHandlebarsPrompt.call(this);
      }.bind(this));
    } else {
      doHandlebarsPrompt.call(this);
    }

  }.bind(this));

  // Don't bother to prompt at the moment
  // this.prompt(prompts, function (answers) {
  //   var features = answers.features;

  //   // manually deal with the response, get back and store the results.
  //   // we change a bit this way of doing to automatically do this in the self.prompt() method.
  //   this.compassBootstrap = features.indexOf('compassBootstrap') !== -1;
  //   this.includeRequireJS = features.indexOf('includeRequireJS') !== -1;
  //   this.autoprefixer = features.indexOf('autoprefixer') !== -1;

  //   cb();
  // }.bind(this));
};

AppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

AppGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

AppGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

AppGenerator.prototype.h5bp = function h5bp() {
  this.copy('htaccess', 'app/.htaccess');
};

AppGenerator.prototype.bootstrapImg = function bootstrapImg() {
  if (this.compassBootstrap) {
    this.copy('glyphicons-halflings.png', 'app/images/glyphicons-halflings.png');
    this.copy('glyphicons-halflings-white.png', 'app/images/glyphicons-halflings-white.png');
  }
};

AppGenerator.prototype.bootstrapJs = function bootstrapJs() {
  // TODO: create a Bower component for this
  if (this.compassBootstrap) {
    this.copy('bootstrap.js', 'app/scripts/vendor/bootstrap.js');
  }
};

AppGenerator.prototype.mainStylesheet = function mainStylesheet() {
  if (this.compassBootstrap) {
    this.copy('boostrap.scss', 'app/styles/main.scss');
  } else {
    this.copy('_var.scss', 'app/styles/_var.scss');
    this.copy('plain.scss', 'app/styles/main.scss');
  }
};

AppGenerator.prototype.writeIndex = function writeIndex() {
  // prepare default content text
  var defaults = [];
  var contentText = [];

  var bowerComponentScripts = [
    'bower_components/jquery/jquery.js',
    'bower_components/ig-fill/fill.js',
    'bower_components/ig-furniture/furniture.js',
    'bower_components/bertha-ig-gist/request.js'
  ];

  var templateScripts = [
    'scripts/templates.js',
    'scripts/handlebars-helpers.js'
  ];
  
  var projectScripts = [
      'scripts/config.js',
      'scripts/data.js',
      'scripts/main.js'
  ];

  var scriptList;

  if (this.includeHandlebars) {
    scriptList = bowerComponentScripts.concat(templateScripts, projectScripts);
  } else {
    scriptList = bowerComponentScripts.concat(projectScripts);
  }

  if (!this.includeRequireJS) {
    this.indexFile = this.appendFiles(this.indexFile, 'js', 'scripts/main.js', scriptList, null, ['.tmp', 'app']);
  }

  if (this.compassBootstrap && !this.includeRequireJS) {
    // wire Twitter Bootstrap plugins
    this.indexFile = this.appendFiles(this.indexFile, 'js', 'scripts/plugins.js', [
      'bower_components/sass-bootstrap/js/bootstrap-affix.js',
      'bower_components/sass-bootstrap/js/bootstrap-alert.js',
      'bower_components/sass-bootstrap/js/bootstrap-dropdown.js',
      'bower_components/sass-bootstrap/js/bootstrap-tooltip.js',
      'bower_components/sass-bootstrap/js/bootstrap-modal.js',
      'bower_components/sass-bootstrap/js/bootstrap-transition.js',
      'bower_components/sass-bootstrap/js/bootstrap-button.js',
      'bower_components/sass-bootstrap/js/bootstrap-popover.js',
      'bower_components/sass-bootstrap/js/bootstrap-typeahead.js',
      'bower_components/sass-bootstrap/js/bootstrap-carousel.js',
      'bower_components/sass-bootstrap/js/bootstrap-scrollspy.js',
      'bower_components/sass-bootstrap/js/bootstrap-collapse.js',
      'bower_components/sass-bootstrap/js/bootstrap-tab.js'
    ], null, []);
  }

  if (!this.includeRequireJS) {
    this.mainJsFile = this.readFileAsString(path.join(this.sourceRoot(), 'main.js'));
  }

  // insert body Apache SSI tags
  this.indexFile = this.indexFile.replace('<body>', '<body>\n        <!--#include virtual="/inc/fallback.html" -->\n        <!--#include virtual="/inc/extras-foot-1.html" -->\n');
  this.indexFile = this.indexFile.replace('</body>', '\n        <!--#include virtual="/inc/extras-foot-2.html" -->\n    </body>');

  // this is the simplest way to include the body classes
  this.indexFile = this.indexFile.replace('<body>',  '<body class="invisible">');

};

// TODO(mklabs): to be put in a subgenerator like rjs:app
AppGenerator.prototype.requirejs = function requirejs() {
  if (!this.includeRequireJS) {
    return;
  }

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/main.js', ['bower_components/requirejs/require.js'], {
    'data-main': 'scripts/main'
  });

  // add a basic amd module
  this.write('app/scripts/app.js', [
    '/*global define */',
    'define([], function () {',
    '    \'use strict\';\n',
    '    return \'\\\'Allo \\\'Allo!\';',
    '});'
  ].join('\n'));

  this.template('require_main.js', 'app/scripts/main.js');
};

AppGenerator.prototype.app = function app() {
  this.copy('ftppass', '.ftppass');
  this.mkdir('app');

  if (this.includeHandlebars) {
    this.mkdir('app/templates');
    this.copy('example_template.hbs', 'app/templates/example_template.hbs');
    this.copy('example_partial.hbs', 'app/templates/_example_partial.hbs');
    this.copy('handlebars-helpers.js', 'app/scripts/handlebars-helpers.js');
  }

  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/styles/fonts');
  this.mkdir('app/images');
  this.mkdir('app/images/content');
  this.write('app/index.html', this.indexFile);
  if (!this.includeRequireJS) {
    if (this.includeBerthaSpreadsheet) {
      this.template('config.js', 'app/scripts/config.js');
      this.template('data.js', 'app/scripts/data.js');
    }
    this.template('main.js', 'app/scripts/main.js');
  }
};
