var angularVersion = '2.0.0';
var rcVersion = '3.0.0';

System.config({
  baseUrl: '/',
  paths: {
    'unpkg:*': 'https://unpkg.com/*'
  }
});

System.config({
  transpiler: 'typescript',
  typescriptOptions: { emitDecoratorMetadata: true },

  meta: {
    '*': {
      deps: [ 'zone.js', 'reflect-metadata' ]
    }
  }
});

System.config({
  packageConfigPaths: [
    "unpkg:@*/*/package.json",
    "unpkg:*/package.json"
  ],

  map: {
    '@angular/core': 'unpkg:@angular/core@'+angularVersion,
    '@angular/compiler': 'unpkg:@angular/compiler@'+angularVersion,
    '@angular/common': 'unpkg:@angular/common@'+angularVersion,
    '@angular/platform-browser': 'unpkg:@angular/platform-browser@'+angularVersion,
    '@angular/platform-browser-dynamic': 'unpkg:@angular/platform-browser-dynamic@'+angularVersion,
    '@angular/http': 'unpkg:@angular/http@'+angularVersion,
    '@angular/router': 'unpkg:@angular/router@'+rcVersion,
    'immutable': 'unpkg:immutable@3.8.1',
    'redux': 'unpkg:redux@2.0.0/dist/redux.js',
    '@ngrx/core': 'unpkg:@ngrx/core',
    '@ngrx/store': 'unpkg:@ngrx/store@2.1.2',
    'lodash': 'unpkg:lodash@4.0.0',
    'invariant': 'unpkg:invariant@2.2.1',
    'redux-logger': 'unpkg:redux-logger@2.6.0',
    'rxjs': 'unpkg:rxjs@5.0.0-beta.12',
    'zone.js': 'unpkg:zone.js@0.6.21',
    'reflect-metadata': 'unpkg:reflect-metadata@0.1.3',
    "crypto": '@empty',
    'timers': '@empty'
  },

  packages: {
    'app': {
      defaultExtension: 'ts',
      main: './index.ts'
    }
  }
});
