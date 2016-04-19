# View Encapsulation

Defines whether the template and styles defined within the component can affect the whole application or vice versa. Angular provides three encapsulation strategies:

- `Emulated`: (default) Styles from main HTML propagate to the component. However
styles defined in this component's `@Component` decorator are scoped to this component
only.
- `Native`: Styles from main HTML do not propagate to the child. Styles defined in this
component's `@Component` decorator are still scoped to this component only.
- `None`: Styles from the component propagate back to the main HTML and therefore can
all components on the page.

 ```js
@Component({
  ...
  encapsulation: ViewEncapsulation.None,
  styles: [ ... ]
})
export class Hello { ... }
 ```

[View Example](http://plnkr.co/edit/xTAqeN5jnf5KEFUARtAL?p=preview)


<iframe style="width: 100%; height: 600px" src="https://embed.plnkr.co/xTAqeN5jnf5KEFUARtAL" frameborder="0" allowfullscren="allowfullscren"></iframe>
