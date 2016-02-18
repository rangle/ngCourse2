import {Component, Input, OnInit, Output, EventEmitter} from 'angular2/core';
import {NgClass} from 'angular2/common';
import * as R from 'Ramda';
@Component({
  selector: 'rating',
  styleUrls: ['app/components/rating.css'],
  templateUrl: 'app/components/rating-tpl.html',
  directives: [NgClass]
})
export default class RatingComponent implements OnInit {
  @Input() stars: number;
  @Output() ratingUpdated = new EventEmitter();
  
  skillStars: boolean[];
  

  ngOnInit() {
    this.skillStars = this.buildRating(this.stars, 5);
  }

  ratingClicked(event, rating) {
    // Emit the update event so the app
    // container can dispatch the appropiate action.
  }
  
  buildRating(rating, max) {
    /* 
    Complete the implementation to transform a rating of '4'
    into an array that is [true,true,true,true, false]
    */
    return [true, true, true, true, false]

    
  }

}

