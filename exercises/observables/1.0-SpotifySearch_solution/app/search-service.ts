import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export default class SearchService {

  constructor(private http: Http) {}

  search(term: string) {
    const url = `https://api.spotify.com/v1/search?q=${ term }&type=artist`;
    return this.http
      .get(url)
      .map((response) => response.json());
  }

}
