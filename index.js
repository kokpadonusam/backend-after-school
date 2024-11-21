const express = require("express");
const app = express();

app.use(function (req, res, next) {
    console.log(req.url);
    next()
})

app.listen(process.env.PORT || 3005)

app.use(express.static('public'));

app.get("/lesson/", (req, res) => {
    res.json([
        { subject: "Math", location: "Room 101", price: 100, spaces: 5, icon: "fas fa-calculator" },
        { subject: "English", location: "Room 102", price: 80, spaces: 5, icon: "fas fa-book" },
        { subject: "Science", location: "Lab 1", price: 120, spaces: 5, icon: "fas fa-flask" },
        { subject: "History", location: "Room 103", price: 90, spaces: 5, icon: "fas fa-landmark" },
        { subject: "Art", location: "Studio A", price: 110, spaces: 5, icon: "fas fa-palette" },
        { subject: "Music", location: "Music Room", price: 95, spaces: 5, icon: "fas fa-music" },
        { subject: "Physics", location: "Lab 2", price: 130, spaces: 5, icon: "fas fa-atom" },
        { subject: "Chemistry", location: "Lab 3", price: 125, spaces: 5, icon: "fas fa-vials" },
        { subject: "Geography", location: "Room 104", price: 85, spaces: 5, icon: "fas fa-globe" },
        { subject: "Physical Education", location: "Gym", price: 75, spaces: 5, icon: "fas fa-dumbbell" }
    ])
})