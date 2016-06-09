'format es6'; // force SystemJS to transpile exercise
import { fromJS } from 'immutable';

const data = fromJS([
  {
    "_id": "56e18ce608c0a0190da963f8",
    "index": 0,
    "guid": "5e0dbf88-33f1-4b84-bdca-ac21719bf0e8",
    "isActive": false,
    "balance": "$1,284.82",
    "picture": "http://placehold.it/32x32",
    "age": 36,
    "eyeColor": "blue",
    "name": {
      "first": "Lauren",
      "last": "Stanley"
    },
    "company": "HAIRPORT",
    "email": "lauren.stanley@hairport.name",
    "phone": "+1 (876) 425-2958",
    "address": "456 Front Street, Wacissa, Virginia, 9236",
    "about": "Dolor aliqua enim irure mollit. Sunt ullamco laborum reprehenderit labore. Eu consequat laborum consectetur voluptate laborum fugiat quis tempor amet nulla. Irure duis reprehenderit irure officia sit magna deserunt. Incididunt eu aliquip proident id amet enim dolor reprehenderit ut ipsum est elit ea.",
    "registered": "Friday, August 8, 2014 4:08 PM",
    "latitude": "41.628375",
    "longitude": "104.950835",
    "tags": [
      7,
      "veniam"
    ],
    "range": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "friends": [
      3,
      {
        "id": 1,
        "name": "Mccall Petersen"
      }
    ],
    "greeting": "Hello, Lauren! You have 9 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "56e18ce6dc7d5ade1e3c7889",
    "index": 1,
    "guid": "7ceca65c-cc8d-4f88-ab00-b5d00b72e27f",
    "isActive": true,
    "balance": "$1,423.68",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "brown",
    "name": {
      "first": "Schmidt",
      "last": "Floyd"
    },
    "company": "ANIXANG",
    "email": "schmidt.floyd@anixang.org",
    "phone": "+1 (913) 595-3119",
    "address": "274 Norfolk Street, Freeburn, Nevada, 1869",
    "about": "Exercitation deserunt quis commodo ad qui aliqua proident mollit labore mollit. Deserunt occaecat in pariatur mollit aute consequat reprehenderit in deserunt magna ad. Aliquip labore do mollit officia laboris in aliquip magna aliqua. Sunt occaecat eiusmod ea amet dolore consectetur aute consequat adipisicing et nisi fugiat. Aute eiusmod quis duis ipsum occaecat culpa eiusmod Lorem amet laborum occaecat adipisicing minim. Labore exercitation laborum sint enim veniam labore officia. Aliquip do esse consectetur amet.",
    "registered": "Sunday, October 12, 2014 8:17 AM",
    "latitude": "-3.271053",
    "longitude": "-124.321634",
    "tags": [
      7,
      "veniam"
    ],
    "range": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "friends": [
      3,
      {
        "id": 1,
        "name": "Mccall Petersen"
      }
    ],
    "greeting": "Hello, Schmidt! You have 9 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "56e18ce603784459df38b06c",
    "index": 2,
    "guid": "b19ffa1d-ca97-4e94-809e-3bf82df7fd40",
    "isActive": true,
    "balance": "$2,420.16",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "eyeColor": "blue",
    "name": {
      "first": "Jane",
      "last": "Wheeler"
    },
    "company": "DIGINETIC",
    "email": "jane.wheeler@diginetic.co.uk",
    "phone": "+1 (826) 545-3381",
    "address": "385 Morgan Avenue, Manila, Puerto Rico, 8503",
    "about": "Dolore velit dolor exercitation non voluptate cillum aliquip excepteur. Eiusmod mollit et nostrud pariatur amet reprehenderit deserunt elit ex. Do adipisicing qui pariatur cupidatat ut sint proident incididunt ipsum. Reprehenderit aliquip elit labore mollit consequat ipsum est sunt culpa. Est incididunt qui ea incididunt. Exercitation pariatur laborum sit occaecat sint ea eiusmod et Lorem amet in magna elit. Eu veniam eu qui laborum eiusmod esse ullamco ipsum proident exercitation et exercitation officia.",
    "registered": "Saturday, July 4, 2015 9:47 PM",
    "latitude": "-5.955075",
    "longitude": "37.129517",
    "tags": [
      7,
      "veniam"
    ],
    "range": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "friends": [
      3,
      {
        "id": 1,
        "name": "Mccall Petersen"
      }
    ],
    "greeting": "Hello, Jane! You have 10 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "56e18ce6adf25f0905c47a64",
    "index": 3,
    "guid": "d9547c25-8437-48d3-b3d6-ef890343b843",
    "isActive": false,
    "balance": "$2,059.14",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "eyeColor": "green",
    "name": {
      "first": "Brennan",
      "last": "Santos"
    },
    "company": "SPEEDBOLT",
    "email": "brennan.santos@speedbolt.com",
    "phone": "+1 (964) 417-3448",
    "address": "327 Bills Place, Strong, Maryland, 4414",
    "about": "Et dolor sit eiusmod eu labore velit. Laboris veniam consequat eiusmod aliqua ex in adipisicing deserunt quis eiusmod ullamco ut reprehenderit. Velit reprehenderit elit cupidatat laborum consequat ipsum quis consequat dolor magna sit nostrud. Laborum et minim irure ad elit dolore eu amet. Esse elit ex officia sit culpa pariatur nostrud anim sint nostrud culpa eiusmod non qui. Cupidatat ea dolor dolor ea pariatur et deserunt consequat est incididunt sit voluptate ipsum nostrud. Elit quis deserunt est in qui sunt nulla ut.",
    "registered": "Thursday, June 5, 2014 2:35 AM",
    "latitude": "22.827405",
    "longitude": "-50.704291",
    "tags": [
      7,
      "veniam"
    ],
    "range": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "friends": [
      3,
      {
        "id": 1,
        "name": "Mccall Petersen"
      }
    ],
    "greeting": "Hello, Brennan! You have 9 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "56e18ce671021dc16753b56d",
    "index": 4,
    "guid": "725fb6f9-d900-4764-8f41-7fe2779b2dc9",
    "isActive": false,
    "balance": "$2,399.10",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "blue",
    "name": {
      "first": "Perez",
      "last": "Turner"
    },
    "company": "CENTICE",
    "email": "perez.turner@centice.us",
    "phone": "+1 (855) 446-3306",
    "address": "596 Varick Street, Genoa, Arkansas, 6957",
    "about": "Veniam est dolor laboris eiusmod. Nostrud duis est nostrud aliquip in laborum qui culpa. Sunt mollit adipisicing amet laboris esse.",
    "registered": "Monday, September 8, 2014 11:25 PM",
    "latitude": "23.65985",
    "longitude": "-65.321713",
    "tags": [
      7,
      "veniam"
    ],
    "range": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ],
    "friends": [
      3,
      {
        "id": 1,
        "name": "Mccall Petersen"
      }
    ],
    "greeting": "Hello, Perez! You have 5 unread messages.",
    "favoriteFruit": "banana"
  }
]);

// Generate the result using data's immutable methods
const result = fromJS({});

document.getElementById('code').innerText = JSON.stringify(result.toJS(), null, 2);
