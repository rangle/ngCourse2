# NgSwitch Directives

`ngSwitch` is actually comprised of two directives, an attribute directive and a structural directive. It's very similar to a [switch statement](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/switch) in JavaScript and other programming languages, but in the template.

```typescript
@Component({
  selector: 'app',
  directives: [DoorComponent],
  template: `
    <div [ngSwitch]="door">
      <door [id]="1" *ngSwitchCase="1">A new car!</door>
      <door [id]="2" *ngSwitchCase="2">A washer and dryer!</door>
      <door [id]="3" *ngSwitchCase="3">A trip to Tahiti!</door>
      <door [id]="4" *ngSwitchCase="4">25 000 dollars!</door>
      <door *ngSwitchDefault class="closed"></door>
    </div>
    
    <div class="options">
      <input type="radio" name="door" (click)="setDoor(1)" /> Door 1
      <input type="radio" name="door" (click)="setDoor(2)" /> Door 2
      <input type="radio" name="door" (click)="setDoor(3)" /> Door 3
      <input type="radio" selected="selected" name="door" (click)="setDoor()"/> Close all
    </div>
  `
})
export class AppComponent {
  door: number;
  
  setDoor(num: number) {
    this.door = num;
  }
}
```
[View Example](https://plnkr.co/edit/n3jhb6BnRuU17uxIYfMT?p=preview)

Here we see the `ngSwitch` attribute directive being attached to an element. This expression bound to the directive defines what will compared against in the switch structural directives. If an expression bound to `ngSwitchCase` matches the one given to `ngSwitch`, those components are created and the others destroyed. If none of the cases match, then components that have `ngSwitchDefault` bound to them will be created and the others destroyed. Note that multiple components can be matched using `ngSwitchCase` and in those cases all matching components will be created. Since components are created or destroyed be aware of the costs in doing so.