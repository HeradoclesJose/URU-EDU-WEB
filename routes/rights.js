//We export the driver, models, etc...
const mongoose = require('mongoose'),
    models = require('../Schemas/users'),
    middleware = require('./../auth/IsAuth'),
    hash = require('../auth/hashpass');

//Giving express access to route.
module.exports = function (app) {

    app.post("/updaterights", middleware.isAuthenticated, function (req, res) {

        if (req.rights.admin == true ){

            var query = models.updateOne({user: req.body.user}, {rights: req.body.rights});
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
                "response": "You dont have the rights to perform this action",
                "status": "403"
            })
        }

    });

}