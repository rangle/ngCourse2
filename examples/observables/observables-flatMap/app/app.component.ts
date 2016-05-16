import {Component} from '@angular/core';
import {Control, ControlGroup, FormBuilder} from '@angular/common';
import {SearchService} from './services/search.service';
import 'rxjs/Rx';

@Component({
	selector: 'app',
	template: `
		<form [ngFormModel]="coolForm"><input ngControl="search" placeholder="Search Spotify artist"></form>
		
		<div *ngFor="let artist of result">
		  {{artist.name}}
		</div>
	`
})

export class App {
	searchField: Control;
	coolForm: ControlGroup;
	
	constructor(private searchService:SearchService, private fb:FormBuilder) {
		this.searchField = new Control();
		this.coolForm = fb.group({search: this.searchField});
		
		this.searchField.valueChanges
		  .debounceTime(400)
			.flatMap(term => this.searchService.search(term))
			.subscribe((result) => {
				this.result = result.artists.items
			});
	}
}