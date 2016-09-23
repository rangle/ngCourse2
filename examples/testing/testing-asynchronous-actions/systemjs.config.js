/**
 * PLUNKER VERSION
 * (based on systemjs.config.js in angular.io)
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {

  var ngVer = '@2.0.0'; // lock in the angular package version; do not let it float to current!
  var routerVer = '@3.0.0'; // lock router version
  var formsVer = '@0.3.0'; // lock forms version

  //map tells the System loader where to look for things
  var map = {
    'app':                        'app',
    '@angular':                   'https://unpkg.com/@angular', // sufficient if we didn't pin the version
    '@angular/forms':             'https://unpkg.com/@angular/forms' + formsVer,
    '@angular/router':            'https://unpkg.com/@angular/router' + routerVer,
    'angular2-in-memory-web-api': 'https://unpkg.com/angular2-in-memory-web-api', // get latest
    'rxjs':                       'https://unpkg.com/rxjs@5.0.0-beta.11',
    'ts':                         'https://unpkg.com/plugin-typescript@4.0.10/lib/plugin.js',
    'typescript':                 'https://unpkg.com/typescript@2.0.2/lib/typescript.js',
 };

  //packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.ts',  defaultExtension: 'ts' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'core',
    'common',
    'compiler',
    'platform-browser',
    'platform-browser-dynamic',
    'http',
    'upgrade',
  ];
  
  var ngTestingPackageNames = [
    'core',
    'common',
    'compiler',
    'platform-browser',
    'platform-browser-dynamic',
    'router'
  ];

  // Add map entries for each angular package
  // only because we're pinning the version with `ngVer`.
  ngPackageNames.forEach(function(pkgName) {
    map['@angular/'+pkgName] = 'https://unpkg.com/@angular/' + pkgName + ngVer;
  });

  // Add package entries for angular packages with special versions
  ngPackageNames = ngPackageNames.concat(['forms', 'router']);
  
  // Add map entries for each angular testing module
  ngTestingPackageNames.forEach(function(pkgName) {
    map['@angular/'+pkgName+'/testing'] = 'https://unpkg.com/@angular'+ '/' + pkgName + ngVer  + /bundles/ + pkgName + '-testing.umd.js';
  });
  
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }

  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }

  // Most environments should use UMD; some (e.g. Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;

  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
        
  var config = {
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'ts',
    typescriptOptions: {
      tsconfig: true
    },
    meta: {
      'typescript': {
        "exports": 'ts'
      }
    },
    map: map,
    packages: packages
  };

  System.config(config);

})(this);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/