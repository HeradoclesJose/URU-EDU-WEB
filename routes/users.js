//We export the driver, models, etc...
const mongoose = require('mongoose'),
    models = require('../Schemas/users'),
    middleware = require('./../auth/IsAuth'),
    hash = require('../auth/hashpass');

//Giving express access to route.
module.exports = function (app) {

    app.post("/deleteuser", middleware.isAuthenticated, function (req, res) {

        console.log(req.rights)

        if (req.rights.admin == true){

            var query = models.deleteOne({user: req.body.user});
            query.exec(function(err) {
                if (err) return console.log(err);
                else {
                    res.json({
                        "response": "Solicitud procesada con exito",
                        "status": 200
                    });
                }
            });

        } else {
            return res.json ({
                "response": "You dont have the rights to perform this action",
                "status": 403
            })
        }

    });

    app.get("/users", middleware.isAuthenticated, function (req, res) {

        if (req.rights.admin == true){

            var query = models.find({});
            query.exec(function(err,data) {
                if (err) return console.log(err);
                else {

                    res.json({
                        "response": data,
                        "status": 200
                    });
                }
            });

        } else {
            return res.json ({
                "response": "You dont have the rights to perform this action",
                "status": 403
            })
        }

    });

    app.post("/updateuser", middleware.isAuthenticated, function (req, res) {

        if (req.rights.admin == true){

            var query = models.updateOne({user: req.body.user}, {name: req.body.name, pass: hash.hashPassword(req.body.password)});
            query.exec(function(err) {
                if (err) return console.log(err);
                else {
                    res.json({
                        "response": "Solicitud procesada con exito",
                        "status": 200
                    });
                }
            });

        } else {
            return res.json({
                "response": "You dont have the rights to perform this action",
                "status": 403
            })

        }

    });

}