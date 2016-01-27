# View Encapsulation

Defines whether the template and styles defined within the component can affect the whole application or vice versa. Angular provides three encapsulation strategies:

- `Emulated`: (default) Styles from main HTML propagate to the component
- `Native`: Styles from main HTML do not propagate to the child
- `None`: Styles from the component propagate back to the main HTML

 ```js
@Component({
  ...
  encapsulation: ViewEncapsulation.None,
  styles: [ ... ]
})
export class Hello { ... }
 ```

[View Example](http://plnkr.co/edit/xTAqeN5jnf5KEFUARtAL?p=preview)

