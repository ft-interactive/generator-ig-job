# OBSOLETE

Please use the [Project Starter Kit](http://ft-interactive.github.io/) instead.

# Web app generator [![Build Status](https://secure.travis-ci.org/ft-interactive/generator-ig-job.png?branch=master)](http://travis-ci.org/ft-interactive/generator-ig-job)

Yeoman generator that scaffolds out an interactive-graphic/news-app.

## Installing the generator

    sudo npm install -g git+https://github.com/ft-interactive/generator-ig-job.git
    
## How to use

### Generating a new project

1. Update yo, bower and this generator to the latest versions: `sudo npm install -g yo bower git+https://github.com/ft-interactive/generator-ig-job.git`

2. Make a new directory and `cd` into it, then run the generator: `yo ig-job`

3. Generate a basic modernizr.js file to start off with: `grunt modernizr`


### Developing

- Run `grunt serve` and start developing.
  - If it fails to run, you might need to install dependencies: `npm install && bower install` (then try `grunt serve` again)

- To install a new component, eg Backbone:
  - Run `bower install backbone --save` (which will download it into your `bower_components` folder and make a note of it in `bower.json`)
  - Add a `<script>` tag in your `index.html`, or `@import` it in your `main.scss`, as appropriate
  - If you're not sure what a component's name is, try searching: `bower search backbone`

- If you need any more Modernizr tests, you can add them in `modernizr.json` and then run `grunt modernizr` to regenerate your `modernizr.js`.


### Deploying

* Run `grunt build`, which creates an optimised version of your project in `dist`.
* Type `grunt deploy:live` or `grunt deploy:demo`.

You will need an `.igdeploy` file (ideally in your home directory, so it works for all your projects), which should look like this:

```json
{
  "username": "John.Smith",
  "password": "kittens"
}
```


## Options

Flags you can use when running `yo ig-job`:

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `--test-framework <framework>`

  Defaults to `mocha`. Can be switched for another supported testing framework like `jasmine`.
