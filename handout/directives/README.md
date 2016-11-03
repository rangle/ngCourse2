# Directives

A Directive modifies the DOM to change apperance, behavior or layout of DOM elements. Directives are one of the core building blocks Angular 2 uses to build applications. In fact, Angular 2 components are in large part directives with templates.

From an Angular 1 perspective, Angular 2 components have assumed a lot of the roles directives used to. The majority of issues that involve templates and dependency injection rules will be done through components, and issues that involve modifying generic behaviour is done through directives.

There are three main types of directives in Angular 2:

* Component - directive with a template.
* _Attribute directives_ - directives that change the behavior of a component or element but don't affect the template
* _Structural directives_ - directives that change the behavior of a component or element by affecting how the template is rendered
