var express = require('express');
var stylus = require('stylus');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(stylus.middleware({
  src: __dirname + '/views/style', // .styl files are located in `views/stylesheets`
  dest: __dirname + '/public', // .styl resources are compiled `/stylesheets/*.css`
}));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


