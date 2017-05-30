var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var helmet = require("helmet");


const port = 3000;


app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
    res.render("home.html");
})

app.listen(port);


console.log('todo list RESTful API server started on: ' + port);



