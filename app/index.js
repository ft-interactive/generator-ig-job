'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var parseSpreadsheetKey = require('parse-spreadsheet-key');
var moment = require('moment');

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

  this.mainJsFile = '';

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'], callback: function(){
      var msg = [
        '\n\n\n  ---- ALL DONE! ----\n',
        'You might need to install some of the libraries listed below.\n',
        'For example, to download and install "lodash" and "backbone" run the following command:\n\n',
        '      $ bower install -S lodash backbone\n\n',
        '  * lodash   : A utility library for consistency, customization, performance, and extra features.',
        '  * backbone  : Give your JS App some Backbone with Models, Views, Collections, and Events (requires lodash)',
        '  * isotope   : An exquisite jQuery plugin for magical layouts. Enables filtering, sorting, and dynamic layouts.',
        '\n',
        '...to find more libs run:\n',
        '      $ bower search\n\n'
      ];
      if (this.spreadsheetId) {
        msg.push('Bertha republish URL: http://bertha.ig.ft.com/republish/publish/js/' + this.spreadsheetId + '/basic?d=app.data\n\n');
      }
      console.log(msg.join('\n   '));
    }.bind(this)});
  });

  this.banner = this.readFileAsString(path.join(__dirname, 'BANNER'));

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  console.log(this.banner);

  var promptFeatures = [{
    type: 'checkbox',
    name: 'features',
    message: 'Which features would you like? (Press UP/DOWN and SPACE to select/deselect an option, then press ENTER to continue.)',
    choices: [{
      name: 'Bertha spreadsheet',
      value: 'bertha',
      checked: true
    },
    {
      name: 'Will the job be served in an iframe?',
      value: 'iframe',
      checked: true
    },
    {
      name: 'Will the furniture be needed?',
      value: 'furniture',
      checked: true
    },
    {
      name: 'Modernizr',
      value: 'modernizr',
      checked: true
    },
    {
      name: 'Handlebars templates',
      value: 'handlebars',
      checked: true
    }]
  },
  {
    type: 'list',
    message: 'What library will you be using for Ajax and DOM querying/manipulation?',
    name: 'flavour',
    choices: [{
      name: 'jQuery',
      value: 'jquery',
      checked: true
    },
    {
      name: 'D3',
      value: 'd3',
      checked: false
    },
    {
      name: 'Vanilla JS - no library',
      value: 'vanilla',
      checked: false
    }]
  }
  ];

  var promptSpreadsheetId = {
    type: 'input',
    name: 'spreadsheetId',
    message: 'If you have a Google Spreadsheet URL or ID paste it here. If you don\'t then skip this step:'
  };

  // Hard coded options
  this.includeModernizr = false;
  this.spreadsheetId = null;
  this.includeBerthaSpreadsheet = false;
  this.includeFurniture = false;
  this.includeHandlebars = false;
  this.includeIFrame = true;
  this.includePublisher = false;
  this.flavour = '';
  var gen = this;
  gen.prompt(promptFeatures, function (answers) {
    var features = answers.features;

    gen.includeIFrame = features.indexOf('iframe') !== -1;
    gen.includeModernizr = features.indexOf('modernizr') !== -1;
    gen.includeBerthaSpreadsheet = features.indexOf('bertha') !== -1;
    gen.includeHandlebars = features.indexOf('handlebars') !== -1;
    gen.includePublisher = gen.includeBerthaSpreadsheet && gen.includeIFrame;
    gen.includeFurniture = features.indexOf('furniture') !== -1;
    gen.flavour = answers.flavour;

    console.log('Flav', gen.flavour);

    var suggestedDeployBase = 'features/' + moment().format('YYYY-MM-DD') + '_' + path.basename(process.cwd());
    var deployBasePrompt = {
        'message': 'Where should this project be deployed to?',
        'name': 'deployBase',
        'default': suggestedDeployBase
    };
    gen.prompt([deployBasePrompt], function (answer) {
        gen.deployBase = answer.deployBase;

        if (gen.includeBerthaSpreadsheet) {
          (function doSpreadsheetIdPrompt() {
            gen.prompt([promptSpreadsheetId], function (answer) {
              var key;
              if (answer.spreadsheetId) {
                try {
                  key = parseSpreadsheetKey(answer.spreadsheetId);
                } catch (e) {
                  gen.log('\u001b[31m' + 'Error: ' + e.message + '\u001b[0m');
                  doSpreadsheetIdPrompt();
                  return;
                }
              }
              gen.spreadsheetId = key;
              cb();
            });
          })();
        } else {
          cb();
        }
    });
  });
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

