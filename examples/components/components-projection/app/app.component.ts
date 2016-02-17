import {Component, Input} from 'angular2/core';

@Component({
  selector: 'child-select',
  template: `
    <div style="border: 2px solid red; padding: 1rem; margin: 2px;">
	    <h4>Child Component with Select</h4>
	    <div style="border: 2px solid orange; padding: 1rem; margin: 2px">
	      <ng-content select="header"></ng-content>
	    </div>
	    <div style="border: 2px solid green; padding: 1rem; margin: 2px">
	      <ng-content select="section"></ng-content>
	    </div>
	    <div style="border: 2px solid pink; padding: 1rem; margin: 2px">
	      <ng-content select=".class-select"></ng-content>
	    </div>
	    <div style="border: 2px solid purple; padding: 1rem; margin: 2px">
	      <ng-content select="footer"></ng-content>
	    </div>
    </div>
  `
})
class ChildSelect {
  
}

@Component({
	selector: 'child',
	template: `
	  <div style="border: 2px solid blue; padding: 1rem; margin: 2px;">
	    <h4>Child Component</h4>
	    <ng-content></ng-content>
    </div>
	`
})
class Child {
  childCount: number = 24;
}


@Component({
	selector: 'app',
	template: `
    <div style="border: 2px solid black; padding: 1rem;">
      <h4>App Component</h4>
	    <child>
	      <p>My <i>projected</i> content.</p>
	      <p>
	        <b>Count:</b> {{ count }} <br/>
	        <b>Child Count:</b> {{ childCount || 'N/A' }}
	     </p>
	    </child>
	    <child-select>
	      <section>Section Content</section>
	      <div class="class-select">
	        div with .class-select
	      </div>
	      <footer>Footer Content</footer>
	      <header>Header Content</header>
	    </child-select>
	  </div>
	`,
	directives: [Child, ChildSelect]
})
export class App {
  count: number = 12;
}

