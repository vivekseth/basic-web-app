const url = require('url');
const path = require('path');
const request = require('request');
const express = require('express');
const jsonfile = require('jsonfile');

const PRODUCTION = !!(process.env['PRODUCTION'])
const PORT = process.env.PORT || 3000;
let CACHE_DIRTY = false;
let MEM_CACHE = jsonfile.readFileSync('cache.json');
setInterval(function() {
  if (CACHE_DIRTY) {
    console.log('Saved dirty cache')
    jsonfile.writeFileSync('cache.json', MEM_CACHE);
    CACHE_DIRTY = false;
  }
}, 1000)



const app = express();

// Static File Middleware 

app.use(express.static(path.join(__dirname, '../dist')));

// API Methods

// app.get('/api/hello', function(req, res) {
//     res.json({hello: "world"});
// });

app.get('/api/*', function(req, res) {
  const apiURL = 'https://swapi.co' + req.url;

  if (MEM_CACHE[apiURL]) {
    // console.log('✅ Cache Hit: ' + apiURL)
    res.json(MEM_CACHE[apiURL]);
  }
  else {
    request(apiURL, function (error, response, body) {
      if (error) {
        console.log('😖 Error: ' + apiURL)
        res.json({error: error});
      }
      else {
        console.log('❌ Cache Miss: ' + apiURL)
        var data = JSON.parse(body);
        MEM_CACHE[apiURL] = data;
        CACHE_DIRTY = true;
        res.json(data);
      }
    });
  }
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
