# Creating Components

The CLI can scaffold Angular 2 components through the `generate` command. To create a new component run:

`ng generate component [component-name]`

Executing the command creates a folder ,[component-name], in the project's *src/app* path or the current path the command is executed in if it's a child folder of the project. The folder has the following:

- *[component-name].component.ts* the component class file
- *[component-name].component.css* for styling the component
- *[component-name].component.html* component html
- *[component-name].component.spec.ts* tests for the component
- *index.ts* which exports the component
