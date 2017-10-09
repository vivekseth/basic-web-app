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
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

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

var db = new sqlite3.Database('./database.db', sqlite3.OPEN_READWRITE);

const _validateCredentials = (username, password, callback) => {
  db.get('select * from users where username = ?;', username, function(err, row){
    if (row) {
      const hash = row.hash;
      bcrypt.compare(password, hash, function(err, res) {
        callback(res);
      });
    }
    else {
      callback(false);
    }
  });
}

const _registerUser = (username, password, callback) => {
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      callback(false);
    }
    else {
      db.run("INSERT INTO users (username, hash) VALUES (?, ?)", username, hash, function(err) {
        if (err) {
          callback(false);
        }
        else {
          if (this.changes <= 0) {
            callback(false);
          }
          else {
            callback(true);
          }
        }
      });
    }
  });
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    _validateCredentials(username, password, function(success){
      if (success) {
        done(null, {username: username});
      }
      else {
        done(null, false);
      }
    })
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


// TODO(vivek): refactor the API handlers to re-use common code. 
app.get('/api/films', function(req, res) {
  db.all('select * from films order by film_id;', function(err, rows){
    if (err) {
      console.log(err);
      res.json({
        success: false,
        data: null,
      });
    }
    else {
      res.json({
        success: true,
        data: rows,
      });
    }
  });
})

app.get('/api/films/:film_id', function(req, res) {
  db.all('select * from films where film_id = ? LIMIT 1;', req.params.film_id, function(err, row){
    if (err) {
      console.log(err);
      res.json({
        success: false,
        data: null,
      });
    }
    else {
      res.json({
        success: true,
        data: row,
      });
    }
  });
})

app.get('/api/characters', function(req, res) {
  db.all('select * from characters order by character_id;', function(err, rows){
    if (err) {
      console.log(err);
      res.json({
        success: false,
        data: null,
      });
    }
    else {
      res.json({
        success: true,
        data: rows,
      });
    }
  });
})

app.get('/api/characters/:character_id', function(req, res) {
  db.all('select * from characters where character_id = ? LIMIT 1;', req.params.character_id, function(err, row){
    if (err) {
      console.log(err);
      res.json({
        success: false,
        data: null,
      });
    }
    else {
      res.json({
        success: true,
        data: row,
      });
    }
  });
})


app.get('/api/pages/films_list', function(req, res) {
  db.all('select film_id, episode_id, title from films order by film_id;', function(err, rows){
    if (err) {
      console.log(err);
      res.json({
        success: false,
        data: null,
      });
    }
    else {
      res.json({
        success: true,
        data: rows,
      });
    }
  });
});

app.get('/api/pages/characters_list', function(req, res) {
  db.all('select character_id, name from characters order by character_id;', function(err, rows){
    if (err) {
      console.log(err);
      res.json({
        success: false,
        data: null,
      });
    }
    else {
      res.json({
        success: true,
        data: rows,
      });
    }
  });
});

app.get('/api/pages/films_detail/:film_id', function(req, res) {
  function handleError(error) {
    console.log(error);
    res.json({
      success: false,
      data: null,
      error: error
    });
  }

  function handleSuccess(data) {
    res.json({
      success: true,
      data: data,
    });
  }

  const sql = 'select characters.character_id, name from characters inner join film_characters on characters.character_id = film_characters.character_id where film_characters.film_id = ? order by characters.character_id;'
  db.all(sql, req.params.film_id, function(err, rows){
    if (err) {
      return handleError(err)
    }
    const characters = rows;
    db.get('select title, director, producer, release_date, opening_crawl from films where film_id = ?;', req.params.film_id, function(err, row){
      if (err) {
        return handleError(err)
      }
      
      const filmDetails = row;
      filmDetails['characters'] = characters;
      return handleSuccess(filmDetails);
    });
  });
});




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

app.post('/register', function(req, res) {
  console.log('REGISTER');
  console.log(req.body);

  _registerUser(req.body.username, req.body.password, function(success){
    if (success) {
      res.send('registration successful!');
    }
    else {
      res.send('error, user already exists');
    }
  })
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
