const User = require('../models/User');
const Game = require('../models/Game');


module.exports = () => {
    Game.find({}, (err, games) => {
        if (err) {
            console.log(err);
        } else if (games.length === 0) {
            User.find({}, (err, users) => {
                if (err) {
                    console.log(err);
                } else {
                    if (users.length < 2) {
                        console.log('Not enough users to use for seeding games. Need 2 minimum');
                    } else {
                        const gamesToSeed = [
                            {
                                team0: "Barcelona",
                                team0Logo: "https://www.seeklogo.net/wp-content/uploads/2014/07/fc-barcelona-logo.png",
                                team1: "Real Madrid",
                                team1Logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/732px-Real_Madrid_CF.svg.png",
                                league: "La Liga",
                                leagueLogo: "http://files.laliga.es/seccion_logos/laliga-h-1200x1200.png",
                                date: Date(),
                                user_id: users[0]._id
                            },
                            {
                                team0: "Barcelona",
                                team0Logo: "https://www.seeklogo.net/wp-content/uploads/2014/07/fc-barcelona-logo.png",
                                team1: "Paris SG",
                                team1Logo: "https://upload.wikimedia.org/wikipedia/en/e/e4/Paris_Saint-Germain_F.C..png",
                                league: "UEFA Champions League",
                                leagueLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/UEFA_Champions_League_logo_2.svg/1067px-UEFA_Champions_League_logo_2.svg.png",
                                date: Date(),
                                user_id: users[0]._id
                            },
                            {
                                team0: "Atlético Madrid",
                                team0Logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Atletico_Madrid_logo.svg/800px-Atletico_Madrid_logo.svg.png",
                                team1: "Real Madrid",
                                team1Logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/732px-Real_Madrid_CF.svg.png",
                                league: "La Liga",
                                leagueLogo: "http://files.laliga.es/seccion_logos/laliga-h-1200x1200.png",
                                date: Date(),
                                user_id: users[1]._id
                            }
                        ];
                        Game.collection.insert(gamesToSeed, (err, games) => {
                            console.log(games);
                            console.log("games seeded successfully");
                        })
                    }
                }
            })
        }
    })
}
