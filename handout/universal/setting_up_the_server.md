# Setting Up the Server

For this example we'll be using Express as our server. Though you can use any server that allows you to use a custom template rendering engine, Express is one of the easiest to use. 

To set up Express to use the Angular2 rendering engine all we need to do is import the module, and pass in the `ng2engine`.

```
var universal = require('modules/universal');
var app = express();

app.engine('.ng2.html', universal.ng2engine);
app.set('view engine', 'ng2.html');
```

Now any files with the `.ng2.html` extension will be served using the `ng2engine` engine. 

