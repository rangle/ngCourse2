import {Http} from 'angular2/http';
import {Injectable} from 'angular2/core';

@Injectable()
export default class SearchService {

  constructor(private http: Http) {}

  search(term: string) {
    const url = `https://api.spotify.com/v1/search?q=${ term }&type=artist`;
    return this.http
      .get(url);
  }

}