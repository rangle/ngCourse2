'format es6'; // force SystemJS to transpile

// Utilities
function write(...args) {
  const element = document.getElementById('example');
  element.innerHTML += args.reduce((prev, curr) => prev + ' ' + curr, '');
}

// Exercise A
class UserRecord {
  firstName: string;
  lastName: string;
  email: string;
}

const user: UserRecord = {
  firstName: 'pat',
  lastName: 'demonstrator',
  email: 'pat.d@i-love-ts.org'
};

write(user.firstName, user.lastName);

interface SaveRecord {
  (user: UserRecord): boolean;
}

// implement saveRecord
const saveRecord: SaveRecord = ;

// Exercise B
interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

// assign a valid Point3D to position
const position: Point3D = ;


// Exercise C
type stringOrArray = string | string[];

interface StringOrArrayFn {
  (data: stringOrArray): void;
}

// write an interface for this function
const writeAnInterfaceForThisFunction: StringOrArrayFn = (data) => {
  let array: string[];
  if (Array.isArray(data)) {
    array = data;
  } else {
    array = [data];
  }
  write.apply(null, array);
};

writeAnInterfaceForThisFunction(['says:', '"hello', 'world,']);
writeAnInterfaceForThisFunction('goodbye');


// Exercise D add a type signature to this function
function accessor(db, key, value, callback) {
  let cb;
  if (typeof callback === 'function') {
    cb = callback;
  } else if (callback === undefined && typeof value === 'function') {
    cb = value;
  } else {
    throw new TypeError('accessor requires a callback');
  }

  if (typeof value !== 'function') {
    db[key] = value;
  }

  if (db[key] === undefined) {
    setTimeout(() => cb(new Error('not found')), 0);
  } else {
    setTimeout(() => cb(null, db[key]), 0);
  }
}

const db = { someId: 'see you soon,' };

accessor(db, 'someId', (err, data) => {
  if (err) { throw err; }
  write(data);

  accessor(db, 'someId', 'we will be back"', (err, data) => {
    if (err) { throw err; }
    write(data);
  });
});

