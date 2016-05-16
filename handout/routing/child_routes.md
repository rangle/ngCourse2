# Creating Child Routes #

To declare the child routes in the application we declare the main route in the main app and then define specific child routes in the main child component.

```javascript
@RouteConfig([
  .....
  { path: '/componentOne/...', component: ComponentOneContainer, as: 'ComponentOneContainer'},
  .....  
])
```
In the above example we define the main `/componentOne` route which maps to the `ComponentOneContainer` the `...` dots at the end of the route tells Angular that it has associated child routes with it. Next in the child `ComponentOneContainer` we need to do two things:-

* Define the RouterOutlet view where child routes get rendered
* Set up the child routes using another `@RouteConfig` decorator on the child component.

Here's an example:

```javascript
@Component({
  directives: [ROUTER_DIRECTIVES]
  selector: 'component-one-container',
  template: `Component One Container
  <br/>
  <div style="border: 1px solid red">
    <router-outlet></router-outlet>
  </div>
  `
})
@RouteConfig([{
    path: '/',
    component: ComponentOne,
    as: 'ComponentOne',
    useAsDefault: true
  }, {
    path: '/component-three-nested/:message',
    component: ComponentThree,
    as: 'ComponentThree'
  }
, {
  path: '/component-one-child-one',
  component: ComponentOneChildOne,
  as 'ComponentOneChildOne'
}, {
  path: '/component-one-child-two',
  component: ComponentOneChildTwo,
  as 'ComponentOneChildTwo'
}, {
  path: '/component-one-child-three/:message',
  component: ComponentThree,
  as 'ComponentThree'
}])
export default class ComponentOneContainer {

}

```
[View Example](https://plnkr.co/edit/qCYF138UXe6l9CiTXggG?p=preview)
