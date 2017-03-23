const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/data/db/');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to db at /data/db/")
});

const User = require('./models/User');
const Game = require('./models/Game');
const Clip = require('./models/Clip');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Returns array of unique team names in database
app.get("/teams", (req, res) => {

  let teamsArr = [];

  Game.find().distinct("team0")
    .then(teams => {
      console.log(teams);
      teamsArr = teamsArr.concat(teams);

      Game.find().distinct("team1")
        .then(teams => {
          console.log(teams);
          teamsArr = teamsArr.concat(teams);
          res.json(teamsArr);
        })
        .catch(err => {
          console.log(err);
          res.json(err);
        })
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })

});

// Returns array of unique leagues in the database
app.get("/leagues", (req, res) => {

  Game.find().distinct("league")
    .then(leagues => {
      console.log(leagues);
      res.json(leagues);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })

});

// Get list of games.
// Returns an array of games.
app.get("/games", (req, res) => {

  // Game.find({team0: 'real madrid'})

  // Game.find({$and: [{$or: [{team0: 'b'}, {team1: 'b'}]}, {}])


  // Game.find({team0: })
  //   .then(games => {
  //     console.log(games);
  //     res.json(games);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.json(err);
  //   })

  Game.find().distinct("team0")
    .then(teams => {
      console.log(teams);
      res.json(teams);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })

  // Game.find({})
  //   .then(games => {
  //     console.log(games);
  //     res.json(games);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.json(err);
  //   })
});

// Create a game
app.post("/games/create", (req, res) => {
  const newGame = new Game(req.body);

  newGame.save()
    .then(game => {
      console.log(game);
      res.json(game);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })
});

// Get list of clips based on the "game_id" query string parameter in URL.
// Returns array of clips. Returns empty array if no clips associated to a game
app.get("/clips", (req, res) => {
  const gameId = req.query.game_id;

  Clip.find({ game_id: gameId })
    .then(clips => {
      console.log(clips);
      res.json(clips);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })

});

// Create a clip
app.post("/clips/create", (req, res) => {
  const newClip = new Clip(req.body);

  newClip.save()
    .then(clip => {
      console.log(clip);
      res.json(clip);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })
});

// Create a user
app.post("/users/create", (req, res) => {
  const newUser = new User(req.body);

  newUser.save()
    .then(user => {
      console.log(user);
      res.json(user);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })
});

// Seeing Data
// const seedUsers = require('./seeds/users');
// const seedGames = require('./seeds/games');
// const seedClips = require('./seeds/clips');
// seedUsers();
// seedGames();
// seedClips();


app.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
  console.log("Press CTRL + C to exit");
});