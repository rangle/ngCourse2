# Loaders

TypeScript isn't core JavaScript so webpack needs a bit of extra help to parse the `.ts` files. It does this through the use of **loaders**. Loaders are a way of configuring how webpack transforms the outputs of specific files in our bundles. Our `ts-loader` package is handling this transformation for TypeScript files.

Loaders can be configured – inline – when requiring/importing a module:

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
