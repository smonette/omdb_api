var express = require('express');
  bodyParser = require('body-parser');
  methodOverride = require('method-override');
  app = express();
  request = require("request");

var app = express();

var faves = [];

app.use("/styles", express.static(__dirname + '/styles'));
  app.set('view engine', 'ejs');
    // middlewear for parsing for data
  // looks at body of response
  app.use(bodyParser.urlencoded());

  //middlewear to handle post requests
  // for PUT and DELETE
  app.use(methodOverride("_method"))


app.get('/', function(req, res){
  res.render('site/index');
});

app.get('/search', function (req, res) {
    var query = req.query.searchTerm;
    var url = "http://www.omdbapi.com/?s=" + query;
    request(url, function (error, response, body) {
        if (!error) {
            var data = JSON.parse(body);
            res.render("site/results", {movieList: data.Search || []});
        } 
    });
});

app.get('/movies/:id', function (req, res) {
    var filmId = req.params.id;
    var url = "http://www.omdbapi.com/?i=" + filmId;
    request(url, function (error, response, body) {
        if (!error) {
            var data = JSON.parse(body);
            res.render("movies/index", {details: data || []});
        }
    });
});

app.post('/later', function(req, res){
  faves.push(req.body.details);
  res.render('site/later', {faves: faves});
});







app.listen(3000);

