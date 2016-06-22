# Maps are Iterable

Maps in Immutable.js are _iterable_, meaning that you can `map`, `filter`, `reduce`, etc. each key-value pair in the map.

```typescript
let features = Immutable.Map<string, boolean>({
	'send-links': true,
	'send-files': true,
	'local-storage': true,
	'mirror-notifications': false,
	'api-access': false
});

let myFeatures = features.reduce((providedFeatures, provided, feature) => {
	if(provided)
		providedFeatures.push(feature);

  return providedFeatures;
}, []);

console.log(myFeatures); // [ 'send-links', 'send-files', 'local-storage' ]
```

```typescript
const mapMap = Immutable.Map({ a: 0, b: 1, c: 2 });
mapMap.map(i => i * 30);

const mapFilter = Immutable.Map({ a: 0, b: 1, c: 2 });

mapFilter.filter(i => i % 2);

const mapReduce = Immutable.Map({ a: 10, b: 20, c: 30 });

mapReduce.reduce((acc, i) => acc + i, 0);
```

