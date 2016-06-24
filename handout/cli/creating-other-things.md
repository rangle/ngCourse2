# Creating Other Things

The CLI can scaffold other Angular 2 entities such as services, pipes and directives using the generate command.

`ng generate [entity] [entity-name]`

This creates the entity at `src/app/[entity-name].[entity].ts` along with a spec file, or at the current path if the command is executed in a child folder of the project. The CLI provides blueprints for the following entities out of the box:

Item       | Command                 | Files generated
---        | ---                     | --- 
Component: | `ng g component [name]` | component, HTML, CSS, test spec files
Directive: | `ng g directive [name]` | component, test spec files
Pipe:      | `ng g pipe [name]`      | component, test spec files
Service:   | `ng g service [name]`   | component, test spec files
Class:     | `ng g class [name]`     | component, test spec files 
Route:     | `ng g route [name]`     | component, HTML, CSS, test spec files (in new folder)
