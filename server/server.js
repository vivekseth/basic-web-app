const url = require('url');
const path = require('path');
const request = require('request');
const express = require('express');

const PRODUCTION = !!(process.env['PRODUCTION'])
const PORT = process.env.PORT || 3000;

const app = express();

// Static File Middleware 

app.use(express.static(path.join(__dirname, '../dist')));

// API Methods

// app.get('/api/hello', function(req, res) {
//     res.json({hello: "world"});
// });

app.get('/api/*', function(req, res) {
    const apiURL = 'https://swapi.co' + req.url;
    request(apiURL, function (error, response, body) {
      if (error) {
        res.json({error: error});
      }
      else {
        res.json(JSON.parse(body));
      }
    });
})

// Catch-All Route

if (PRODUCTION) {
    app.get('*', function (req, res) {
        res.sendFile('index.html', {root: './dist'});
    });
}

app.listen(PORT, function() {
    console.log('Example app listening on port '+PORT+'!\n');
});
