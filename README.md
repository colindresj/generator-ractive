# generator-ractive [![Build Status](https://secure.travis-ci.org/colindresj/generator-ractive.svg?branch=master)](https://travis-ci.org/colindresj/generator-ractive)

> Yeoman generator for Ractive.js

## Usage
Install `generator-ractive` from npm:

```bash
$ npm install -g generator-ractive
```

Initiate the generator from within you project root:
```bash
$ mkdir my-ractive-project && cd $_
$ yo ractive
```

Run `grunt` to build your application and `grunt serve` to locally develop.

## Generators
Generators are available for both [ractives](http://docs.ractivejs.org/latest/new-ractive)
and [components](http://docs.ractivejs.org/latest/components).

- `yo ractive:app [options]`
- `yo ractive:ractive <name>` 
- `yo ractive:component [options] <name>`

### ractive:app
Sets up a Ractive.js project.

##### Options
- `--test-framework=[framework]`
  - Test framework to be invoked (mocha/jasmine)
  - Deafult `mocha`
- `--skip-analytics`
  - Do not include Google Analytics tracking code
  - Default: `false`

### ractive:ractive
Creates a ractive file, ractive spec file and, if using AMD, ractive template.

##### Arguments
- `<name>` _required_

### ractive:component
Creates a component file, component spec file and, if using AMD, component template.

##### Arguments
- `<name>` _required_

##### Options
- `--global`
  - Registers the component onto the Ractives.component object
  - Default: `false`
- `--isolated`
  - Isolates the component's template scope
  - Default: `false`

## Features
- CSS Autoprefixing
- Built-in preview server with LiveReload
- Sass compilation
- JavaScript linting
- Production asset minification and fingerprinting
- Bower components automatically injected using wiredep
- Image optimization
- Headless unit testing with Mocha or Jasmine
- Optional Modernizr
- Optional jQuery
- Optional Normalize CSS

### AMD
Supports [Require.js](http://requirejs.org/) out of the box. Just select the AMD
option after initializing the generator. The production file is loaded with
[Almond](https://github.com/jrburke/almond).

### Router.js
[Router.js](https://github.com/tildeio/router.js/) can easily be included when
initializing the generator.

## Coming Soon
- Director routing option
- Browserify support
- Easy deployment to Heroku

## Changelog
#### 0.1.0 (2014-08-20)
- Initial release

## License
MIT
