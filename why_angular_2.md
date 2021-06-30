# Why Angular?

There are many front-end JavaScript frameworks to choose from today, each with its own set of trade-offs. Many people were happy with the functionality that AngularJS afforded them. Angular improved on that functionality and made it faster, more scalable and more modern. Organizations that found value in AngularJS will find more value in Angular. It is increasingly common to see a sentiment in the enterprise space that Angular provides the sort of 'out of box' functionality and opinionated tools that allow for large teams to work in a cohesive and consistent way.

## Angular's Advantages

The first release of AngularJS provided programmers with the tools to develop and architect large scale JavaScript applications, but its age has revealed a number of flaws and sharp edges. Angular was built on five years of community feedback.

Now, after the many years of Angular 2+ released, it has matured into a system focused on providing tools that scale, with a robust community and many common problems solved with tutorials, blog posts, and videos galore to help you tackle challenges of all shapes and sizes.

### Angular Is Easier

The new Angular codebase is more modern, more capable and easier for new programmers to learn than AngularJS, while also being easier for project veterans to work with.

Compared to other popular web frameworks, Angular is 

### TypeScript

Angular 2+ was written in TypeScript, a superset of JavaScript that implements many new ES2016+ features, and was since its inception. 

By focusing on making the framework easier for computers to process, Angular allows for a much richer development ecosystem. Programmers using sophisticated text editors \(or IDEs\) will notice dramatic improvements with auto-completion and type suggestions. These improvements help to reduce the cognitive burden of learning Angular. Fortunately for traditional ES5 JavaScript programmers this does _not_ mean that development must be done in TypeScript or ES2015: programmers can still write vanilla JavaScript that runs without transpilation.

### Familiarity

Despite being a complete rewrite, Angular has retained many of its core concepts and conventions with AngularJS, e.g. a streamlined, "native JS" implementation of dependency injection. This means that programmers who are already proficient with Angular will have an easier time migrating to Angular than another library like React or framework like Ember.

### Performance and Mobile

Angular was designed for mobile from the ground up. Aside from limited processing power, mobile devices have other features and limitations that separate them from traditional computers. Touch interfaces, limited screen real estate and mobile hardware have all been considered in Angular.

Desktop computers will also see dramatic improvements in performance and responsiveness.

Angular, like React and other modern frameworks, can leverage performance gains by rendering HTML on the server or even in a web worker. Depending on application/site design this isomorphic rendering can make a user's experience _feel_ even more instantaneous.

The quest for performance does not end with pre-rendering. Angular makes itself portable to native mobile by integrating with [NativeScript](https://www.nativescript.org/), an open source library that bridges JavaScript and mobile. Additionally, the Ionic team is working on an Angular version of their product, providing _another_ way to leverage native device features with Angular.

### Project Architecture and Maintenance

The first iteration of AngularJS provided web programmers with a highly flexible framework for developing applications. This was a dramatic shift for many web programmers, and while that framework was helpful, it became evident that it was often too flexible. Over time, best practices evolved, and a community-driven structure was endorsed.

AngularJS tried to work around various browser limitations related to JavaScript. This was done by introducing a module system that made use of dependency injection. This system was novel, but unfortunately had issues with tooling, notably minification and static analysis.

Angular 2+ makes use of the ES2015 module system, and modern packaging tools like webpack or SystemJS. Modules are far less coupled to the "Angular way", and it's easier to write more generic JavaScript and plug it into Angular. The removal of minification workarounds and the addition of rigid prescriptions make maintaining existing applications simpler. The new module system also makes it easier to develop effective tooling that can reason better about larger projects.

## Differences Between AngularJS & Angular 2+

> Note that "Transitional Architecture" refers to a style of Angular 1 application written in a way that mimics Angular's component style, but with controllers and directives instead of TypeScript classes.

| Old School AngularJS                  | AngularJS Best Practices | **Transitional Architecture** | Angular                      |                      |
| :------------------------------------ | :----------------------- | :---------------------------- | :--------------------------- | :------------------- |
| Nested scopes \("$scope", watches\)   | Used heavily             | Avoided                       | **Avoided**                  | Gone                 |
| Directives vs controllers             | Use as alternatives      | Used together                 | **Directives as components** | Component directives |
| Controller and service implementation | Functions                | Functions                     | **ES6 classes**              | ES6 classes          |
| Module system                         | Angular's modules        | Angular's modules             | **ES6 modules**              | ES6 modules          |
| Transpiler required                   | No                       | No                            | **TypeScript**               | TypeScript           |
