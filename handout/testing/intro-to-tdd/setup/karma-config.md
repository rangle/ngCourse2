# Karma Configuration
Karma is the foundation of our testing workflow. It brings together our other testing tools to define the framework we want to use, the environment to test under, the specific actions we want to perform, etc. In order to do this Karma relies on a configuration file *karma.config.js*. You can seed a new configuration file though the `karma init` command, which will guide you through a few basic questions to get a bare minimum setup running. If we take a look at the *karma.config.js* file in angular-redux-starter we'll see a few important points of interest:

```js
module.exports = (config) => {
  const coverage = config.singleRun ? ['coverage'] : [];

  config.set({
    frameworks: [
      'jasmine',
    ],

    plugins: [
      'karma-jasmine',
      'karma-sourcemap-writer',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-remap-istanbul',
      'karma-spec-reporter',
      'karma-chrome-launcher',
    ],

    files: [
      './src/tests.entry.ts',
      {
        pattern: '**/*.map',
        served: true,
        included: false,
        watched: true,
      },
    ],

    preprocessors: {
      './src/tests.entry.ts': [
        'webpack',
        'sourcemap',
      ],
      './src/**/!(*.test|tests.*).(ts|js)': [
        'sourcemap',
      ],
    },

    webpack: {...},

    webpackServer: {
      noInfo: true, // prevent console spamming when running in Karma!
    },

    reporters: ['spec']
      .concat(coverage)
      .concat(coverage.length > 0 ? ['karma-remap-istanbul'] : []),

    remapIstanbulReporter: {
      src: 'coverage/chrome/coverage-final.json',
      reports: {
        html: 'coverage',
      },
    },

    coverageReporter: {
      reporters: [
        { type: 'json' },
      ],
      dir: './coverage/',
      subdir: (browser) => {
        return browser.toLowerCase().split(/[ /-]/)[0]; // returns 'chrome'
      },
    },

    port: 9999,
    browsers: ['Chrome'], // Alternatively: 'PhantomJS'
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    captureTimeout: 6000,
  });
};


```

The configuration file is put together by exporting a function that accepts the configuration object that Karma is going to work with. Modifying certain properties on this object will tell Karma what it is we want to do. Let's go over some of the key properties used in this configuration file:

- `frameworks` is a list of the testing frameworks we want to use. These frameworks must be installed through NPM as a dependency in our project or/and as a Karma plugin.
- `files` is a list of files to be loaded into the browser/testing environment. This can also take the form of a glob pattern as it becomes rather tedious to manually add in a new file for each new testing script created. In the angular2-redux-starter *karma.config.js* we have put the testing files we wish to include in a separate file - *src/tests.entry.ts*, which includes a `require` call using a regex pattern for importing files with the **.spec.ts** file extension. As a project grows larger and the number of files to include grows in complexity it is good practice to put file imports in a separate file - this keeps the *karma.config.js* file cleaner and more readable. Here is what our *src/tests.entry.ts* looks like:

```typescript
let testContext = (<{ context?: Function }>require).context('./', true, /\.test\.ts/);
testContext.keys().forEach(testContext);
```

- `preprocessors` allow for some operation to be performed on the contents of a unit testing file before it is executed. These operations are carried out through the use of Karma plugins and are often used for transpiling operations. Since we are writing unit tests in TypeScript, *.ts* files must be transpiled into plain Javascript in order to run in a browser-based environment. In angular2-redux-starter this process is done with webpack, so we explicitly invoke the `webpack` processor on all of our testing files (those ending with *.spec.ts*). We also load any source map files originating from transpilation through the `sourcemap` processor.
- `coverageReporter` is used to configure the output of results of our code coverage tool (our toolchain uses Istanbul). Here we have specified to output the results in JSON and HTML.  Reports will appear in the *coverage/* folder.
- `reporters` is a list of reporters to use in the test cycle. Reporters can be thought of as modular tools used to report on some aspect of the testing routine outside of the core unit tests. Code coverage is an example of a reporter - we want it to report on how much of our code is being tested. [There are many more reporters available for Karma](https://www.npmjs.com/browse/keyword/karma-reporter) that can aid in crafting your testing workflow.
- If the project uses webpack, then the property `webpack` in the Karma configuration object is where we can configure webpack with Karma. Using webpack we can configure how to bundle our unit tests; that is, whether to pack all tests into a single bundle, or each unit test in its own bundle, etc. Regardless, unit tests should not be bundled with the rest of the applications code (especially in production!). In angular2-redux-starter we have opted to bundle all unit tests together.
- `port`, `browsers` and `singleRun` configure the environment our unit tests will run under. The `browsers` property specifies which browser we want Karma to launch and capture output from. We can use Chrome, Firefox, Safari, IE or Opera (requires additional Karma launcher to be installed for each respective browser). For a browser-less DOM instance we can use PhantomJS (as outlined in the toolchain section). We can also manually capture output from a browser by navigating to `http://localhost:port`, where port is the number specified in the `port` property (the default value is 9876 if not specified). The property `singleRun` controls how Karma executes, if set to `true`, Karma will start, launch configured browsers, run tests and then exit with a code of either `0` or `1` depending on whether or not all tests passed.

This is just a sample of the core properties in *karma.config.js* being used by angular2-redux-starter project. There are many more properties that can be used to extend and configure the functionality of Karma - [take a look at the official documentation for the full API breakdown](http://karma-runner.github.io/0.13/config/configuration-file.html).
