# Avoiding Injection Collisions: OpaqueToken

Since Angular allows the use of tokens as identifiers to its dependency injection system, one of the potential issues is using the same token to represent different entities. If, for example, the string `token` is used to inject an entity, it's possible that something totally unrelated is also using the same string to inject a different entity. Now, when it comes time for Angular to resolve one of them, we could be using a value intended for the other. This behaviour might be difficult to run into or easy to resolve within a small team, but when it comes to multiple teams working separately on the same codebase, or integration of 3rd party modules, the cost of these collisions goes up. This is where Angular's `OpaqueToken` comes into play.

`OpaqueToken`s are unique and immutable values which allow developers to avoid collisions of dependency injection token ids.

```
import { OpaqueToken } from '@angular/core';

const name = 'token';
const token1 = new OpaqueToken(name);
const token2 = new OpaqueToken(name);

console.log(token1 === token2); // false
```

Here, regardless of whether or not the same value is passed to the constructor of the token, it will not generate the same result. Consider this example of two separate modules that are both looking for api configs.

_app/email.module.ts_
```javascript
export const apiConfig = 'api-config';

@Injectable()
export class EmailService {
  constructor(@Inject(apiConfig) public apiConfig: EmailConfig) { }
}

@NgModule({
  providers: [ EmailService ],
})
export class EmailModule { }
```

_app/logger.module.ts_
```javascript

export const apiConfig = 'api-config';

@Injectable()
export class LoggerService {
  constructor(@Inject(apiConfig) public apiConfig: LoggerConfig) { }
}

@NgModule({
  providers: [ LoggerService ],
})
export class LoggerModule { }
```
[View Example](https://plnkr.co/edit/4apXe4XTOy9jDbVIajL3?p=preview)

Both `EmailModule` and `LoggerModule` are attempting to inject their api configuration using the same key. When it comes time to inject the value

_app/app.module.ts_
```javascript
@NgModule({
  ...
  providers: [
    { provide: emailApiConfig, useValue: { apiKey: 'email-config', context: 'registration' } },
    { provide: loggerApiConfig, useValue: { apiKey: 'logger-config' } },
  ],
  ...
})
export class AppModule { }
```

Angular overwrites the first `emailApiConfig` value with the `loggerApiConfig` value, since it was provided last. In this case, module implementation details are leaking out to the parent module. Not only that, those details were obfuscated through the module exports and can lead to problematic debugging.

Using `OpaqueToken`, Angular is able to resolve the correct entities.

_app/email.module.ts_
```javascript
export const apiConfig = new OpaqueToken('api-config');

@Injectable()
export class EmailService {
  constructor(@Inject(apiConfig) public apiConfig: EmailConfig) { }
}

@NgModule({
  providers: [
    EmailService,
  ],
})
export class EmailModule { }
```
[View Example](https://plnkr.co/edit/esaYGmJK8vOULxHKCgET?p=preview)
