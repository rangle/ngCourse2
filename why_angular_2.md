# Why Angular?

With many front-end JavaScript frameworks to choose from, it's natural to wonder what makes Angular stand apart. Angular provides an excellent method for creating web applications, giving structure and types that help developers learn and build with the framework. Enterprise developers find that Angular provides out-of-the-box functionality and tools that allow large teams to organize their work to deliver great web experiences.

With widespread praise for AngularJS, Angular builds upon that foundation to make the framework faster, more scalable, and modern. Organizations that found value in AngularJS will find more value in Angular.

## Angular's Advantages

AngularJS provided programmers with the tools to develop and architect large-scale JavaScript applications. As it approached later versions, age revealed some flaws and sharp edges. A rewrite brought five years of community feedback into the library and produced the Angular framework that we use today.

Angular has matured to provide tools that scale and sports an active developer community. The community has provided tutorials, blog posts, and videos that solve many common problems.

### Easy to Learn

One of Angular's most notable advantages is its structure that supports learning and understanding. New developers learn Angular by solving problems and understanding the small set of core framework features. When they're ready to learn more advanced features, they can quickly build upon that knowledge and gradually learn more of the framework.

The [Angular Styleguide](https://angular.io/guide/styleguide) provides a structured and organized approach to building Angular apps that helps teams maintain this learning path. New developers are less likely to be confused when looking through a codebase. They will quickly learn how to contribute to complex features. The Styleguide is a crucial element to your team's documentation.

Angular's code automation and generation simplify the bootstrapping work needed to create new features. Schematics in the Angular CLI also go a long way to help newcomers feel comfortable making new components, services, and features.

### TypeScript

Angular was written in TypeScript, a typed superset of JavaScript that implements many modern EcmaScript features. Programmers using sophisticated text editors \(or IDEs\) will notice dramatic improvements with auto-completion and type suggestions. These improvements help to reduce the cognitive burden of learning Angular.

> For traditional ES5 JavaScript programmers this does _not_ mean that development must be done in TypeScript or ES2015: programmers can still write vanilla JavaScript that runs without transpilation.

### Structured Releases

While there have been some tricky Angular releases over the years, the Angular team prioritizes stability as a core tenant of the framework's development. Teams following the Angular Styleguide and staying up-to-date with the latest version will experience seamless releases that often result in performance improvements. Many tools and libraries also keep pace with the latest and greatest version of Angular, which adds to the benefits received from staying up-to-date.

Libraries like [Nx](https://nx.dev/) go a step further to develop tooling on top of the framework for monorepos, build-caching, and automation. Angular's structured releases help the community build impressive tooling that can be maintained and updated as the framework changes.

### Performance Across Platforms

Angular was designed for mobile from the ground up. Aside from limited processing power, mobile devices have other features and limitations separate from traditional computers. Touch interfaces, little screen real estate, and mobile hardware have all been considered in Angular.

Desktop computers will also see dramatic improvements in performance and responsiveness.

Like React and other modern frameworks, Angular can leverage performance gains by rendering HTML on the server or even in a web worker. Depending on application/site design, this isomorphic rendering can make a user's experience _feel_ even more instantaneous.

The quest for performance does not end with pre-rendering. Angular makes itself portable to native mobile by integrating with [NativeScript](https://www.nativescript.org/), an open-source library that bridges JavaScript and mobile. The [Ionic](https://ionicframework.com/) team also provides _another_ way to leverage native device features with Angular.

### Familiarity

Despite being a complete rewrite, Angular has retained many of its core concepts and conventions with AngularJS, e.g. a streamlined, "native JS" implementation of dependency injection. Programmers who are already proficient with AngularJS will have an easier time migrating to Angular than another library like React or a framework like Svelte.

### Project Architecture and Maintenance

The first iteration of AngularJS provided web programmers with a highly flexible framework for developing applications. While that framework was helpful, it became evident that it was often too relaxed. As best practices evolved, the community developed a structure that became overwhelmingly endorsed.

AngularJS tried to work around various browser limitations related to JavaScript. The framework did this by introducing a module system that used dependency injection. This system was novel but unfortunately had issues with tooling, notably minification and static analysis.

Angular uses the ES2015 module system and modern packaging tools like WebPack or SystemJS. Modules aren't coupled to the "Angular way," and it's easier to write more generic JavaScript and plug it into Angular. The removal of workarounds and more rigid standards make maintaining existing applications simpler. The new module system also makes it easier to develop effective tooling to support larger projects.

## Differences Between AngularJS & Angular 2+

> Note that "Transitional Architecture" refers to a style of Angular.js application written in a way that mimics Angular's component style, but with controllers and directives instead of TypeScript classes.

|                                       | Old School AngularJS | AngularJS Best Practices | **Transitional Architecture** | Angular              |
| :------------------------------------ | :------------------- | :----------------------- | :---------------------------- | :------------------- |
| Nested scopes \("$scope", watches\)   | Used heavily         | Avoided                  | **Avoided**                   | Gone                 |
| Directives vs controllers             | Use as alternatives  | Used together            | **Directives as components**  | Component directives |
| Controller and service implementation | Functions            | Functions                | **ES6 classes**               | ES6 classes          |
| Module system                         | Angular's modules    | Angular's modules        | **ES6 modules**               | ES6 modules          |
| Transpiler required                   | No                   | No                       | **TypeScript**                | TypeScript           |
