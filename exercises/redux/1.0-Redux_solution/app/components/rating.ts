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
    this.ratingUpdated.emit(rating+1);
  }
  
  buildRating(rating, max) {

    return R.concat(
      R.repeat(true, rating),
      R.repeat(false, max - rating);
  }

}

