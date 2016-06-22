# Using the Router Programmatically #

In addition to being able to use the `routerLink` directive to control the navigation of your application, you can also access the router from your components using the `Router` service. To do this you must inject the router into your component as shown:

```javascript
// ...
@Component({
  selector: 'component-one',
  template: `Component One<br/>
  <button (click)="onClick()">Click Me</button>
  `
})
export default class ComponentOne { 
  constructor(private _router:Router) { 
    
  }
  onClick () {
    this._router.navigate(['/ComponentThree',{message: 'Called from _router.Navigate'}]);
  }
}
```

[View Example](https://plnkr.co/edit/uRzACsqaaFppM3kHdsUt?p=preview)
