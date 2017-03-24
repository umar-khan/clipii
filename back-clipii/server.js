const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require("request");
const cheerio = require("cheerio");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/data/db/');
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to db at /data/db/")
});

// Import DB Models
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
          res.json(teamsArr.sort());
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
      res.json(leagues.sort());
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })

});

// Get list of games.
// Returns an array of games.
app.get("/games", (req, res) => {

  console.log("hit game endpoint");



  if (req.query.team !== "all" && req.query.league !== "all") {
    Game.find({
      $and: [
        { $or: [{ team0: req.query.team }, { team1: req.query.team }] },
        { league: req.query.league }
      ]
    })
      .sort("-createdAt")
      .then(games => {
        console.log(games);
        res.json(games);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  } else if (req.query.team !== "all") {
    Game.find({ $or: [{ team0: req.query.team }, { team1: req.query.team }] }).sort("-createdAt")
      .then(games => {
        console.log(games);
        res.json(games);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  } else if (req.query.league !== "all") {
    Game.find({ league: req.query.league }).sort("-createdAt")
      .then(games => {
        console.log(games);
        res.json(games);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  } else {
    Game.find({}).sort("-createdAt")
      .then(games => {
        console.log(games);
        res.json(games);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  }


  console.log(req.query);

});

app.get("/games/:gameId", (req, res) => {

  console.log(req.params.gameId);


  Game.find({ _id: req.params.gameId })
    .sort("-createdAt")
    .then(games => {
      console.log(games);
      res.json(games);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    })

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
app.get("/clips/:gameId", (req, res) => {
  const gameId = req.params.gameId;

  Clip.find({ game_id: gameId }).sort("minute")
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
  console.log(typeof newClip.url);
  let src = "http:";
  let type = "";


  if (newClip.url.indexOf("streamable.com") > -1) {

    request(newClip.url, function (error, response, body) {
      if (!error) {

        let $ = cheerio.load(body);


        $('video').each(function () {
          src = src + $(this).children("source").attr("src");
          newClip.url = src;
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


      } else {
        console.log("We've encountered an error: " + error);
      }
    });

  } else {

    newClip.save()
      .then(clip => {
        console.log(clip);
        res.json(clip);
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      })
  }
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