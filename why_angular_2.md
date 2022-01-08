# Why Angular?

With many front-end JavaScript frameworks to choose from, it's natural to wonder what makes Angular stand apart from the rest. Coming from a history of wide community adoption and engagement with AngularJS, Angular improved on the foundations to make the framework faster, more scalable, and more modern.

Organizations that found value in AngularJS will find more value in Angular. It is increasingly common to see sentiment in the enterprise space that Angular provides the sort of 'out of box' functionality and opinionated tools that allow for large teams to work cohesively and consistently.

## Angular's Advantages

The first release of AngularJS provided programmers with the tools to develop and architect large-scale JavaScript applications, but age has revealed some flaws and sharp edges. Angular was built on top of the five years of community feedback from the AngularJS days.

Angular has matured into a system focused on providing tools that scale, with a robust community and many common problems solved with tutorials, blog posts, and videos galore to help you tackle challenges of all shapes and sizes.

### Easy to Learn, Difficult to Master

One of Angular's biggest advantages is how its structure supports learning and understanding. Developers new to the framework can tackle independent aspects of the framework, build an understanding, and expand their understanding to the next concept when they're ready. Teams that keep their code structure and guidelines close to the [Angular Styleguide](https://angular.io/guide/styleguide) will see that new developers can more quickly spin up and work on complex engineering problems using this base documentation to accelerate their understanding of your codebase.

It can't be understated that many other frameworks require you to shift mental models first before being able to dive in. With Angular's structure, the code is broken down to provide a separation of concerns ensuring that code is broken apart sensibly. Teams will need to maintain this separation of concerns as their project expands, but many other frameworks don't help teams organize their projects to this degree from the get-go.

Automation and generation have also been leveraged to quickly spin up new files and simplify the bootstrapping work needed to create new features. As we'll see in later chapters, Schematics in the Angular CLI also go a long way to help newbies feel comfortable creating new components, services, and features.

While there are many aspects of Angular that provide an accessible entry for new developers, understanding the intricacies of bundling files, dependency injection, and many other concepts remains challenging and will take time for teams to learn. Angular helps to isolate these problems allowing for focused review and incrementally improving the effort required to globally refactor challenging problems.

### Well Leveraged TypeScript

Angular 2+ was written in TypeScript, a typed superset of JavaScript that implements many modern EcmaScript features. Programmers using sophisticated text editors \(or IDEs\) will notice dramatic improvements with auto-completion and type suggestions. These improvements help to reduce the cognitive burden of learning Angular.

Teams fully leaning into a strict type style will see Angular optimize performance and reduce file sizes. By focusing on making the framework easier for computers to process, Angular can deliver an improved application in their ecosystem.

> For traditional ES5 JavaScript programmers this does _not_ mean that development must be done in TypeScript or ES2015: programmers can still write vanilla JavaScript that runs without transpilation.

### Structured Releases

While there have been some difficult Angular releases over the years, the Angular team prioritizes stability as a core tenant of the framework's development. Teams following a structured approach to development that follows the Angular Styleguide will experience more seamless releases that often result in performance improvements. Teams maintaining a tight pace with the release process can see many improvements not only to their core application but also to the tools and libraries that keep pace with the latest and greatest version of Angular.

Libraries like [Nx](https://nx.dev/) take this a step further to even develop tooling on top of the framework for monorepos and build-caching. Angular's structured releases ensure that a community can foster impressive tooling and more-easily keep pace than with many other frameworks.

### Performance Across Platforms

Angular was designed for mobile from the ground up. Aside from limited processing power, mobile devices have other features and limitations that separate them from traditional computers. Touch interfaces, limited screen real estate, and mobile hardware have all been considered in Angular.

Desktop computers will also see dramatic improvements in performance and responsiveness.

Angular, like React and other modern frameworks, can leverage performance gains by rendering HTML on the server or even in a web worker. Depending on application/site design this isomorphic rendering can make a user's experience _feel_ even more instantaneous.

The quest for performance does not end with pre-rendering. Angular makes itself portable to native mobile by integrating with [NativeScript](https://www.nativescript.org/), an open-source library that bridges JavaScript and mobile. The [Ionic](https://ionicframework.com/) team also provides _another_ way to leverage native device features with Angular.

### Familiarity

Despite being a complete rewrite, Angular has retained many of its core concepts and conventions with AngularJS, e.g. a streamlined, "native JS" implementation of dependency injection. This means that programmers who are already proficient with AngularJS will have an easier time migrating to Angular than another library like React or framework like Ember.

### Project Architecture and Maintenance

The first iteration of AngularJS provided web programmers with a highly flexible framework for developing applications. This was a dramatic shift for many web programmers, and while that framework was helpful, it became evident that it was often too flexible. Over time, best practices evolved, and a community-driven structure was endorsed.

AngularJS tried to work around various browser limitations related to JavaScript. This was done by introducing a module system that made use of dependency injection. This system was novel, but unfortunately had issues with tooling, notably minification and static analysis.

Angular 2+ makes use of the ES2015 module system, and modern packaging tools like webpack or SystemJS. Modules are far less coupled to the "Angular way", and it's easier to write more generic JavaScript and plug it into Angular. The removal of minification workarounds and the addition of rigid prescriptions make maintaining existing applications simpler. The new module system also makes it easier to develop effective tooling that can reason better about larger projects.

## Differences Between AngularJS & Angular 2+

> Note that "Transitional Architecture" refers to a style of Angular.js application written in a way that mimics Angular's component style, but with controllers and directives instead of TypeScript classes.

|                                       | Old School AngularJS | AngularJS Best Practices | **Transitional Architecture** | Angular              |
| :------------------------------------ | :------------------- | :----------------------- | :---------------------------- | :------------------- |
| Nested scopes \("$scope", watches\)   | Used heavily         | Avoided                  | **Avoided**                   | Gone                 |
| Directives vs controllers             | Use as alternatives  | Used together            | **Directives as components**  | Component directives |
| Controller and service implementation | Functions            | Functions                | **ES6 classes**               | ES6 classes          |
| Module system                         | Angular's modules    | Angular's modules        | **ES6 modules**               | ES6 modules          |
| Transpiler required                   | No                   | No                       | **TypeScript**                | TypeScript           |
