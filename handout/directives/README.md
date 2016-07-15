# Directives

Directives are entities that change the behavior of components or elements and are one of the core building blocks Angular 2 uses to build applications. In fact, Angular 2 components are in large part directives with templates. This is why components are passed in as children through the directives property.

From an Angular 1 perspective, Angular 2 components have assumed a lot of the roles directives used to. The majority of issues that involve templates and dependency injection rules will be done through components, and issues that involve modifying generic behaviour is done through directives.

There are two main types of directives in Angular 2:
* _Attribute directives_ - directives that change the behavior of a component or element but don't affect the template
* _Structural directives_ - directives that change the behavior of a component or element by affecting how the template is rendered