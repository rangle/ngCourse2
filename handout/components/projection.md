# Projection

Projection is a very important concept in Angular 2. It enables developers to build reusable components and make applications more scalable and maintainable. To illustrate that, suppose we have a `ChildComponent` like:

```js
@Component({
	selector: 'child',
	template: `
      <div>
	    <h4>Child Component</h4>
	    {{ childContent }}
      </div>
	`
})
export class ChildComponent {
  childContent: string = "Default content";
}
```
What should we do if we want to replace `{{ childContent }}` to any HTML that provided to `ChildComponent`? One tempting idea is to define an `@Input` containing the text, but what if you wanted to provide styled HTML, or other components? Trying to handle this with an `@Input` can get messy quickly, and this is where content projection comes in. Components by default support projection, and you can use the `ngContent` directive to place the projected content in your template.

So, change `ChildComponent` to use projection:

```js
import {Component, Input} from '@angular/core';

@Component({
  selector: 'child',
  template: `
    <h4>Child Component</h4>
    <ng-content></ng-content>
  `
})
class ChildComponent {}
```

Then, when we use `ChildComponent` in the template:
```html
<child>
  <p>My projected content.</p>
</child>
```
This is telling Angular, that for any markup that appears between the opening and closing tag of `<child>`, to place inside of `<ng-content></ng-content>`.

When doing this, we can have other components, markup, etc projected here and the `ChildComponent` does not need to know about or care what is being provided.

[View Example](http://plnkr.co/edit/8TD5tXVMOOBNrvYjfhrR?p=preview)


But what if we have multiple `<ng-content></ng-content>` and want to specify the position of the projected content to certain `ng-content`? For example, for the previous `ChildComponent`, if we want to format the projected content into an extra `header` and `footer` section:

```js
import {Component, Input} from '@angular/core';

@Component({
  selector: 'child',
  template: `
    <h4>Child Component</h4>
    <ng-content select="header"></ng-content>
    <ng-content></ng-content>
    <ng-content select="footer"></ng-content>
  `
})
class ChildComponent {}
```

Then in the template, we can use directives, say, `<header>` to specify the position of projected content to the `ng-content` with `select="header"`:
```HTML
<div>
  <child>
    <header>Header Content</header>
    Main Content
    <footer>Footer Content</footer>
  </child>
</div>
```
Besides using directives, developers can also select a `ng-content` through css class:
```ts
 <ng-content select=".class-select"></ng-content>
```
```HTML
<div class="class-select">
  div with .class-select
</div>
```
[View Example](http://plnkr.co/edit/SEPQUS4MqWCftbwjBBi8?p=preview)
