# Avoiding Injection Collisions: OpaqueToken

Since Angular allows the use of tokens as identifiers to its dependency injection system, one of the potential issues is using the same token to represent different entities. If, for example, the string `'token'` is used to inject an entity, it's possible that something totally unrelated also uses `'token'` to inject a different entity. When it comes time for Angular to resolve one of these entities, it might be resolving the wrong one. This behaviour might happen rarely, or are easy to resolve when it happens within a small team, but when it comes to multiple teams working separately on the same codebase or integration of 3rd party modules, the cost of these collisions goes up.

Consider this example where the main app is a consumer of two modules: one that provides an email service and another that provides a logging service.

_app/email/email.service.ts_
```typescript
export const apiConfig = 'api-config';

@Injectable()
export class EmailService {
  constructor(@Inject(apiConfig) public apiConfig) { }
}
```

_app/email/email.module.ts_
```typescript
@NgModule({
  providers: [ EmailService ],
})
export class EmailModule { }
```

The email service has an associated api that is trying to inject configuration settings identified by the string `'api-config'`.

_app/logger/logger.service.ts_
```typescript
export const apiConfig = 'api-config';

@Injectable()
export class LoggerService {
  constructor(@Inject(apiConfig) public apiConfig) { }
}
```

_app/logger/logger.module.ts_
```typescript
@NgModule({
  providers: [ LoggerService ],
})
export class LoggerModule { }
```

`LoggerModule` has an api as well, and it's also using the string `'api-config'` to inject its configuration settings. When it comes time for the main app to specify those settings, Angular overwrites the first `emailApiConfig` value with the `loggerApiConfig` value, since it was provided last.

_app/app.module.ts_
```typescript
import { apiConfig as emailApiConfig } from './email/index';
import { apiConfig as loggerApiConfig } from './logger/index';

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
[View Example](https://plnkr.co/edit/QrvjsucT6lF6dnFUb2ag?p=preview)

In this case, module implementation details are leaking out to the parent module. Not only that, those details were obfuscated through the module exports and this can lead to problematic debugging. This is where Angular's `OpaqueToken` comes into play.

## OpaqueToken

`OpaqueToken`s are unique and immutable values which allow developers to avoid collisions of dependency injection token ids.

```typescript
import { OpaqueToken } from '@angular/core';

const name = 'token';
const token1 = new OpaqueToken(name);
const token2 = new OpaqueToken(name);

console.log(token1 === token2); // false
```

Here, regardless of whether or not the same value is passed to the constructor of the token, it will not result in identical symbols.

Replacing the old strings with `OpaqueToken`s allows Angular to resolve entities as both modules intended.

_app/email/email.module.ts_
```typescript
export const apiConfig = new OpaqueToken('api-config');

@Injectable()
export class EmailService {
  constructor(@Inject(apiConfig) public apiConfig: EmailConfig) { }
}

@NgModule({
  providers: [ EmailService ],
})
export class EmailModule { }
```
[View Example](https://plnkr.co/edit/SHfTH9R6JVDwJKnzRFSH?p=preview)
