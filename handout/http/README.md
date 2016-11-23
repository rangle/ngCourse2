## HTTP

In order to start making HTTP calls from our Angular app we need to import the `angular/http` module and register for HTTP services. It supports both XHR and JSONP requests exposed through the `HttpModule` and `JsonpModule` respectively. In this section we will be focusing only on the `HttpModule`.


### Setting up angular/http

In order to use the various HTTP services we need to include `HttpModule` in the imports for the root `NgModule`. This will allow us to access HTTP services from anywhere in the application.

```ts
...
import { MyApp } from './app.component'
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule
  ],
  providers: [SearchService],
  declarations: [MyApp],
  bootstrap: [MyApp]
})
export class MyAppModule {}
```
