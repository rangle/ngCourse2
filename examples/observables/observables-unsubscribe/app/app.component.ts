import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'app',
	template: `
	  <b>Angular 2 Component Using Observables!</b>
	  
	  <h5 style="margin-bottom: 0">VALUES</h5>
	  <pre><code>{{value}}</code></pre>
	  
	  <h5 style="margin-bottom: 0">SUBSCRIBED</h5>
	  <pre><code>{{subscribed}}</code></pre>
	  
	  <h5 style="margin-bottom: 0">STATUS</h5>
	  <pre><code>{{status}}</code></pre>
	  
	  <button style="margin-top: 2rem" (click)="init()">Init</button>
  `
})
export class MyApp {
  
  private data: Observable<Array<string>>;
  private value: string;
  private subscribed: boolean;
  private status: string;

	init() {

		this.data = new Observable(observer => {
			let timeoutId = setTimeout(() => {
				observer.next('You will never see this message');
			}, 2000);
			
			this.status = 'Started';
			
			return onUnsubscribe = () => {
				this.subscribed = false;
				this.status = 'Finished';
				clearTimeout(timeoutId);
			}
		});

		let subscription = this.data.subscribe(
			value => this.value = value,
			error => console.log(error),
			() => this.status = 'Finished';
		);
		this.subscribed = true;
		
		setTimeout(() => {
		  subscription.unsubscribe();
		}, 1000);
	}

}