# Creating an Attribute Directive

Let's start with a simple button that moves a user to a different page.

```typescript
@Component({
  selector: 'visit-rangle',
  template: `
    <button type="button" (click)="visitRangle()">Visit Rangle</button>
  `
})
export class VisitRangleComponent {
  visitRangle() {
    location.href = 'https://rangle.io';
  }
}
```

[View Example](https://plnkr.co/edit/DqYEKwpfYulw6abPB6Jx?p=preview)

We're polite, so rather than just sending the user to a new page, we're going to ask if they're ok with that first by creating an attribute directive and attaching that to the button.


```typescript
@Directive({
  selector: `[confirm]`
})
export class ConfirmDirective {

  @HostListener('click', ['$event'])
  confirmFirst(event: Event) {
    return window.confirm('Are you sure you want to do this?');
  }

}
```
[View Example](https://plnkr.co/edit/4VyJpBhIrSXBCK87inLU?p=preview)

Directives are created by using the `@Directive` decorator on a class and specifying a selector. For directives, the selector name must be wrapped in square brackets to specify that it is an attribute binding. We're using the `@HostListener` decorator to listen in on events on the component or element it's attached to. In this case we're watching the `click` event and passing in the event details which are given by the special `$event` keyword. Next, we want to attach this directive to the button we created earlier.

```typescript
directives: [ConfirmDirective],
template: `
  <button type="button" (click)="visitRangle()" confirm>Visit Rangle</button>
`
```

[View Example](https://plnkr.co/edit/4VyJpBhIrSXBCK87inLU?p=preview)

Notice, however, that the button doesn't work quite as expected. That's because while we're listening to the click event and showing a confirm dialog, the component's click handler runs before the directive's click handler and there's no communication between the two. To do this we'll need to rewrite our directive to work with the component's click handler.

```typescript
@Directive({
  selector: `[confirm]`
})
export class ConfirmDirective {
  @Input('confirm') onConfirmed: Function = () => {};
  
  @HostListener('click', ['$event'])
  confirmFirst() {
    const confirmed = window.confirm('Are you sure you want to do this?');
    
    if(confirmed) {
      this.onConfirmed();
    }
  }
}
```
[View Example](https://plnkr.co/edit/ST97sVQ6ekufkRLy7u86?p=preview)

Here, we want to specify what action needs to happen after a confirm dialog's been sent out and to do this we create an input binding just like we would on a component. We'll use our directive name for this binding and our component code changes like this:

```typescript
  <button type="button" [confirm]="visitRangle">Visit Rangle</button>
```
[View Example](https://plnkr.co/edit/ST97sVQ6ekufkRLy7u86?p=preview)


Now our button works just as we expected. We might want to be able to customize the message of the confirm dialog however. To do this we'll use another binding.

```typescript
@Directive({
  selector: `[confirm]`
})
export class ConfirmDirective {
  @Input('confirm') onConfirmed: Function = () => {};
  @Input() confirmMessage: string = 'Are you sure you want to do this?';
  
  @HostListener('click', ['$event'])
  confirmFirst() {
    const confirmed = window.confirm(this.confirmMessage);
    
    if(confirmed) {
      this.onConfirmed();
    }
  }
}
```
[View Example](https://plnkr.co/edit/CSlDTcqeRUXh3I05uglK?p=preview)

Our directive gets a new input property that represents the confirm dialog message, which we pass in to `window.confirm` call. To take advantage of this new input property, we add another binding to our button.

```
    <button 
      type="button" 
      [confirm]="visitRangle" 
      confirmMessage="Click ok to visit Rangle.io!">
      Visit Rangle
    </button>
```

[View Example](https://plnkr.co/edit/CSlDTcqeRUXh3I05uglK?p=preview)

Now we have a button with a customizable confirm message before it moves you to a new url.