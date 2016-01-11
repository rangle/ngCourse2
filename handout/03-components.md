## Part 3: Angular 2’s component model and how to think differently about your application architecture ##

The core part of our Angular 2 application are the components, whole application is just the combination components linked together. Even the App itself is the component in Angular 2. Now the question is What are the components ? As angular team defines it 
"A Component controls a patch of screen real estate that we could call a view and Declare reusable UI building blocks for an application" 
Basically it states component is anything that is visible to the end user and they can interact with it which can be used again and again within application. For eg. in Todo Application we will create different components as shown below.

TODO App
  - TODO List
    - TODO Item
  - TODO Form

At the top we have todo app which consists of TODO List and TODO Form and then we have TODO Item inside TODO List. Each of these are visible to the user and they can interact with these components and perform actions.

** Creating Components **

Creating components in Angular 2 is easy to create a basic component we just need to define a selector and template for the component. Selector is the element property that we can define in our html to render the component and template is just the raw html we want to replace when rendering the component. Example of the raw component is 

``` javascript
@Component({
  selector: 'hello', 
  template: 'Hello {{name}}!'
})
class Hello {
  name: string
  constructor() {
    this.name = 'World';
  }   
}
```

To make use of the component in the html we just use the component as <hello></hello> and it will get rendered as “Hello World”

** Component Lifecycle **

A Component has Lifecycle managed by Angular. Angular manages creation, rendering, data-bound properties etc. Angular also offers Lifecycle hooks that gives the visibility into key events and ability to interact with them when they occur. Below is the list of all lifecycle hooks that are there in angular, only those which makes sense for components are implemented in them. 

ngOnChanges - called when an input or output binding value changes
ngOnInit - after the first ngOnChanges
ngDoCheck - developer's custom change detection
ngAfterContentInit - after component content initialized
ngAfterContentChecked - after every check of component content
ngAfterViewInit - after component's view(s) are initialized
ngAfterViewChecked - after every check of a component's view(s)
ngOnDestroy - just before the directive is destroyed.



** Component Details **

Events in Angular 2 works in similar way as they used to work in Angular one only thing that is changed is the syntax. Below is the example of the new event syntax:-

``` javascript
@Component({
  selector: 'counter',
  template: `<button on-click="count()">Count</button>`
})
class Counter {
  num: number = 0;
  count() {
    this.num++;
    console.log(this.num);
  }
}
```

Components depend on each other and small components like TODO Item are nested inside the large components such as TODO List. To let outer components know about the dependent components we use the directive property of the component. In TODO App we have our app dependent on TODO Item and List so we define directives inside the App component as shown below:-

``` javascript
directives: [TodoInput, TodoList]
```

It can be defined inside both Component or View annotation. If we are using View annotation it should be defined inside the View else inside Component annotation. 

Some of the properties inside the Component class and usage are defined below.

selector: string => Item selector to be used when declaring component inside html
inputs?: string[] => 
outputs?: string[] =>
properties?: string[] =>
events?: string[] =>
host?: {[key: string]: string} =>
providers?: any[] =>
exportAs?: string =>
moduleId?: string => The module id of the module that contains the component
viewProviders?: any[] => Defines the set of injectable objects that are visible to its view DOM children.

Simple Example

Here is an example of a class that can be injected:

``` javascript
class Greeter {
   greet(name:string) {
     return 'Hello ' + name + '!';
   }
}
@Directive({
  selector: 'needs-greeter'
})
class NeedsGreeter {
  greeter:Greeter;
  constructor(greeter:Greeter) {
    this.greeter = greeter;
  }
}
@Component({
  selector: 'greet',
  viewProviders: [
    Greeter
  ],
  template: `<needs-greeter></needs-greeter>`,
  directives: [NeedsGreeter]
})
class HelloWorld {
}
```

queries?: {[key: string]: any} =>
changeDetection?: ChangeDetectionStrategy => Defines the used change detection strategy. When a component is instantiated, Angular creates a change detector, which is responsible for propagating the component's bindings. The changeDetection property defines, whether the change detection will be checked every time or only when the component tells it to do so.

templateUrl?: string => Url of the template if using external
template?: string => Template to be defined if not using external
styleUrls?: string[] => 
styles?: string[] =>
directives?: Array<Type | any[]> => List of dependent components or directives for the component
pipes?: Array<Type | any[]> => List of dependent pipes or filters for the component
encapsulation?: ViewEncapsulation => It defines whether the styles defined within the component can affect the whole application and vice versa. It can have 3 different values Emulated(default ): Styles from main html propagate to child components
Native: Styles from main html do not propagate to child components
None: Styles from child component propagate back to main html