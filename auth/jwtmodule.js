// services.js
var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('./../config/config.json');

module.exports.createToken = function(user, rights) {

    var payload = {
        sub: user,
        rights: rights,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix(),
    };

    return jwt.encode(payload, config.secret.token);
};