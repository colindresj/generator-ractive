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
Creates a ractive file, ractive spec file and, if using AMD or Browserify, a
ractive template.

##### Arguments
- `<name>` _required_

### ractive:component
Creates a component file, component spec file and, if using AMD or Browserify,
a component template.

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

### Browserify
Generator Ractive also works with [Browserify](http://browserify.org/). Select
the Browserify option after initializing the generator.

__Note:__
Browserify and JSHint watch tasks can't be run concurrently
(see [#197](https://github.com/jmreidy/grunt-browserify/issues/197)), so the
watch subtask for linting your source code is disabled when building with
Browserify. Instead, linting will happen as part of the build task.

### Routing
Three optional client-side routers can be included when initializing the generator.

- [Router.js](https://github.com/tildeio/router.js/)
- [Page](https://github.com/visionmedia/page.js/)
- [Director](https://github.com/flatiron/director)

## Coming Soon
- Easy deployment to Heroku

## Changelog
#### 0.1.0 (2014-08-20)
- Initial release
#### 0.2.0 (2014-11-18)
- Add Browserify support

## License
MIT
