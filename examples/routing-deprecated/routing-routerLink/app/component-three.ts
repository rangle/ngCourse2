import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'component-three',
  template: 'Component three: {{fromRouteParam}}'
})
export default class ComponentThree { 
  private fromRouteParam: string;
  private sub: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.fromRouteParam = 'Hello';
    
  }
  ngOnInit() {
    
    this.sub = this.route.params.subscribe(params=>{
      this.fromRouteParam = params.message;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}