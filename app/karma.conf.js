
module.exports = function (config) {

  config.set({

    frameworks: [
      'mocha',
      'chai',
      'sinon'
    ],

    files: [
      './src/tests.entry.ts'
    ],

    plugins: [
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-sinon'),
      require('karma-chrome-launcher'),
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-mocha-reporter'),
      require('karma-coverage')
    ],

    preprocessors: {
      './src/tests.entry.ts': [
        'webpack',
        'sourcemap',
        'coverage'
      ]
    },

    webpack: {
      devtool: 'source-map',
      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
      },
      module: {
        loaders: [
          { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
          { test: /\.html$/, loader: 'raw' },
          { test: /\.css$/, loader: 'style-loader!css-loader' },
          { test: /\.svg/, loader: 'url' },
          { test: /\.eot/, loader: 'url' },
          { test: /\.woff/, loader: 'url' },
          { test: /\.woff2/, loader: 'url' },
          { test: /\.ttf/, loader: 'url' },
        ],
        // postLoaders: [
        //   {
        //     test: /\.ts$/,
        //     exclude: [
        //       /node_modules\//
        //     ],
        //     loader: 'istanbul-instrumenter'
        //   }
        // ]
      },
      stats: { colors: true, reasons: true },
      debug: false
    },
    
    webpackServer: {
      noInfo: true // prevent console spamming when running in Karma!
    },
    
    reporters: ['mocha'], //'coverage'],

    // coverageReporter: {
    //   reporters: [
    //     { type: 'json' },
    //     { type: 'html' },
    //     { type: 'text-summary' }
    //   ],
    //   dir: './app/__build/coverage'
    // },

    port: 9999,

    colors: true,

    //logLevel: config.LOG_DEBUG,
    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'], // Alternatively: 'PhantomJS'

    captureTimeout: 6000,

    singleRun: true

  });
};
