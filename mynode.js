var express = require('express');

var app = express();

var controllers = require('./controllers/control.js');

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire the controllers
controllers(app);

app.listen(3000);

console.log("Listening...");