const User = require('../models/User');
const usersToSeed = [
    {firstName: 'Umar', lastName: 'Khan', username: 'umar-khan', email: 'umarkhan1@gmail.com', password: 'secretpass', profilePictureUrl: 'http://www.shockmansion.com/wp-content/myimages/2016/03/rr231.jpg'},
    {firstName: 'Bob', lastName: 'Doe', username: 'bob-doe', email: 'bob-doe@gmail.com', password: 'secretpass1', profilePictureUrl: 'https://lh6.ggpht.com/DcbOYdaNmHBKDsMBXPWy9AXS7h6XbJ4U53ymUwkAAelCQfAJO5QkHnLar0zuiWW1WmI=w300'}
] 

module.exports = () => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err)
        } else {
            if (users.length === 0) {
                User.collection.insert(usersToSeed, (err, users) => {
                    console.log(users);
                    console.log("Successfully seeded users");
                })
            }
        }
    })
}