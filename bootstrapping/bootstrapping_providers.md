# Bootstrapping Providers

As of Angular 6, we have access to a great way to have our services globally available in our applications, while still being bundled and lazy loaded as efficiently as possible.
`@Provider` decorators now take an additional argument, `providedIn`.

In almost every case, you want to use `providedIn: 'root'` - telling your angular application that this service should be a singleton, available all throughout your application. You don't even need to inject it into a module!


_app/greeter.service.ts_

```typescript
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GreeterService {
  private message: string =
    "Registering Providers while Bootstrapping an Angular 2 application!";

  getMessage() {
    return this.message;
  }
}
```

[View Example](https://codesandbox.io/embed/bootstrapping-providers-f6g6g?fontsize=14&hidenavigation=1&theme=dark)

