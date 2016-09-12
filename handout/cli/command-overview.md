# CLI Command Overview

One of the advantages of using the Angular CLI is that it automatically configures a number of useful tools that you can use right away. To get more details on the options for each task, use `ng --help`.

## Linting

`ng lint` lints the code in your project using [tslint](https://palantir.github.io/tslint/). You can customize the rules for your project by editing `tslint.json`.

> You can switch some of these to use your preferred tool by editing the scripts in `package.json`.

## Testing

`ng test` triggers a build and then runs the unit tests set up for your app using [Karma](http://karma-runner.github.io/).  Use the `--watch` option to rebuild and retest the app automatically whenever source files change.

## Build
`ng build` will build your app (and minify your code) and place it into the default output path, `dist/`.

## Serve
`ng serve` builds and serves your app on a local server and will automatically rebuild on file changes. By default, your app will be served on [http://localhost:4200/](http://localhost:4200/).

> Include `--port [number]` to serve your app on a different HTTP port.

### E2E
Once your app is served, you can run end-to-end tests using `ng e2e`. The CLI uses [Protractor](https://angular.github.io/protractor/) for these tests.

## Deploy
`ng deploy` deploys to GitHub pages or Firebase.
