<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Part 0: Introduction to Angular2 and ngCourse2](#part-0-introduction-to-angular2-and-ngcourse2)
  - [Angular 2's Advantages](#angular-2s-advantages)
    - [Angular 2 is Easier](#angular-2-is-easier)
    - [Performance, and Mobile](#performance-and-mobile)
    - [Project Architecture, and Maintenance](#project-architecture-and-maintenance)
    - [Features](#features)
  - [Differences between Angular Versions](#differences-between-angular-versions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Part 0: Introduction to Angular2 and ngCourse2 #

AngularJS is the leading open source JavaScript application framework backed by Google. The "1.x" version of AngularJS has been used quite widely. The new "Angular 2" version of the framework is currently available in beta. This course ("ngCourse2") provides an introduction to AngularJS using "Angular 2" based on our experience at rangle.io.

## Angular 2's Advantages
 
When Angular was first released, it provided developers with the tools  to develop, and architect large scale JavaScript applications; its age has revealed a number of flaws, and sharp edges. Angular 2 has been designed to build on the last five years of community feedback.

### Angular 2 is Easier

Years of feedback have made Angular 2 more modern, more capable, and  easier for new developers to learn than Angular 1.x. In turn Angular 2 is also easier for project veterans to work with. Ultimately this makes for a codebase that's all around easier for everyone to deal with.

With Angular 1, developers had to keep in mind and understand the differences between Controllers, Services, Factories, Providers and other concepts that could be confusing, especially for new developers. Angular 2 features a more streamlined framework that allows developers to focus on simply building JavaScript classes.

In Angular 2, directives, and controllers are gone, and replaced with components; which are like a refined version of directives. Even experienced Angular developers are not always aware of all the capabilities of Angular 1.x directives.. Angular 2 components are considerably easier to read, and their API features less jargon than Angular 1.x's directives. Additionally to help ease the transition to Angular 2, the Angular team has added a `.component` [method][componentMethod] to Angular 1.5.

One of Angular 2's points of interests is that it was written in TypeScript, a superset of JavaScript, that implements many up, and coming ES2015 features.

By focusing on making their framework easier for computers to process, Angular 2 allows for a much richer development ecosystem. Developers using sophisticated text editors, or IDE's will notice dramatic improvements with auto-completion. These improvements in tooling can help reduce the cognitive burden of learning Angular 2. Fortunately for traditional ES5 JavaScript developers this does *not* mean that development must be done in TypeScript or ES2015. Developers are still able to write vanilla JavaScript that runs without transpilation.

Despite being a complete rewrite, Angular 2 still shares many of the same core concepts, and conventions as Angular 1.x; like a streamlined, and "native JS" implementation of dependency injection. This means that developers who are already proficient with Angular will have an easier time migrating to Angular 2, than another Framework, like React, or Ember.

### Performance, and Mobile

Mobile use of the web is huge, and growing. Mobile devices keep getting more powerful, but they're still quite underpowered when compared to a modern desktop; mobiles typically have less data bandwidth to work with.

Angular 2 was designed for mobile from the ground up. Aside from limited processing power, mobile devices have other features, and limitations that separate them from traditional computers. Touch interfaces, limited screen real estate, and mobile hardware have all been considered in Angular 2.

The nature of computing performance means that desktops will also see "dramatic" improvements in performance, and responsiveness. Early benchmarks [performed on Angular 2 alpha][a2performance] confirm that "dramatic" is an accurate choice of word. The author makes the wise disclaimer that benchmarks are tricky to get right, and even when done correctly can be misleading. Nevertheless Angular 2 *alpha*'s rendering performance vs Angular 1.4's is astounding at scale.

Angular 2, like React, and other modern frameworks can leverage performance gains by [rendering HTML on the server][a2server], or even in a  web worker. Depending on application/site design this isomorphic rendering can make a user's experience *feel* even more instantaneous.

The quest for performance does not end with pre-rendering. Angular 2 makes itself portable to native mobile by [integrating with NativeScript][a2native1], an open source library that bridges  JavaScript, and mobile. Additionally, the Ionic team is [working on][a2native2]  an Angular 2 version of their system, which will provide *another* way to leverage native device features with Angular 2.

### Project Architecture, and Maintenance

The first iteration of Angular provided web developers with a highly flexible framework for developing applications. This was a dramatic shift for many web developers, and while framework was helpful, it became evident that it was often too flexible. Over time, best practices evolved, and a community [community driven structure was endorsed][a1style].

Angular 1.x tried to work around various browser limitations related to JavaScript. This was done by introducing a module system that made use of dependency injection. This system was novel, but unfortunately had issues with tooling, notably minification, and static analysis. Angular 2.x makes use of the upcoming EcmaScript 6 module system, and modern packaging tools like Webpack, or SystemJS.

With Angular 2, modules are far less coupled to the "Angular way", and it's easier to write more generic JavaScript, and plug it into Angular. The removal of minification workarounds, and rigid prescriptions make maintaining existing applications simpler. The new module system also makes it easier to develop effective tooling that can better reason about larger projects.

### Features ###

Some of the other interesting features in Angular 2 are :-
* Form Builder
* Change Detection
* Dependency Injection
* Templating
* Routing
* Annotations
* Observables 
* Shadow DOM

## Differences between Angular Versions ##

| Old School Angular 1.x | Angular 1.x Best Practices | **Angular Next**             | Angular 2
--------------------------------------|------------------------| ---------------------------|------------------------------|----------------------
Nested scopes ("$scope", watches)     | Used heavily           | Avoided                    | **Avoided**                  | Gone 
Directives vs controllers             | Use as alternatives    | Used together              | **Directives as components** | Component directives
Controller and service implementation | Functions              | Functions                  | **ES6 classes**              | ES6 classes
Module system                         | Angular's modules      | Angular's modules          | **ES6 modules**              | ES6 modules
Requires a transpiler                 | No                     | No                         | **TypeScript**               | TypeScript
