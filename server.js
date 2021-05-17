var express = require("express");
var app = express();
var path = require("path");
const PORT = process.env.PORT || 3000;

var longpoll = require("express-longpoll")(app);
// var longpollWithDebug = require("express-longpoll")(app, { DEBUG: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('static'));
app.use(express.static('static/css'));
app.use(express.static('static/images'));
app.use(express.static('static/libs'));

longpoll.create("/poll");

app.post("/bt", function (req, res) {
    console.log(req.body)
    var data = req.body;
    setInterval(function () {
        if (messages.length >= 1) {
            let message = messages.shift()
            longpoll.publish("/poll", data)
        }
    }, 100)
    res.end();
})

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"));
});

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});