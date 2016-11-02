# Structural Directives

Structural Directives are a way of handling how a component or element renders through the use of the `template` tag. This allows us to run some code that decides what the final rendered output will be. Angular 2 has a few built-in structural directives such as `ngIf`, `ngFor`, and `ngSwitch`.

*Note: For those who are unfamiliar with the `template` tag, it is an HTML element with a few special properties. Content nested in a template tag is not rendered on page load and is something that is meant to be loaded through code at runtime. For more information on the `template` tag, visit the [MDN documentation](https://developer.mozilla.org/en/docs/Web/HTML/Element/template)*.

Structural directives have their own special syntax in the template that works as syntactic sugar.

```typescript
@Component({
    selector: 'directive-example',
    template: `
        <p *structuralDirective="expression">
            Under a structural directive.
        </p>
    `
})
```

Instead of being enclosed by square brackets, our dummy structural directive is prefixed with an asterisk. Notice that the binding is still an expression binding even though there are no square brackets. That's due to the fact that it's syntactic sugar that allows using the directive in a more intuitive way and similar to how directives were used in Angular 1. The component template above is equivalent to the following:

```typescript
@Component({
    selector: 'directive-example',
    template: `
        <template [structuralDirective]="expression">
            <p>
                Under a structural directive.
            </p>
        </template>
    `
})
```


Here, we see what was mentioned earlier when we said that structural directives use the `template` tag. Angular 2 also has a built-in `template` directive that does the same thing:

```typescript
@Component({
    selector: 'directive-example',
    template: `
        <p template="structuralDirective expression">
            Under a structural directive.
        </p>
    `
})
```
