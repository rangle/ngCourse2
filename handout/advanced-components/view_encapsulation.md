# View Encapsulation

Defines whether the template and styles defined within the component can affect the whole application or vice versa. Angular provides three encapsulation strategies:

- `Emulated`: (default) Styles from main HTML propagate to the component. However
styles defined in this component's `@Component` decorator are scoped to this component
only.
- `Native`: Styles from main HTML do not propagate to the child. Styles defined in this
component's `@Component` decorator are still scoped to this component only.
- `None`: Styles from the component propagate back to the main HTML and therefore are visible to
all components on the page.

 ```js
@Component({
  ...
  encapsulation: ViewEncapsulation.None,
  styles: [ ... ]
})
export class Hello { ... }
 ```

[View Example](http://plnkr.co/edit/N7d89PBQ5fYKbwzB2E37?p=preview)


<iframe class="no-pdf" style="width: 100%; height: 600px" src="http://embed.plnkr.co/N7d89PBQ5fYKbwzB2E37/" frameborder="0" allowfullscren="allowfullscren"></iframe>
