import {Injectable} from 'angular2/core';
import * as R from 'Ramda';
const mockData = [{
  '_id': '56b35c39533e5e7b8765c36b',
  'name': {
    'first': 'Courtney',
    'last': 'Parrish'
  },
  'company': 'GEOFORM',
  'email': 'courtney.parrish@geoform.biz',
  'phone': '+1 (987) 539-3825',
  'greeting': 'Hello, Courtney! You have 7 unread messages.',
}, {
  '_id': '56b35c390c3b50a98464d9bf',
  'name': {
    'first': 'Iva',
    'last': 'Gamble'
  },
  'company': 'FLOTONIC',
  'email': 'iva.gamble@flotonic.org',
  'phone': '+1 (981) 515-3628',
  'greeting': 'Hello, Iva! You have 8 unread messages.',
}, {
  '_id': '56b35c398c3f15913f4c10cb',
  'name': {
    'first': 'Pearson',
    'last': 'Johns'
  },
  'company': 'HYPLEX',
  'email': 'pearson.johns@hyplex.me',
  'phone': '+1 (990) 560-3948',
  'greeting': 'Hello, Pearson! You have 8 unread messages.',

}, {
  '_id': '66b35c398c3f15913f4c10cb',
  'name': {
    'first': 'Jane',
    'last': 'Simmons'
  },
  'company': 'GEOFORM',
  'email': 'jane.simmons@geoform.me',
  'phone': '+1 (990) 660-3948',
  'greeting': 'Hello, Simmons! You have 8 unread messages.',

}, {
  '_id': '76b35c398c3f15913f4c10cb',
  'name': {
    'first': 'John',
    'last': 'Doe'
  },
  'company': 'FLOTONIC',
  'email': 'john.doe@FLOTONIC.me',
  'phone': '+1 (995) 560-3948',
  'greeting': 'Hello, Doe! You have 8 unread messages.',

}, {
  '_id': '86b35c398c3f15913f4c10cx',
  'name': {
    'first': 'Alex',
    'last': 'Willson'
  },
  'company': 'HYPLEX',
  'email': 'alex.willson@hyplex.me',
  'phone': '+1 (990) 560-3959',
  'greeting': 'Hello, Willson! You have 8 unread messages.',

}];

@Injectable()
export default class Users {
  constructor() {

  }

  mapUserNames = (n) => {
    return {
        id: n._id,
        first: n.name.first,
        last: n.name.last
      };
  };
  
  getUserNames = () => {
    return R.map(this.mapUserNames)(mockData);
  };

  getUserById = (id: string) => {
    return R.find(R.propEq('_id', id))(mockData);

  };
  
  getCompanyNames = () => {
    return R.compose(R.uniq, R.pluck('company'))(mockData)
  };
  
  getUsersByCompany = (companyName) => {
    return R.map(
        this.mapUserNames,
        R.filter(R.propEq('company', companyName))(mockData);
  };
}
