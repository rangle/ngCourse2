<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Part 13: Project Setup](#part-13-project-setup)
  - [Webpack](#webpack)
    - [Why use another tool?](#why-use-another-tool)
    - [Installation](#installation)
    - [Setup and Usage](#setup-and-usage)
    - [Output configuration](#output-configuration)
    - [Loaders](#loaders)
      - [test](#test)
      - [loader](#loader)
      - [exclude](#exclude)
      - [include](#include)
      - [raw-loader](#raw-loader)
      - [url-loader](#url-loader)
      - [css-loader](#css-loader)
      - [style-loader](#style-loader)
    - [Plugins](#plugins)
    - [Summary](#summary)
    - [Npm scripts integration](#npm-scripts-integration)
    - [Going further](#going-further)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Part 13: Project Setup #

Proper tooling and setup is good for any project, but it's especially important for Angular 2 due to all of the pieces that are involved. We've decided to use [webpack](https://github.com/webpack/webpack), a powerful tool that attempts to handle our complex integrations. Due to the number of parts of our project that webpack touches, it's important to go over the configuration to get a good understanding of what gets generated client-side.

## Webpack

### Why use another tool?

A modern JavaScript web application includes a lot of different packages and dependencies, and it's important to have something that makes sense of it all in a simple way.

Angular 2 takes the approach of breaking your application apart into many different components, each of which can have several files. Separating application logic this way is good for the developer, but can detract from user experience since doing this can increase page loading time. HTTP2 aims to solve this problem in one way, but until more is known about its effects, we will want to bundle different parts of our application together and compress it.

Our platform, the browser, must continue to provide backwards compatibility for all existing code and this necessitates slow movement of additions to the base functionality of html/css/js. The community has created different tools that transform their preferred syntax/feature set to what the browser supports to avoid binding themselves to the constraints of the web platform. This is especially evident in Angular 2 applications, where [TypeScript](http://www.typescriptlang.org/) is used heavily. Although we don't do this in our course, projects may also involve different css preprocessors (sass, stylus) or templating engines (jade, Mustache, EJS) that need to be integrated.

Webpack solves these problems by providing a common interface to integrate all of these tools and that allows us to streamline our workflow and avoid complexity.

### Installation

The easiest way to include webpack is through npm. This is how we've included it - along with a couple of other packages that it involves. The following packages should be a part of your devDependencies: `webpack`, `ts-loader`. `html-webpack-plugin`, `tslint-loader`.


### Setup and Usage

The main way to use webpack is through the cli. By default, running the command executes _webpack.config.js_, so we'll put our configuration in there.

The core concept of webpack is the **bundle**. A bundle is simply a collection of modules, where we define the boundaries for how they are separated. In this project, we have two bundles: One for our application specific client-side logic and another for 3rd party libraries. Bundles are configured through webpack using **entry points**. Webpack starts with each entry point that's been configured and from there maps out a dependency graph by going through each module's references. All of the dependencies that webpack encounters this way is packaged in that bundle.

Packages installed through npm are referenced using **commonjs** module resolution. In a JavaScript file, this would look like:

```javascript
  const app = require('./src/index.ts');
```

or TypeScript file:

```typescript
  import { Component } from 'angular2/core';
```

We will use those string values as the module names we pass to webpack.

Let's look at the entry points we've defined in this project:

```javascript
{
  ...
  entry: {
    app: './src/index.ts',
    vendor: [
      'es6-shim',
      'angular2/bundles/angular2-polyfills',
      'angular2/bootstrap',
      'angular2/platform/browser',
      'angular2/platform/common_dom',
      'angular2/core',
      'angular2/router',
      'angular2/http',
      'redux',
      'redux-thunk',
      'ng2-redux',
      'redux-logger'
    ]
  }
  ...
}
```

The entry point for `app`, `./src/index.ts`, is the base file of our Angular 2 application. If we've defined the dependencies of each module correctly, those references should connect all the parts of our application from here. The entry point for `vendor` is a list of modules that we need for our application code to work correctly. Even if these files are referenced by some module in our app bundle, we want to separate these resources in a bundle just for 3rd party code.

### Output configuration

In most cases we don't want to _just_ configure how webpack puts bundles together, we want to configure how those bundles are outputted.

- Often, we'll want to reroute where files are saved into a separate _bin_ or _dist_ folder so we don't mix up files needed for the application to run and files used in development. The way we organize files that developers consume is not really relevant to the way we organize files for our server to consume.
- Webpack transforms the code when bundling our modules and outputting them. We want to have a way of connecting the code that's been generated by webpack and the code that we've written.
- Server routes can be configured in many different ways. We probably want some way of configuring webpack to take our server routing setup into consideration.

All of these configuration options are handled by the config's **output** property. Let's look at how we've setup our config to address these issues:

```javascript
{
  ...
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: "/",
    sourceMapFilename: '[name].[hash].js.map'
  }
  ...
}
```

**Note**: Some options have words wrapped in square brackets. Webpack has the ability to parse parameters for these properties, with each property having a different set of parameters available for substitution. Here, we're using `name`, the name of the bundle, and `hash`, a hash value of the bundle's content.

To save bundled files in a different folder, we use the `path` property. Here, `path` tells webpack that all of the output files need to be saved to `path.resolve(__dirname, 'dist')`. In our case, we save each bundle into a separate file. The name of this file is specified by the `filename` property. Linking these bundled files and the files we've actually coded is done using what's known as source maps. There are different ways to configure source maps. What we want is to save these source maps in a separate file specified by the `sourceMapFilename` property. The way the server accesses the files might not directly follow the filesystem tree. For us, we want to use the files saved under _dist_ as the root folder for our server. To let webpack know this, we've set the `publicPath` property to `/`.


### Loaders

TypeScript isn't core JavaScript so webpack needs a bit of extra help to parse the **.ts** files. It does this through the use of **loaders**. Loaders are a way of configuring how webpack transforms the outputs of specific files in our bundles. Our `ts-loader` package is handling this transformation for TypeScript files.

Loaders can be configured directly in the module file during require calls:

```javascript
const app = require('ts!./src/index.ts');
```

The loader is specified by using the `!` character to separate the module reference and the loader that it will be run through. More than one loader can be used and those are separated with `!` in the same way. Loaders are executed right to left.

```javascript
const app = require('ts!tslint!./src/index.ts');
```

Note that although the packages are named `ts-loader`, `tslint-loader`, `style-loader`, we don't need to include the `-loader` part in our config. Be careful with configuring loaders this way - it couples implementation details of different stages of your application together so it might not be the right choice in a lot of cases. We can configure loaders in other ways such as a chain of loader tasks. Loaders tasks can have the following properties:

#### test
The file path must match this condition to be handled. This is commonly used to test file extensions eg. `/\.ts$/`

#### loader
The loaders that will be used to transform the input. This follows the syntax specified above.

#### exclude
The file path must not match this condition to be handled. This is commonly used to exclude file folders. eg. `/node_modules/`

#### include
The file path must match this condition to be handled. This is commonly used to include file folders.  eg. `path.resolve(__dirname, 'app/src')`.


Each setting can be specified as a string, regular expression (in the form of `RegExp`), function with signature `(absolutePath: string): bool` or an array of any of these, which are tested and combined with `&&`.

Our TypeScript loader task will look like this:

```javascript
{
  test: /\.ts$/,
  loader: 'ts-loader',
  exclude: /node_modules/
}
```

This runs the typescript compiler which respects our configuration settings as specified above. We want to be able to handle other files and not just TypeScript files, so we need to specify a list of loaders. This is done by creating an array of tasks. Tasks specified in this array are chained, so if a file matches multiple conditions, it will be processed using each task in order.

Our task array for this project looks like this:

```javascript
{
  ...
  module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint'
    }],
    loaders: [
      { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css?sourceMap' },
      { test: /\.svg/, loader: 'url' },
      { test: /\.eot/, loader: 'url' },
      { test: /\.woff/, loader: 'url' },
      { test: /\.woff2/, loader: 'url' },
      { test: /\.ttf/, loader: 'url' },
    ],
    noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
  }
  ...
}
```

There are a few things that should jump out, one being the preLoaders array. The preLoaders array works just like the loaders array only that it is a separate task chain that is executed before the loaders task chain.

Another thing is the references to css, svg, eot, ... files. We're asking webpack to process non-JavaScript files, but only JavaScript files have been specified as entry points. We connect these two by importing these other file types in your JavaScript. At the top of your file you'll have something like this:

```javascript
import './styles/style.css';
```

You also see a few other loaders:

#### raw-loader
Returns the file content as a string.

#### url-loader
Returns a base64 encoded data url if the file size is under a certain threshold, otherwise it just returns the file.

#### css-loader
Resolves `@import` and `url` references in css files as modules.

#### style-loader
Injects a style tag with bundled css in the head tag. This is appended as a child element of the head tag using on page javascript.


### Plugins

Plugins are a way of executing different code at different stages of the webpack bundling process while being provided the inputs/outputs of the bundler at those stages. This lets plugins change the behaviour of loaders and basic bundling.

One plugin we're using is the html webpack plugin. This plugin lets us generate html with the ability to inject chunks or bundles into html files where we want them. Our configuration will look like this:


```javascript
new HtmlWebpackPlugin({
  template: './src/index.html',
  inject: 'body',
  minify: false
});
```

### Summary

When we put everything together, our complete file will look something like this:

```javascript
'use strict';

const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basePlugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[hash].bundle.js'),

  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body',
    minify: false
  })
];

const envPlugins = {
    production: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    development: []
};

const plugins = basePlugins.concat(envPlugins[process.env.NODE_ENV] || []);

module.exports = {
  entry: {
    app: './src/index.ts',
    vendor: [
      'es6-shim',
      'angular2/bundles/angular2-polyfills',
      'angular2/bootstrap',
      'angular2/platform/browser',
      'angular2/platform/common_dom',
      'angular2/core',
      'angular2/router',
      'angular2/http',
      'redux',
      'redux-thunk',
      'ng2-redux',
      'redux-logger'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: "/",
    sourceMapFilename: '[name].[hash].js.map'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },

  plugins: plugins,

  module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint'
    }],
    loaders: [
      { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css?sourceMap' },
      { test: /\.svg/, loader: 'url' },
      { test: /\.eot/, loader: 'url' },
      { test: /\.woff/, loader: 'url' },
      { test: /\.woff2/, loader: 'url' },
      { test: /\.ttf/, loader: 'url' },
    ],
    noParse: [ /zone\.js\/dist\/.+/, /angular2\/bundles\/.+/ ]
  }
}
```

### Npm scripts integration

Npm has the ability to create and execute tasks using its scripts feature. We rely on npm scripts to manage most of our project tasks and webpack fits in as well. Webpack execution fits into a project's build stage, where files transition from a development phase to a distribution phase, so we'll want to add it in our `build` script.

Npm scripts are described in the `scripts` property of your _package.json_ file. Our setup looks like this:

```json
...
  scripts: {
    "clean": "rimraf dist",
    "prebuild": "npm run clean",
    "build": "NODE_ENV=production webpack",
  }
...
```

Npm allows pre and post task binding by prepending the word `pre` and `post` to the task name respectively. Here, our `prebuild` task is executed before our `build` task. Note that we can run npm scripts inside another npm script. We don't want to create task chains that are too complex to follow however, but ones that represent our task flows.

To invoke the `build` script we run the command `npm run build`, which first runs the `prebuild` task. The `prebuild` task runs the `clean` task, which executes the `rimraf dist` command. `rimraf` is an npm package that recursively deletes everything inside the folder passed in the argument. After completing that task, it runs the `build` task which sets the environment variable `NODE_ENV` to `production` before invoking webpack. According to our config, webpack will go through our `app` and `vendor` entry points and generate js and html files that will be saved in a newly created _dist_ folder.

### Going further

Webpack also does things like hot code reloading and code optimization which we haven't covered. For more information you can check out the [official documentation](http://webpack.github.io/docs/). The source is also available on [Github](https://github.com/webpack/webpack).
