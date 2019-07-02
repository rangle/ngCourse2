# Bootstrapping ng-metadata

ng-metadata provides [`@NgModule`](https://angular.io/docs/ts/latest/api/core/index/NgModule-interface.html) from Angular 2 to Angular 1. To use `@NgModule`, update your application bootstrap from `angular.bootstrap` to the example below.

## Bootstrap \(bootstrap.ts\)

```javascript
import { platformBrowserDynamic } from 'ng-metadata/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

## App Module \(app.module.ts\)

```javascript
import { NgModule } from 'ng-metadata/core';
import { AppComponent } from './app.component';
import { HeroComponent } from './hero.component';
import { HeroService } from './hero.service';

@NgModule({
  declarations: [AppComponent, HeroComponent],
  providers: [HeroService]
})
export class AppModule {}
```

