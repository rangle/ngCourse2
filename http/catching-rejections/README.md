# Catching Rejections

To catch rejections we use the subscriber's `error` and `complete` callbacks.

```typescript
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(private http: Http) {}

  login(username, password) {
    const payload = {
      username: username,
      password: password
    };

    this.http.post(`${ BASE_URL }/auth/login`, payload)
      .map(response => response.json())
      .subscribe(
        authData => this.storeToken(authData.id_token),
        (err) => console.error(err),
        () => console.log('Authentication Complete')
      );
  }
}
```

