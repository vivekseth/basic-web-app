const url = require('url');
const path = require('path');
const request = require('request');
const express = require('express');

const app = express();

app.use('/static', express.static(path.join(__dirname, '../dist')));

app.get('*', function (req, res) {
    res.sendFile('app.html', {root: './dist'});
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!\n');
});
