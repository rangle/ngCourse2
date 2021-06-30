# Angular Dependency Injection

Dependency Injection \(DI\) is one of those things that is uniquely implemented in Angular when compared to it's peers. It aims to create a system for you to ensure that the appropriate services that you need are available, piggy backing on angular's use of Javascript/Typescript classes to provide a simple way of instantiating your services.

It's not uncommon to write something like this


```typescript
import { Component } from '@angular/core';
import { MyService } from './services/my-service.service';

@Component({
  selector: 'my-component',
  template: './my-component.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  
  myValue = this.myService.value;
  
  constructor(private myService: MyService){}
}
```

When combined with Angular 6+'s implementation of `@Injectable` services, utilizing the new property/value combo `providedIn: "root"`, Angular handles the rest and appropriately provides you an instance of that service, without you having to worry about lazy loading, bundling or providing this service in any particular Module.

That being said, there are reasons you may want to tackle this differently. As this pattern creates a singleton service, all Components/Services that inject `MyService` into their constructors, will actually share that value.

## Providing Unique Instances 

When you want each Component that is accessing a particular service to get a _uniquely instantiated version_ of that service, for example - when you want each component to interact with the state of that service differently, you can do so quite easily on the component level.

```typescript
import { Component } from '@angular/core';
import { MyService } from './services/my-service.service';

@Component({
  selector: 'my-component',
  template: './my-component.component.html',
  providers: [ MyService ], // This is the only thing that needs to be changed
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  
  myValue = this.myService.value;
  
  constructor(private myService: MyService){}
}
```
When you utilize the `providers` field in the Component Decorator, any services you pass into that array, will be uniquely instantiated for that particular component!
