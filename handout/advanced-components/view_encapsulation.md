# View Encapsulation

View encapsulation defines whether the template and styles defined within the component can affect the whole application or vice versa. Angular provides three encapsulation strategies:

- `Emulated` (default) - styles from main HTML propagate to the component. Styles defined in this component's `@Component` decorator are scoped to this component only.
- `Native` - styles from main HTML do not propagate to the component. Styles defined in this
component's `@Component` decorator are scoped to this component only.
- `None` - styles from the component propagate back to the main HTML and therefore are visible to
all components on the page.

 ```js
@Component({
  ...
  encapsulation: ViewEncapsulation.None,
  styles: [ ... ]
})
export class Hello { ... }
 ```

[View Example](http://plnkr.co/edit/ZlFFvQufvbsTEueLixeB?p=preview)
