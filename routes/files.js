//Giving express access to route.
module.exports = function (app) {

    const  config = require('./../config/config.json'),
           middleware = require('./../auth/IsAuth'),
           formidable = require("formidable"),
           fs = require('fs'),
           path = require('path');


    app.post("/upload", middleware.isAuthenticated, function (req, res) {

        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {

            if (fields.type == "calendar" && req.rights.calendar == true || fields.type == "pensum" && req.rights.pensums == true) {

                var oldpath = files.photo.path;

                var newpath = "";

                if (fields.type == "calendar"){
                    newpath = config.pathcal.pathofcal + fields.name + path.extname(files.photo.name);
                } else {
                    newpath = config.pathpen.pathofpen + fields.name + path.extname(files.photo.name);
                }

                fs.rename(oldpath, newpath, function (err) {
                    if (err) {
                        throw err;
                        return res.json({
                            "response": "There was a problem with your request",
                            "status": 418
                        })
                    }
                    else {
                        return res.json({
                            "response": "File was uploaded",
                            "status": 200
                        })

                    }
                });
            } else {
                return res.json({
                    "response": "You dont have rights to perfom this action",
                    "status": 403
                })
            }
        });
    });

    app.get("/getfiles", function (req, res) {

        var files = [];
        var pathoffiles = "";


        if (req.query.type == "calendar"){
            pathoffiles = config.pathcal.pathofcal;
        } else {
            pathoffiles = config.pathpen.pathofpen;
        }

        fs.readdirSync(pathoffiles).forEach(file => {
            files.push(file)
        })

        res
            .status(200)
            .send(files)

    });

    app.post("/deletefile", middleware.isAuthenticated, function (req, res) {

        var pathoffiles = "";

        if (fields.type == "calendar" && req.rights.calendar == true || fields.type == "pensum" && req.rights.pensums == true) {

            if (req.body.type == "calendar"){
                pathoffiles = config.pathcal.pathofcal;
            } else {
                pathoffiles = config.pathpen.pathofpen;
            }

                fs.unlink(pathoffiles + req.body.file, (err) => {
                    if (err) {
                        console.log(err)
                        return res.json({
                            "response": "There was a problem with your request",
                            "status": 418
                        })

                    } else {
                        return res.json({
                            "response": "Your request was processed ",
                            "status": 200
                        })

                    }

                });

        } else {
            return res.json({
                "response": "You dont have rights to perfom this action",
                "status": 403
            })
        }
    })
}