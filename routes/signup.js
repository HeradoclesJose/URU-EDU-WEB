//We export the driver, models, etc...
const mongoose = require('mongoose'),
      models = require('../Schemas/users'),
      middleware = require('./../auth/IsAuth'),
      hash = require('../auth/hashpass');

//Giving express access to route.
module.exports = function (app) {
    
    app.post("/register", middleware.isAuthenticated, function (req, res) {

        if (req.rights.admin == true ){

            //We create the Document and recover the model.
            var users = mongoose.model('users');
            var user = users ({name: req.body.name, user: req.body.user, pass: hash.hashPassword(req.body.password), rights: req.body.rights});

            //We send it to the database, but first we validate the data.
            users.countDocuments({user: req.body.user}, function (err, count){
                if (err) return console.error(err);
                else{
                    if(count >= 1){
                        console.log('Username already exist!');
                        return res.json({
                            "response": "User already exists",
                            "status": 418
                        })
                    }else{
                        user.save(function (err) {
                            if (err) return console.error(err);
                            else {
                                console.log('Done');
                                return res.json({
                                    "response": "User was created!",
                                    "status": 200
                                })
                            }
                        });
                    }
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