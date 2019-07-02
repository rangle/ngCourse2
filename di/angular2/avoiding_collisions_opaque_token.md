# Avoiding Injection Collisions: OpaqueToken

Since Angular allows the use of tokens as identifiers to its dependency injection system, one of the potential issues is using the same token to represent different entities. If, for example, the string `'token'` is used to inject an entity, it's possible that something totally unrelated also uses `'token'` to inject a different entity. When it comes time for Angular to resolve one of these entities, it might be resolving the wrong one. This behavior might happen rarely or be easy to resolve when it happens within a small team - but when it comes to multiple teams working separately on the same codebase or 3rd party modules from different sources are integrated these collisions become a bigger issue.

Consider this example where the main application is a consumer of two modules: one that provides an email service and another that provides a logging service.

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

The email service api requires some configuration settings, identified by the string `api-config`, to be provided by the DI system. This module should be flexible enough so that it can be used by different modules in different applications. This means that those settings should be determined by the application characteristics and therefore provided by the `AppModule` where the `EmailModule` is imported.

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

The other service, `LoggerModule`, was created by a different team than the one that created `EmailModule`, and it that also requires a configuration object. Not surprisingly, they decided to use the same token for their configuration object, the string `api-config`. In an effort to avoid a collision between the two tokens with the same name, we could try to rename the imports as shown below. In an effort to avoid a collision between the two tokens with the same name, we could try to rename the imports as shown below.

_app/app.module.ts_

```typescript
import { apiConfig as emailApiConfig } from './email/index';
import { apiConfig as loggerApiConfig } from './logger/index';

@NgModule({
  ...
  providers: [
    { provide: emailApiConfig, useValue: { apiKey: 'email-key', context: 'registration' } },
    { provide: loggerApiConfig, useValue: { apiKey: 'logger-key' } },
  ],
  ...
})
export class AppModule { }
```

[View Example](https://plnkr.co/edit/QrvjsucT6lF6dnFUb2ag?p=preview)

When the application runs, it encounters a collision problem resulting in both modules getting the same value for their configuration, in this case `{ apiKey: 'logger-key' }`. When it comes time for the main application to specify those settings, Angular overwrites the first `emailApiConfig` value with the `loggerApiConfig` value, since that was provided last. In this case, module implementation details are leaking out to the parent module. Not only that, those details were obfuscated through the module exports and this can lead to problematic debugging. This is where Angular's `OpaqueToken` comes into play.

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

_app/email/email.module.ts_

```typescript
export const apiConfig = new OpaqueToken('api-config');

@Injectable()
export class EmailService {
  constructor(@Inject(apiConfig) public apiConfig: EmailConfig) { }
}
```

```typescript
export const apiConfig = new OpaqueToken('api-config');

@Injectable()
export class LoggerService {
  constructor(@Inject(apiConfig) public apiConfig: LoggerConfig) { }
}
```

[View Example](https://plnkr.co/edit/SHfTH9R6JVDwJKnzRFSH?p=preview)

After turning the identifying tokens into `OpaqueToken`s without changing anything else, the collision is avoided. Every service gets the correct configuration object from the root module and Angular is now able to differentiate two tokens that uses the same string.

