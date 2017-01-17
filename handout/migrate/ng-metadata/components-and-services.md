# Components and Services

ng-metadata lets us write code in an Angular style. Components written
in this style are prime candidates for an eventual upgrade using ng-upgrade.

## Components

Components use `@Component` from ng-metadata. Lifecycle hooks similar to those
in Angular should work with ng-metadata.

```js
import { Component, Inject, Input, Output, EventEmitter, OnInit } from 'ng-metadata/core';
import { HeroService } from './hero.service';

@Component({
  selector: 'hero',
  templateUrl: './hero.component.html'
})
export class HeroComponent implements OnInit {
  @Input() name: string;
  @Output() call = new EventEmitter<void>();

  // Services can be included using `@Inject` or by their class literal
  constructor(
    @Inject('$log') private $log: ng.ILogService,
    private heroSvc: HeroService
  ){
  }

  ngOnInit() {
    console.log('Component initialized');
  }
}```

## Services

Services use `@Injectable` from ng-metadata. This decorator is written preceding
a TypeScript class. Angular 1 services can be added by using the `@Inject`
decorator in the service constructor.

```js
import { Injectable, Inject } from 'ng-metadata/core';

@Injectable()
export class HeroService {
  constructor(@Inject('$http') private $http: ng.IHttpService){
  }

  fetchAll(){
    return this.$http.get('/api/heroes');
  }
}```
