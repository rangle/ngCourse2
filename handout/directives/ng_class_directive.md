# NgClass Directive

The `ngClass` directive changes the `class` attribute that is bound to the component or element it's attached to. There are a few different ways of using the directive. 

## Binding a string

We can bind a string directly to the attribute. This works just like adding an html `class` attribute.

```typescript
@Component({
  selector: 'class-as-string',
  template: `
    <p ngClass="centered-text underlined" class="orange">
      <ng-content></ng-content>
    </p>
  `,
  styles: [`
    .centered-text {
      text-align: center;
    }
    
    .underlined {
      border-bottom: 1px solid #ccc;
    }
    
    .orange {
      color: orange;
    }
  `]
})
export class ClassAsStringComponent {
}
```

[View Example](https://plnkr.co/edit/8M32UVF8BHJDaRMGziFi?p=preview)

In this case, we're binding a string directly so we avoid wrapping the directive in square brackets. Also notice that the `ngClass` works with the `class` attribute to combine the final classes.

## Binding an array

```typescript
@Component({
  selector: 'class-as-array',
  template: `
    <p [ngClass]="['warning', 'big']">
      <ng-content></ng-content>
    </p>
  `,
  styles: [`
    .warning {
      color: red;
      font-weight: bold;
    }
    
    .big {
      font-size: 1.2rem;
    }
  `]
})
export class ClassAsArrayComponent {
}
```

[View Example](https://plnkr.co/edit/8M32UVF8BHJDaRMGziFi?p=preview)

Here, since we are binding to the `ngClass` directive by using an expression, we need to wrap the directive name in square brackets. Passing in an array is useful want to have a function put together the list of applicable class names.

## Binding an object

Lastly, an object can be bound to the directive. Angular 2 applies each property name of that object to the component if that property is true.

```typescript
@Component({
  selector: 'class-as-object',
  template: `
    <p [ngClass]="{ card: true, dark: false, flat: flat }">
      <ng-content></ng-content>
    </p>
  `,
  styles: [`
    .card {
      border: 1px solid #eee;
      padding: 1rem;
      margin: 0.4rem;
      font-family: sans-serif;
      box-shadow: 2px 2px 2px #888888;
    }
    
    .dark {
      background-color: #444;
      border-color: #000;
      color: #fff;
    }
    
    .flat {
      box-shadow: none;
    }
  `]
})
export class ClassAsObjectComponent {
  flat: boolean = true;
}
```

[View Example](https://plnkr.co/edit/8M32UVF8BHJDaRMGziFi?p=preview)

Here we can see that since the object's `card` and `flat` properties are true, those classes are applied but since `dark` is false, it's not applied.