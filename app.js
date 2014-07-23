var express = require("express");
var request = require("request");

var app = express();

app.use("/styles", express.static(__dirname + '/styles'));
  app.set('view engine', 'ejs');

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

app.listen(3000);