AppGenerator.prototype.mainStylesheet = function mainStylesheet() {
  this.copy('_var.scss', 'app/styles/_var.scss');
  this.copy('plain.scss', 'app/styles/main.scss');
};

AppGenerator.prototype.writeIndex = function writeIndex() {
  // prepare default content text
  var defaults = [];
  var contentText = [];

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.indexFile = this.engine(this.indexFile, this);

  var bowerComponentScripts = [
    'bower_components/ig-fill/fill.js'
  ];

  if (this.flavour === 'jquery') {
    bowerComponentScripts.push('bower_components/jquery/jquery.js');
  } else if (this.flavour === 'd3') {
    bowerComponentScripts.push('bower_components/domready/ready.js');
    bowerComponentScripts.push('bower_components/d3/d3.js');
  } else if (this.flavour === 'vanilla') {
    bowerComponentScripts.push('bower_components/domready/ready.js');
  }

  var templateScripts = [
    'scripts/templates.js',
    'bower_components/ig-utils/js/handlebars-utils.js'
  ];

  var projectScripts = [];

  if (this.includeFurniture) {
    bowerComponentScripts.push('bower_components/ig-furniture/furniture.js');
  }

  if (this.includeIFrame) {
    bowerComponentScripts.push('bower_components/ig-utils/js/iframe-utils.js');
  }

  projectScripts.push('scripts/boilerplate.js');
  projectScripts.push('scripts/main.js');

  var scriptList;

  if (this.includeHandlebars) {
    scriptList = bowerComponentScripts.concat(templateScripts, projectScripts);
  } else {
    scriptList = bowerComponentScripts.concat(projectScripts);
  }

  this.indexFile = this.appendFiles(this.indexFile, 'js', 'scripts/main.js', scriptList, null, ['.tmp', 'app']);

  var indent = '        ';

  if (this.includeModernizr) {
    var modernizrBlock = this.generateBlock('js', 'scripts/vendor/top.js', indent + '<script src="scripts/vendor/modernizr.js"></script>\n', ['.tmp', 'app']);
    this.indexFile = this.append(this.indexFile, 'head', '\n' + modernizrBlock + '\n');
  }

  this.mainJsFile = this.readFileAsString(path.join(this.sourceRoot(), 'main.js'));

  // insert Apache SSI tag as the last item in the head element
  this.indexFile = this.append(this.indexFile, 'head', '\n' + indent + '<!--#include virtual="/inc/extras-head-2.html" -->\n    ');

  // insert last Apache SSI tag after scripts
  this.indexFile = this.append(this.indexFile, 'body', indent + '<!--#include virtual="/inc/extras-foot-2.html" -->\n    ');

  var bodyClasses = [];

  if (this.includeBerthaSpreadsheet) {
    // this is the simplest way to include the body classes
    bodyClasses.push('invisible');
  }

  if (bodyClasses.length) {
    this.indexFile = this.indexFile.replace('<body>',  '<body class="' + bodyClasses.join(' ') + '">');
  }
};

AppGenerator.prototype.app = function app() {
  if (this.includeModernizr) {
    this.copy('modernizr.json', 'modernizr.json');
  }

  this.mkdir('app');

  if (this.includeHandlebars) {
    this.mkdir('app/templates');
    this.copy('main.hbs', 'app/templates/main.hbs');
  }

  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/styles/fonts');
  this.mkdir('app/images');
  this.mkdir('app/images/content');
  this.write('app/index.html', this.indexFile);

  if (this.includePublisher) {
    this.copy('publish.html', 'app/publish.html');
  } else {
    this.copy('no-publish.html', 'app/publish.html');
  }

  this.mkdir('artwork');

  this.template('boilerplate.js', 'app/scripts/boilerplate.js');
  this.template('main.js', 'app/scripts/main.js');
};
