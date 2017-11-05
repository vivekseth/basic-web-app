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

function _apiHandler(err, data, req, res) {
  if (err) {
    console.log('api error:', err);
    res.json({
      success: false,
      data: null,
      error: err
    });
  }
  else {
    res.json({
      success: true,
      data: data,
    });
  }
}

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
  const charactersSQL = 
    `select 
      characters.character_id, 
      characters.name
    from 
      favorites
    inner join
      characters
    on
      characters.character_id = favorites.id
    where 
      favorites.type = 'character'
      and favorites.username = ?
    order by
      characters.character_id;`

 const filmsSQL = `
    select 
      films.film_id, 
      films.episode_id, 
      films.title
    from 
      favorites
    inner join
      films
    on
      films.film_id = favorites.id
    where 
      favorites.type = 'film'
      and favorites.username = ?
    order by
      films.film_id;`

  if (!req.user) {
    return _apiHandler(true, null, req, res);
  }

  db.all(charactersSQL, req.user.username, function(errCharacters, characters) {
    if (errCharacters) {
      return _apiHandler(errCharacters, null, req, res);
    }
    db.all(filmsSQL, req.user.username, function(errFilms, films) {
      if (errFilms) {
        return _apiHandler(errFilms, null, req, res);
      }
      const data = {
        characters: characters,
        films: films
      }
      _apiHandler(null, data, req, res);
    });
  });
})

app.get('/api/films', function(req, res) {
  db.all('select * from films order by film_id;', function(err, rows){
    _apiHandler(err, rows, req, res);
  });
})

app.get('/api/films/:film_id', function(req, res) {
  db.all('select * from films where film_id = ? LIMIT 1;', req.params.film_id, function(err, row){
    _apiHandler(err, rows, req, res);
  });
})

app.get('/api/characters', function(req, res) {
  db.all('select * from characters order by character_id;', function(err, rows){
    _apiHandler(err, rows, req, res);
  });
})

app.get('/api/characters/:character_id', function(req, res) {
  db.all('select * from characters where character_id = ? LIMIT 1;', req.params.character_id, function(err, row){
    _apiHandler(err, rows, req, res);
  });
})

app.get('/api/pages/films_list', function(req, res) {
  db.all('select film_id, episode_id, title from films order by film_id;', function(err, rows){
    _apiHandler(err, rows, req, res);
  });
});

app.get('/api/pages/characters_list', function(req, res) {
  db.all('select character_id, name from characters order by character_id;', function(err, rows){
    _apiHandler(err, rows, req, res);
  });
});

app.get('/api/pages/film_detail/:film_id', function(req, res) {
  const sql = 'select characters.character_id, name from characters inner join film_characters on characters.character_id = film_characters.character_id where film_characters.film_id = ? order by characters.character_id;'
  db.all(sql, req.params.film_id, function(err, rows){
    if (err) {
      _apiHandler(err, null, req, res);
    }
    else {
      const characters = rows;
      db.get('select title, director, producer, release_date, opening_crawl from films where film_id = ?;', req.params.film_id, function(err, row){      
        var filmDetails = row;
        if (filmDetails) {
          filmDetails['characters'] = characters;
        }
        _apiHandler(err, filmDetails, req, res);
      });
    }
  });
});

app.get('/api/pages/character_detail/:character_id', function(req, res) {
  const sql = 'select films.film_id, title from films inner join film_characters on films.film_id = film_characters.film_id where film_characters.character_id = ? order by films.film_id;'
  db.all(sql, req.params.character_id, function(err, rows){
    if (err) {
      _apiHandler(err, rows, req, res);
    }
    else {
      const films = rows;
      db.get('select * from characters where character_id = ?;', req.params.character_id, function(err, row){        
        const characterDetails = row;
        if (characterDetails) {
          characterDetails['films'] = films;
        }
        _apiHandler(err, characterDetails, req, res);
      });
    }
  });
});



app.post('/login', function(req, res) {
  const loginPath = PRODUCTION ? '/login' : '/#/login'
  const data = { successRedirect: '/', failureRedirect: loginPath };
  passport.authenticate('local', data)(req, res);
});

app.post('/register', function(req, res) {
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
