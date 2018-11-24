//We export the driver, models, etc...
const mongoose = require('mongoose'),
    news = require('../Schemas/news'),
    events = require('../Schemas/events'),
    middleware = require('./../auth/IsAuth');

function type(kindofactivity) {

    if (kindofactivity == "event") {
        return events
    } else {
        return news
    }
}

//Giving express access to route.
module.exports = function (app) {

    app.post("/deletenew", middleware.isAuthenticated, function (req, res) {

        if (req.body.type == "event" && req.rights.events == true  || req.body.type == "new" && req.rights.news == true) {


            var query = type(req.body.type).deleteOne({_id: req.body.id});
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
            res.json({
                "response": "You dont have rights to perform this action",
                "status": "403"
            });
        }

    });

    app.get("/news", function (req, res) {

        var query = type(req.query.type).find({});
        query.exec(function(err,data) {
            if (err) return console.log(err);
            else {

                res.json({
                    "response": data,
                    "status": 200
                });
            }
        });

    });

    app.post("/updatenew", middleware.isAuthenticated, function (req, res) {

        if (req.body.type == "event" && req.rights.events == true  || req.body.type == "new" && req.rights.news == true) {

            var query = type(req.body.type).updateOne({_id: req.body.id}, {description: req.body.description, name: req.body.name, date: req.body.date, hour: req.body.hour});

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
            res.json({
                "response": "You dont have rights to perform this action",
                "status": "403"
            });
        }
    });

    app.post("/createnew", middleware.isAuthenticated, function (req, res) {

        if (req.body.type == "event" && req.rights.events == true  || req.body.type == "new" && req.rights.news == true) {

            var newEntry = type(req.body.type) ({name: req.body.name, description: req.body.description, date: req.body.date, hour: req.body.hour});

            newEntry.save(function (err) {
                if (err) return console.error(err);
                else {
                    console.log('Done');
                    res.json({
                        "response": "Activity was created!",
                        "status": "200"
                    });
                }
            });

        } else {
            res.json({
                "response": "You dont have rights to perform this action",
                "status": "403"
            });
        }

    });

}