# Projection

Projection is a very important concept in Angular. It enables developers to build reusable components and make applications more scalable and flexible. To illustrate that, suppose we have a `ChildComponent` like:

```typescript
@Component({
    selector: 'rio-child',
    template: `
      <div>
        <h4>Child Component</h4>
        {{ childContent }}
      </div>
    `
})
export class ChildComponent {
  childContent = "Default content";
}
```

What should we do if we want to replace `{{ childContent }}` to any HTML that provided to `ChildComponent`? One tempting idea is to define an `@Input` containing the text, but what if you wanted to provide styled HTML, or other components? Trying to handle this with an `@Input` can get messy quickly, and this is where content projection comes in. Components by default support projection, and you can use the `ngContent` directive to place the projected content in your template.

So, change `ChildComponent` to use projection:

`app/child/child.component.ts`

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'rio-child',
  template: `
    <div style="border: 1px solid blue; padding: 1rem;">
      <h4>Child Component</h4>
      <ng-content></ng-content>
    </div>
  `
})
export class ChildComponent {
}
```

Then, when we use `ChildComponent` in the template:

`app/app.component.html`

```markup
...
  <rio-child>
    <p>My <i>projected</i> content.</p>
  </rio-child>
...
```

This is telling Angular, that for any markup that appears between the opening and closing tag of `<rio-child>`, to place inside of `<ng-content></ng-content>`.

When doing this, we can have other components, markup, etc projected here and the `ChildComponent` does not need to know about or care what is being provided.

[View Example](http://plnkr.co/edit/QAQ6BFuwuzEDVvqAmN9L?p=preview)

But what if we have multiple `<ng-content></ng-content>` and want to specify the position of the projected content to certain `ng-content`? For example, for the previous `ChildComponent`, if we want to format the projected content into an extra `header` and `footer` section:

`app/child-select.component.html`

```markup
<div style="...">
  <h4>Child Component with Select</h4>
  <div style="...">
    <ng-content select="header"></ng-content>
  </div>
  <div style="...">
    <ng-content select="section"></ng-content>
  </div>
  <div style="...">
    <ng-content select=".class-select"></ng-content>
  </div>
  <div style="...">
    <ng-content select="footer"></ng-content>
  </div>
</div>
```

Then in the template, we can use directives, say, `<header>` to specify the position of projected content to the `ng-content` with `select="header"`:

`app/app.component.html`

```markup
...
<rio-child-select>
  <section>Section Content</section>
  <div class="class-select">
    div with .class-select
  </div>
  <footer>Footer Content</footer>
  <header>Header Content</header>
</rio-child-select>
...
```

Besides using directives, developers can also select a `ng-content` through css class:

```markup
<ng-content select=".class-select"></ng-content>
```

`app/app.component.html`

```markup
<div class="class-select">
  div with .class-select
</div>
```

[View Example](http://plnkr.co/edit/rH2vGgFluLXHCsgfkNjF?p=preview)

