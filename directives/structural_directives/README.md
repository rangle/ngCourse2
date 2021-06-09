# Structural Directives

Structural Directives are a way of handling how a component or element renders through the use of the `ng-template` tag. This allows us to run some code that decides what the final rendered output will be. Angular has a few built-in structural directives such as `ngIf`, `ngFor`, and `ngSwitch`.

Structural directives have their own special syntax in the template that works as syntactic sugar.

```typescript
@Component({
  selector: 'app-directive-example',
  template: `
    <p *structuralDirective="expression">
      Under a structural directive.
    </p>
  `
})
```

Instead of being enclosed by square brackets, our dummy structural directive is prefixed with an asterisk. Notice that the binding is still an expression binding even though there are no square brackets. That's due to the fact that it's syntactic sugar that allows using the directive in a more intuitive way and similar to how directives were used in AngularJS (1.x). The component template above is equivalent to the following:

```typescript
@Component({
  selector: 'app-directive-example',
  template: `
    <ng-template [structuralDirective]="expression">
      <p>
        Under a structural directive.
      </p>
    </ng-template>
  `
})
```

Here, we see what was mentioned earlier when we said that structural directives use the `ng-template` tag. Internally, Angular translates the `*ngIf` attribute into a `<ng-template>` element, wrapped around the host element, as seen here:

```typescript
@Component({
  selector: 'app-directive-example',
  template: `
    <ng-template [structuralDirective]="expression">
      <p>
        Under a structural directive.
      </p>
    </ng-template>
  `
})
```

