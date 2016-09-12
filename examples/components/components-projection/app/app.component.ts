import {Component} from '@angular/core';

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
	`
})
export class App {
  count: number = 12;
}
