import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

@Component({
	selector: 'app-root',
	template: `
	  <b>Angular 2 Component Using Observables!</b>
	 
	  <h6 style="margin-bottom: 0">VALUES:</h6>
	  <div *ngFor="#value of values">- {{ value }}</div>
	  
	  <h6 style="margin-bottom: 0">STATUS:</h6>
	  <div>{{status}}</div>
	  
	  <button style="margin-top: 2rem;" (click)="init()">Init</button>
	`
})
export class AppComponent {
  
  private data:Observable<Array<number>>;
  private values:Array<number> = [];
  private anyErrors:boolean;
  private finished:boolean;

  constructor() {
  }
  
  init() {
      this.data = new Observable(observer => {
          setTimeout(() => {
              observer.next(42);
          }, 1000);
          
          setTimeout(() => {
              observer.next(43);
          }, 2000);
          
          setTimeout(() => {
              observer.complete();
          }, 3000);
          
          this.status = "Started";
      });

      let subscription = this.data.forEach(
			  value => this.values.push(value)
		  );
		  
		  this.status = "Ended";
  }

}