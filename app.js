var express = require("express");
var request = require('request');
var app = express();

// This is nessecary because express will get lazy, and only look at routes
// It wont actually look into static files, and will return 404 on stylesheets
app.use("/styles", express.static(__dirname + '/styles'));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/search', function(req, res){
  var query = req.query.searchTerm;
  var url = 'http://www.omdbapi.com/?s='+query;
  request(url, function (error, response, body) {
    if(!error){
      var data = JSON.parse(body);
      res.render('results.ejs', {movieList:data.Search});
    }
  });

});

app.listen(3000);



