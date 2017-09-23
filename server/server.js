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

app.get('/api/hello', function(req, res) {
    res.json({hello: "world"});
});

// Catch-All Route

if (PRODUCTION) {
    app.get('*', function (req, res) {
        res.sendFile('index.html', {root: './dist'});
    });
}

app.listen(PORT, function() {
    console.log('Example app listening on port '+PORT+'!\n');
});
