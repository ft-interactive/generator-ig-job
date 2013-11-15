# Web app generator [![Build Status](https://secure.travis-ci.org/ft-interactive/generator-ig-job.png?branch=master)](http://travis-ci.org/ft-interactive/generator-ig-job)

Yeoman generator that scaffolds out an interactive-graphic/news-app.


## Getting Started

- Install: `sudo npm install -g git+https://github.com/ft-interactive/generator-ig-job.git`
- Run: `yo ig-job`
- Run `grunt` for building and `grunt server` for preview

## Deploying

* Type `grunt deploy:live` or `grunt deploy:demo`.

You will need an `.igdeploy` file (ideally in your home directory), which should look like this:

```json
{
  "username": "John.Smith",
  "password": "kittens"
}
```


## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

* `--test-framework <framework>`

  Defaults to `mocha`. Can be switched for another supported testing framework like `jasmine`.


## Contribute

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
