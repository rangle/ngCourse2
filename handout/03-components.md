# Part 3: Components in Angular 2 #

The core concept of any Angular 2 application is the 'component'. In effect, the whole application can be modelled as a tree of these components.

This is how the Angular 2 team defines a component:

> A Component controls a patch of screen real estate that we could call a view, and declares reusable UI building blocks for an application.

Basically, a component is anything that is visible to the end user and which can be reused many times within an application.

For our application, we will create different components and organize them as shown below:

TodoApp
  - TodoList
    - TodoItem
  - TodoForm

At the top we have todo app which consists of TODO List and TODO Form and then we have TODO Item inside TODO List. Each of these are visible to the user and they can interact with these components and perform actions.

## Creating Components ##

Creating components in Angular 2 is easy to create a basic component we just need to define a selector and template for the component. Selector is the element property that we can define in our html to render the component and template is just the raw html we want to replace when rendering the component. Example of the raw component is 

``` javascript
import {Component} from 'angular2/core';

@Component({
	selector: 'hello',
	template: '<p>Hello {{name}}</p>'
})
export class Hello {
  name: string;
  constructor() {
    this.name = 'World';
  }
}
```
To make use of the component in the html we just use the component as `<hello></hello>` and it will get rendered as `Hello World`

[View Example](http://plnkr.co/edit/EGgaHWpGHFl1CDHBQtZl?p=preview)



## Component Lifecycle ##

A Component has Lifecycle managed by Angular. Angular manages creation, rendering, data-bound properties etc. Angular also offers Lifecycle hooks that gives the visibility into key events and ability to interact with them when they occur. Below is the list of all lifecycle hooks that are there in angular, only those which makes sense for components are implemented in them. 

* ngOnChanges - called when an input or output binding value changes
* ngOnInit - after the first ngOnChanges
* ngDoCheck - developer's custom change detection
* ngAfterContentInit - after component content initialized
* ngAfterContentChecked - after every check of component content
* ngAfterViewInit - after component's view(s) are initialized
* ngAfterViewChecked - after every check of a component's view(s)
* ngOnDestroy - just before the directive is destroyed.


## Component Details ##

Events in Angular 2 works in similar way as they used to work in Angular one only thing that is changed is the syntax. Below is the example of the new event syntax:-

```javascript
import {Component} from 'angular2/core';

@Component({
	selector: 'counter',
	template: '<div><p>Count: {{num}}</p><button (click)="increement()">Increement</button></div>'
})
export class Counter {
  num: number = 0;
  
  increement() {
    this.num++;
  }
}
```
[View Example](http://plnkr.co/edit/J6KfELwnKrc29HFTaO7T?p=preview)

Components depend on each other and small components like `TodoItem` are nested inside the large components such as `TodoList`. To let outer components know about the dependent components we use the directive property of the component. In `TodoApp` we have our app dependent on `TodoItem` and `TodoList` so we define directives inside the App component as shown below:-

```javascript
directives: [TodoInput, TodoList]
```

It can be defined inside both Component or View annotation. If we are using View annotation it should be defined inside the View else inside Component annotation. 

Some of the properties inside the Component class and usage are defined below.

* selector: Item selector to be used when declaring component inside HTML. It's a required property for any component to be defined
* templateUrl: URL of the template if implemented in external HTML file
* template: Template for the component containing HTML, if not using external file
* styleUrls: Array containing list of file URL if you are using external CSS 
* styles: Array of style declarations if declaring Styles within the component
* directives: List of dependent components or directives for the component
* pipes: List of dependent pipes for the component
* encapsulation(ViewEncapsulation): It defines whether the styles defined within the component can affect the whole application and vice verse. It can have 3 different values:- 
 * Emulated (default): Styles from main html propagate to child components
 * Native: Styles from main html do not propagate to child components
 * None: Styles from child component propagate back to main html
 
 ```javascript
@Component({
	selector: 'hello',
	template: '<p class="hello">Hello {{name}}</p>',
	encapsulation: ViewEncapsulation.None,
	styles: [`
    .hello {
      color:yellow;
      background-color:red;
      border: 1px solid black;
      padding: 5px;
    }	  
	`]
})
export class Hello {
    name: string;
    constructor() {
      this.name = 'World';
    }
}
 ```
 [View Example](http://plnkr.co/edit/wyNdyoeOTxS4XX1iSNDR?p=preview)

* inputs: Annotation telling the component about the input parameters expected for the parent
[View Example](http://plnkr.co/edit/VtfExfr2b6YQOcBocC2I?p=preview)
  
* outputs: Array containing the list of output parameters a component exposes to the parent
[View Example](http://plnkr.co/edit/dxUoiNdfVLdJLnyJIxuU?p=preview)




