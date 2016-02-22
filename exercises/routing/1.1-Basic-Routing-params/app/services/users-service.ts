import {Injectable} from 'angular2/core';
import * as R from 'Ramda';
const mockData = [{
  '_id': '56b35c39533e5e7b8765c36b',
  'index': 0,
  'guid': 'add678e0-1434-4cf5-879f-18a7c934f8cf',
  'isActive': false,
  'balance': '$3,386.93',
  'picture': 'http://placehold.it/32x32',
  'age': 30,
  'eyeColor': 'green',
  'name': {
    'first': 'Courtney',
    'last': 'Parrish'
  },
  'company': 'GEOFORM',
  'email': 'courtney.parrish@geoform.biz',
  'phone': '+1 (987) 539-3825',
  'address': '958 Atkins Avenue, Mulino, Tennessee, 1592',
  'about': 'Non dolor velit irure id Lorem. Est veniam magna tempor occaecat sint cillum esse in exercitation sit tempor laboris ut. Mollit mollit magna reprehenderit nisi cillum exercitation cupidatat. Eiusmod eu commodo excepteur minim ut velit dolor aute amet reprehenderit minim nostrud elit.',
  'registered': 'Saturday, August 2, 2014 4:40 PM',
  'latitude': '-37.689027',
  'longitude': '-119.645104',
  'tags': [7, 'laborum'],
  'range': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  'friends': [3, {
    'id': 1,
    'name': 'Morgan Humphrey'
  }],
  'greeting': 'Hello, Courtney! You have 7 unread messages.',
  'favoriteFruit': 'banana'
}, {
  '_id': '56b35c390c3b50a98464d9bf',
  'index': 1,
  'guid': '5bdd2bf2-87cf-4c91-8c6f-21c9c9bf7896',
  'isActive': true,
  'balance': '$2,844.87',
  'picture': 'http://placehold.it/32x32',
  'age': 34,
  'eyeColor': 'brown',
  'name': {
    'first': 'Iva',
    'last': 'Gamble'
  },
  'company': 'FLOTONIC',
  'email': 'iva.gamble@flotonic.org',
  'phone': '+1 (981) 515-3628',
  'address': '510 Troutman Street, Glidden, South Dakota, 4883',
  'about': 'Et minim nisi proident deserunt anim non. Commodo id tempor et labore non amet labore irure. Reprehenderit reprehenderit labore dolor ad consequat et sit cupidatat laboris Lorem exercitation esse. Ut aute eu eu dolor cillum exercitation aliqua. Anim incididunt est nisi nulla cillum minim labore ullamco anim. Id labore enim labore fugiat eu non est ut culpa. Aute veniam eu aliqua esse reprehenderit duis eiusmod ad deserunt ipsum pariatur quis.',
  'registered': 'Tuesday, September 8, 2015 2:13 AM',
  'latitude': '15.395491',
  'longitude': '-109.60589',
  'tags': [7, 'laborum'],
  'range': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  'friends': [3, {
    'id': 1,
    'name': 'Morgan Humphrey'
  }],
  'greeting': 'Hello, Iva! You have 8 unread messages.',
  'favoriteFruit': 'strawberry'
}, {
  '_id': '56b35c398c3f15913f4c10cb',
  'index': 2,
  'guid': 'c22f6c40-2f84-4723-96ed-324c82942277',
  'isActive': false,
  'balance': '$2,123.63',
  'picture': 'http://placehold.it/32x32',
  'age': 32,
  'eyeColor': 'brown',
  'name': {
    'first': 'Pearson',
    'last': 'Johns'
  },
  'company': 'HYPLEX',
  'email': 'pearson.johns@hyplex.me',
  'phone': '+1 (990) 560-3948',
  'address': '970 Polar Street, Logan, West Virginia, 2615',
  'about': 'Qui ex voluptate cupidatat minim exercitation aute consectetur consequat exercitation Lorem duis ipsum. Incididunt occaecat excepteur reprehenderit nulla irure nulla adipisicing ea ea occaecat officia voluptate anim. Sunt occaecat sunt exercitation ipsum magna. Deserunt aliqua non ea sint commodo nostrud occaecat est.',
  'registered': 'Wednesday, November 26, 2014 3:37 AM',
  'latitude': '-41.486424',
  'longitude': '-166.075973',
  'tags': [7, 'laborum'],
  'range': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  'friends': [3, {
    'id': 1,
    'name': 'Morgan Humphrey'
  }],
  'greeting': 'Hello, Pearson! You have 8 unread messages.',
  'favoriteFruit': 'banana'
}];

@Injectable()
export default class Users {
  constructor() {

  }

  getUserNames = () => {
    return R.map(n => {
      return {
        id: n._id,
        first: n.name.first,
        last: n.name.last
      }
    })(mockData);
  };

  getUserById = (id: string) => {
    return R.find(R.propEq('_id', id))(mockData) || {};

  };
  
  getCompanyNames = () => {
    return R.compose(R.uniq, R.pluck('company'))(mockData)
  }
}