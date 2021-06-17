var express = require('express');
var app = express();
app.get("/", function(req, res) {
    res.send("Welcome Wanderlust");
});

var userManager = require("./userManager");
var Blog = require("./blog");

userManager(app);
Blog(app);

var port=3000;
app.listen(port, function(){
    console.log(`Run: 127.0.0.1:${port}`);
});
//module.exports = app;
