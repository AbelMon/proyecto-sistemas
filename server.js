var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var helmet = require("helmet");

var Sequelize = require("sequelize");

var mailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

const pg = require("pg");
const port = 3000;
const connectionString = "postgres://postgres:admin@localhost:5432/SUSCRIPTORES";
const responseMessages = require("./models/responseModel");

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));


app.get("/", function(req, res) {
    res.render("home.html");
});


var sendMail = function(email) {
    

    // Use Smtp Protocol to send Email
    var transport = mailer.createTransport(smtpTransport({
        service: "Gmail",
        auth: {
            type: "OAuth2",
            user: "m.a.technologies.oficial@gmail.com",
            pass: "23041990"
        }
    }));

    var mail = {
        from: "m.a.technologies.oficial@gmail.com",
        to: email,
        subject: "Registro",
        text: "Ahora estás registrado en M/A Tech",
        html: "<p>Ahora estás registrado en M/A Tech</p><b>Lo mejor en tecnología.</b>"
    }

    transport.sendMail(mail, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        transport.close();
    });
}



app.post("/user", (req, res, next) => {


    console.log(req.body);
    pg.connect(connectionString, (err, client, done) => {
        function handleError(err) {
            if (!err) {
                return false;
            }

            if (client) {
                done(client);
            }

            next(err);

            return true;
        };


        if (handleError(err)) return;

        var name = req.body.name;
        var email = req.body.email;
        var lastName = req.body.lastName;

        var sqlStatement = 'INSERT INTO "USUARIOS"("NOMBRE","EMAIL","APELLIDOS") VALUES($1,$2,$3)';
        var params = [name, email, lastName]

        client.query(sqlStatement, params, function(err1, result1) {
            if (handleError(err1)) {
                res.status(responseMessages.getUserExistErrorMsg().status).send(responseMessages.getUserExistErrorMsg());
                return;
            }

                //client.query('SELECT * FROM "USUARIOS" WHERE "EMAIL"= ' + email + ';', function(err2, result2) {
                  //  if (handleError(result2)) return;

            sendMail(email);
            done();
            res.status(
                responseMessages.getUserCreatedMsg().status
            ).send(
                responseMessages.getUserCreatedMsg()
            );
                //});

            });
    });

});



app.listen(port);
console.log('todo list RESTful API server started on: ' + port);



/*var dbConnection = new Sequelize("SUSCRIPTORES", "USUARIOS", "", {
    port: 5432,
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});


dbConnection.sync().then(function (err) {
    app.get("/", function(req, res) {
        res.render("home.html");
    });
    app.listen(port);
    console.log('todo list RESTful API server started on: ' + port);
});*/









