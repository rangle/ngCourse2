var angularVersion = '2.3.0';

System.config({
  paths: {
    'unpkg:*': 'https://unpkg.com/*'
  }
});

System.config({
  baseUrl: '/',
  
  transpiler: 'typescript', 

  typescriptOptions: {
    target: 'es5',
    module: 'es2015',
    moduleResolution: 'node',
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
  },

  meta: {
    '*': {
      deps: [ 'reflect-metadata' ]
    }
  }
});

System.config({
  packageConfigPaths: [
    "unpkg:@*/*/package.json"
  ],
  
  map: {
    '@angular/core': 'unpkg:@angular/core@'+angularVersion,
    '@angular/compiler': 'unpkg:@angular/compiler@'+angularVersion,
    '@angular/common': 'unpkg:@angular/common@'+angularVersion,
    '@angular/platform-browser': 'unpkg:@angular/platform-browser@'+angularVersion,
    '@angular/platform-browser-dynamic': 'unpkg:@angular/platform-browser-dynamic@'+angularVersion,
    '@angular/router': 'unpkg:@angular/router@3.3.0-beta.1',
    'rxjs': 'unpkg:rxjs@5.0.1',
    'zone.js': 'unpkg:zone.js@0.7.4',
    'reflect-metadata': 'unpkg:reflect-metadata@0.1.8',
    "crypto": "@empty"
  },
  
  packages: {
    'app': {
      format: 'esm',
      defaultExtension: 'ts',
      main: './main.ts',
    }
  }
});