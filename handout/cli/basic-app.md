# Basic App

To get started, use the `ng command` to set up a new project. 

`ng new [your-project-name]`

The command may take a few minutes to complete as various packages are installed. Once complete, you will find a basic app created in a new directory with the toolchain ready for use. The directory is automatically set up as a new git repository as well.

Alternatively, you can use `ng-init` to create a new angular-cli project in the current folder.

Once the task is complete, you can serve the app and open it in your browser to see it running:
`cd project-name`
`ng serve` 

Navigate to [http://localhost:4200/](http://localhost:4200/)

The app will reload automatically as you make changes.

For example:
`ng new Rio-TodoApp` 
`cd TodoApp`
`ng serve`

[insert screenshot?]

When you open up the project in your favourite editor, you'll see the following files set up automatically for you:

*TodoApp
** config/
** e2e/
** node_modules/
** public/
** src/
** typings/
** .clang-format
** .editorconfig
** .gitignore
** angular-cli-build.js
** angular-cli.json
** package.json
** tslint.json
** typings.json

With these files set up automatically in the src for the app:
* src/
** app/
*** shared/
*** environment.ts
*** index.ts
*** todo-app.component.css
*** todo-app.component.html
*** todo-app.component.spec.ts
*** todo-app.component.s
** index.html
** main.ts
** system-config.ts
** tsconfig.json
** typings.d.ts

At this point you can lint, test, build, serve (as we did above) or deploy the app. 
