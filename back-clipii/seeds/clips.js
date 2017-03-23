const User = require('../models/User');
const Game = require('../models/Game');
const Clip = require('../models/Clip');


module.exports = () => {
    Clip.find({}, (err, clips) => {
        if (err) {
            console.log(err);
        } else if (clips.length === 0) {
            Game.find({}, (err, games) => {
                if (err) {
                    console.log(err);
                } else {
                    if (games.length < 2) {
                        console.log('Not enough games to use for seeding clips. Need 2 minimum');
                    } else {

                        User.find({}, (err, users) => {
                            if (err) {
                                console.log(err);
                            } else {
                                if (users.length < 2) {
                                    console.log('Not enough users to use for seeding clips. Need 2 minimum');
                                } else {
                                    const clipsToSeed = [
                                        {
                                            minute: 34,
                                            url: "https://u.nya.is/xvqbwx.mp4",
                                            game_id: games[0]._id,
                                            user_id: users[0]._id
                                        },
                                        {
                                            minute: 52,
                                            url: "https://u.nya.is/qwzosf.mp4",
                                            game_id: games[0]._id,
                                            user_id: users[1]._id
                                        },
                                        {
                                            minute: 88,
                                            url: "https://u.nya.is/uzmyen.mp4",
                                            game_id: games[1]._id,
                                            user_id: users[0]._id
                                        }
                                    ];
                                    Clip.collection.insert(clipsToSeed, (err, clips) => {
                                        console.log(clips);
                                        console.log("clips seeded successfully");
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }
    })
}
