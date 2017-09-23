const url = require('url');
const path = require('path');
const request = require('request');
const express = require('express');

const app = express();

// Static File Middleware 

app.use('/static', express.static(path.join(__dirname, '../dist')));

// API Methods

app.get('/hello', function(req, res) {
    res.send('hello\n');
})

// Catch-All Route

app.get('*', function (req, res) {
    res.sendFile('app.html', {root: './dist'});
});

PORT = 3000;
app.listen(3000, function() {
    console.log('Example app listening on port '+PORT+'!\n');
});
