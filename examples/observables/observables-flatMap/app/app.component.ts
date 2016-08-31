import { Component } from '@angular/core';
import { FormControl, 
	FormGroup, 
	FormBuilder } from '@angular/forms'; 
import { SearchService } from './services/search.service';
import 'rxjs/Rx';

@Component({
	selector: 'app',
	template: `
		<form [formGroup]="coolForm"><input formControlName="search" placeholder="Search Spotify artist"></form>
		
		<div *ngFor="let artist of result">
		  {{artist.name}}
		</div>
	`
})

export class MyApp {
	searchField: FormControl;
	coolForm: FormGroup;
	
	constructor(private searchService:SearchService, private fb:FormBuilder) {
		this.searchField = new FormControl();
		this.coolForm = fb.group({search: this.searchField});
		
		this.searchField.valueChanges
		  .debounceTime(400)
			.flatMap(term => this.searchService.search(term))
			.subscribe((result) => {
				this.result = result.artists.items
			});
	}
}