import {Component, ElementRef} from 'angular2/core';

@Component({
	selector: 'app',
	template: `
  <h1>My App</h1>
  <pre style="background: #eee; padding: 1rem; border-radius: 3px; overflow: auto;"> 
<code>{{ node }}</code>
  </pre>
`
})
export default class App implements OnInit {
  node: string;
  
  constructor(
    private elementRef: ElementRef
  ) {  }

  ngOnInit(){
    
    const tmp = document.createElement('div');
    const el = this.elementRef.nativeElement.cloneNode(true);

    tmp.appendChild(el);
    this.node = tmp.innerHTML;
  }
  
}
