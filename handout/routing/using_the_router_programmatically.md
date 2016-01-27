# Using the Router Programmatically #

In addition to being able to use the `routerLink` directive to control the navigation of your application, you are also able to access the router from your components using the `Router` service. To do this, you need to inject the router into your component.

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

[View Example](http://plnkr.co/edit/9pGP7YRdpLKpoUREWdWs?p=preview)

