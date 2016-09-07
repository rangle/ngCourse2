import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'component-one',
  template: `
    <div>Query param page #: {{page}}</div>
    <div><button (click)="nextPage()">Next Page</button></div>
    <p>Run example full screen to see query param "page" change</p>`
})
export default class ComponentOne {
  constructor(
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.page = +params['page'] || 0;

        console.log('Query param page: ', this.page);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  nextPage() {
    this.router.navigate(['/component-one'], { queryParams: { page: this.page + 1 } });
  }
}
