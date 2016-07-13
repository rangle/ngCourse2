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
      deps: ['zone.js', 'reflect-metadata']
    }
  }
});

System.config({
  packageConfigPaths: [
    "npmcdn:@*/*/package.json"
  ],

  map: {
    '@angular/core': 'npmcdn:@angular/core@' + angularVersion,
    '@angular/compiler': 'npmcdn:@angular/compiler@' + angularVersion,
    '@angular/common': 'npmcdn:@angular/common@' + angularVersion,
    '@angular/platform-browser': 'npmcdn:@angular/platform-browser@' + angularVersion,
    '@angular/platform-browser-dynamic': 'npmcdn:@angular/platform-browser-dynamic@' + angularVersion,
    '@angular/http': 'npmcdn:@angular/http@' + angularVersion,
    'immutable': 'npmcdn:immutable@3.8.1',
    'rxjs': 'npmcdn:rxjs@5.0.0-beta.6',
    'zone.js': 'npmcdn:zone.js@0.6.12',
    'reflect-metadata': 'npmcdn:reflect-metadata@0.1.3',
    "crypto": "@empty",
    'redux': 'https://npmcdn.com/redux@3.5.2',
    'ng2-redux': 'https://npmcdn.com/ng2-redux@3.2.0',
    'symbol-observable': 'https://npmcdn.com/symbol-observable@1.0.1',
    'lodash': 'https://npmcdn.com/lodash@4.13.1'
  },

  packages: {
    'app': {
      defaultExtension: 'ts',
      main: './boot.ts'
    },
    'ng2-redux': {
      format: 'cjs',
      defaultExtension: 'js',
      main: '/lib/index.js'
    },
    'redux': {
      defaultExtension: 'js',
      main: 'lib/index.js'
    },
    'symbol-observable': {
      defaultExtension: 'js',
      main: 'index.js'
    }
  }
});
