# Using Multiple Structural Directives

Sometimes we'll want to combine multiple structural directives together, like iterating using `ngFor` but wanting to do an `ngIf` to make sure that the value matches some or multiple conditions. Combining structural directives can lead to unexpected results however, so Angular 2 requires that a template can only be bound to one directive at a time. To apply multiple directives we'll have to expand the sugared syntax or nest template tags.


```typescript
@Component({
  selector: 'app',
  template: `
    <template ngFor [ngForOf]="[1,2,3,4,5,6]" let-item>
      <div *ngIf="item > 3">
        {{item}}
      </div>
    </template>
  `
})
```
[View Example](https://plnkr.co/edit/3bJVnCs6n9HwA3GCh7IE?p=preview)