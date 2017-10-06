const url = require('url');
const path = require('path');
const request = require('request');
const express = require('express');
const jsonfile = require('jsonfile');

const session = require("express-session");
const bodyparser = require('body-parser');

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const ensureLoggedIn = require('connect-ensure-login');

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

// User Authentication

var userDB = {'hello': {
  'password': 'world'
}}

const _validateCredentials = (username, password) => {
  if (userDB[username]) {
    const userData = userDB[username];
    return userData['password'] === password;
  }
  else {
    return false;
  }
}

const _registerUser = (username, password) => {
  if (!userDB[username]) {
    userDB[username] = {
      'password': password,
    }
    return true;
  }
  else {
    return false;
  }
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (_validateCredentials(username, password)) {
      done(null, {username: username});
    }
    else {
      done(null, false);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(userid, done) {
  done(null, {username: userid});
});


// serve static files from ../dist
app.use(express.static(path.join(__dirname, '../dist')));

// parse form http requests
app.use(bodyparser.urlencoded({ extended: true }));

// user auth middleware
app.use(session({
  secret: 'sooper seecrit seshun kee',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// API Methods

// app.get('/api/hello', function(req, res) {
//     res.json({hello: "world"});
// });

app.get('/api/user', function(req, res) {
  if (req.user) {
    res.json({
      success: true,
      data: req.user,
    });
  }
  else {
    res.json({
      success: false,
      data: null,
    });
  }
});

app.get('/api/user/favorites', function(req, res) {
  if (req.user) {
    res.json({
      success: true,
      data: [],
    });
  }
  else {
    res.json({
      success: false,
      data: null,
    });
  }
})

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

const loginPath = PRODUCTION ? '/login' : '/#/login'
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: loginPath }));

// app.post('/login', function(req, res) {
//   console.log('LOGIN');
//   console.log(req.body);

//   if (_validateCredentials(req.body.username, req.body.password)) {
//     res.send('valid credentials!');
//   }
//   else {
//     res.send('INVALID credentials!'); 
//   }
// });

app.post('/register', function(req, res) {
  console.log('REGISTER');
  console.log(req.body);

  if (_registerUser(req.body.username, req.body.password)) {
    res.send('registration successful!');
  }
  else {
    res.send('error, user already exists');
  }
});

// Catch-All Route

app.post('/', function (req, res) {
    res.sendFile('index.html', {root: './dist'});
});


if (PRODUCTION) {
    app.get('*', function (req, res) {
        res.sendFile('index.html', {root: './dist'});
    });
}

app.listen(PORT, function() {
    console.log('Example app listening on port '+PORT+'!\n');
});
