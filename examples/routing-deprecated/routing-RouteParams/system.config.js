var angularVersion = '2.0.0-rc.1';

System.config({
  baseUrl: '/',
  paths: {
    'npmcdn:*': 'https://npmcdn.com/*'
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
    "npmcdn:@*/*/package.json",
    "npmcdn:*/package.json"
  ],
  
  map: {
    '@angular/core': 'npmcdn:@angular/core@'+angularVersion,
    '@angular/compiler': 'npmcdn:@angular/compiler@'+angularVersion,
    '@angular/common': 'npmcdn:@angular/common@'+angularVersion,
    '@angular/platform-browser': 'npmcdn:@angular/platform-browser@'+angularVersion,
    '@angular/platform-browser-dynamic': 'npmcdn:@angular/platform-browser-dynamic@'+angularVersion,
    '@angular/http': 'npmcdn:@angular/http@'+angularVersion,
    '@angular/router-deprecated': 'npmcdn:@angular/router-deprecated@'+angularVersion,
    'immutable': 'npmcdn:immutable@3.8.1',
    'redux': 'https://npmcdn.com/redux@2.0.0/dist/redux.js',
    'ng2-redux': 'npmcdn:ng2-redux@2.3.2',
    'lodash': 'npmcdn:lodash@4.0.0',
    'invariant': 'npmcdn:invariant@2.2.1',
    'redux-thunk': 'npmcdn:redux-thunk@2.1.0',
    'redux-logger': 'npmcdn:redux-logger@2.6.0',
    'rxjs': 'npmcdn:rxjs@5.0.0-beta.6',
    'zone.js': 'npmcdn:zone.js@0.6.12',
    'reflect-metadata': 'npmcdn:reflect-metadata@0.1.3',
    "crypto": "@empty"
  },
  
  packages: {
    'app': {
      defaultExtension: 'ts',
      main: './index.ts'
    }
  }
});