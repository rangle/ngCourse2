# Karma Configuration
Karma is the foundation of our testing workflow, it brings together our other testing tools to define what framework we want to use, what environment to test under, what specific actions we want to perform, etc. In order to do this Karma relies on a configration file *karma.config.js*. You can seed a new configuration file though the `karma init` command, which will guide you through a few basic questions to get a bare minimum setup running. If we take a look at the *karma.config.js* file in ng2-redux-starter we'll see a few important points of interest.

``` typescript
module.exports = function(config) {
	config.set({
      	frameworks: [
  		  'jaasmine',
          'Chai',
          'simoma'
		],

      	files: [
  		  'node_modules/reflect-metadata/Reflect.js',
          './src/tests.entry.ts'
		],

      	exclude: [
          'node_modules/angular2/**/*.spec.js'
		],

		plugins: [
	      require('karma-jasmine'),
	      require('karma-Chai'),
	      require('karma-sinon'),
	      require('karma-chrome-launcher'),
	      require('karma-phantomjs-launcher'),
      	  require('karma-webpack'),
    	  require('karma-sourcemap-loader'),
	      require('karma-coverage')
		],

      	preprocessors: {
          '.src/tests.entry.ts': [
  			'webpack',
          	'sourcemap',
          	'coverage'
		  ]
		},

      	coverageReporter: {
        	dir: 'coverage/',
        	reporters: [
          		{type: 'html'},
          		{type: 'text'}
			]
		},

      	reporters: [
  		  'progress',
          'coverage'
		],

      	webpack: {...},

      	port: 1999,
	    browsers: ['Chrome', 'PhantomJS'],
      	singleRun: true
	});
}
```

The configuration file is put together by exporting a function that accepts the configuration object that Karma is going to work with. Modifying certain properties on this object will tell Karma what it is we want to do. Lets go over some of the key properties used in this configuration file:

- `frameworks` is a list of the testing frameworks we want to use. We would need to have these frameworks installed through NPM as a dependency in our project or/and as a Karma plugin.
- `files` is a list of files to be loaded into the browser/testing environment. This can also take the form of a regular expression pattern as it becomes rather tedious to manually add in a new file for each new testing script created. In the ng2-redux-starter *karma.config.js* we have put the testing files we wish to include in a separate file - *src/tests.entry.ts*, which includes a `require` call using a regex pattern for importing files with the **.spec.ts* file extension. As a project grows larger and the number of files to include grows in complexity it is good practice to put file imports in its own separate file - this keeps the *karma.config.js* file cleaner and more readable. Here is what our *src/tests.entry.ts* looks like:

```typescript
declare const require: any;
let testContext = (<{ context?: Function }>require).context('./', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);
```

- `exclude` is a list of files/file patterns to ignore. There may be test scripts in the *node_module* directory that are of no use to use, so we tell Karma not to look there.
- `plugins` imports a list of plugins to load. Karma plugins are used to extend the functionality of Karma and add support for additional libraries. These plugins are NPM modules and are installed via the projects *package.json* file.
- `preprocessors` allow for some operation to be performed on the contents of a unit testing file before it is executed. These operations are carried out through the use of Karma plugins and are often utilized for transpiling operations. Since we are writing unit tests in TypeScript, *.ts* files need to be transpiled into plain Javascript in order to run in a browser based environment. In ng2-redux-starter this process is done with webpack, so we explicitly invoke the `webpack` processor on all our testing files (those ending with *.spec.ts*). We also load any source map files originating from transpilation through the `sourcemap` processor. Both the `karma-webpack` plugin and `karma-sourcemap-loader` plugin need to be installed and imported in order for this preprocessing to work.
- `coverageReporter` is used to configure the output of results of our code coverage tool (our toolChain uses Istanbul). Here we have specified to output the results in HTML and text to the *coverage/* folder.
- `reporters` is a list of reporters to use in the test cycle. Reporters can be thought of as modular tools used to "report" on some aspect of the testing routine outside of the core unit tests. Code coverage is an example of a reporter - we want it to report on how much of our code is being tested. [There are many more reporters available for Karma](https://www.npmjs.com/browse/keyword/karma-reporter) that can aid in crafting your testing workflow.  
- If the project uses webpack (and the `karma-webpack` plugin is installed), then the property `webpack` in the Karma configuration object is where we can configure webpack with Karma. Using webpack we can configure how to bundle our unit tests - whether to pack all tests into a single bundle, or each unit test in its own bundle, etc. Regardless, unit tests should not be bundled with the rest of the applications code (especially in production!). In ng2-redux-starter we have opted to bundle all unit tests together.
- `port`, `browsers`, `singleRun` configures what sort of environment our unit tests will run under. The `browsers` property specifies which browser we want Karma to launch and capture output from. We can use Chrome (launcher comes pre-installed with Karma), Firefox, Safari, IE or Opera (requires additional Karma launcher to be installed for each respective browser). For a browser-less DOM instance we can use PhantomJS (as outlined in the toolChain section). We can also manually capture output from a browser by navigating to `http://localhost:port`, where port is the number specified in the `port` property (the default value is 9876 if not specified). The property `singleRun` controls how Karma executes, if set to `true`, Karma will start, launch configured browsers, run tests, and then exit with a code of either `0` or `1` depending on whether or not all tests passed.

This is just a sample of the core properties in *karma.config.js* being used by ng2-redux-starter project. There are many more properties that can be used to extend and configure the functionality of Karma, [take a look at the official documentation for the full API breakdown](http://karma-runner.github.io/0.13/config/configuration-file.html).
