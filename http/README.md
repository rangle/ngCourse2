# Http

In order to start making HTTP calls from our Angular app we need to import the `angular/http` module and register for HTTP services. It supports both XHR and JSONP requests exposed through the `HttpClientModule` and `HttpClientJsonpModule` respectively. In this section we will be focusing only on the `HttpClientModule`.

## Setting up angular/http

In order to use the various HTTP services we need to include `HttpClientModule` in the imports for the root `NgModule`. This will allow us to access HTTP services from anywhere in the application.

```typescript
...
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SearchService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

