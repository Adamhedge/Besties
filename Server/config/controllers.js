var models = require('./models');
var express = require('express');
var db = require('../DB/DB.js');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

var app = express();

app.use(parser.json()); // for parsing application/json
app.use(parser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


//this is going to try to auth.
module.exports = {
  messages: {
    get: function (req, res) {
      var userID = req.param('id');
      var bestieID = req.param('bestie');
      models.messages.get(userID, bestieID, res);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var data = req.body;
      models.messages.post(data, res);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      //console.log("The controller works.");
      var data = req.body;
      var ID = req.param('ID') || 1;
      //console.log("The params: " + ID);
      models.users.get(ID, req, res);
    },
    post: function (req, res) {
      //console.log("The controller works.");
      var data = req.body;
      models.users.post(data, res);
    }
  },

  profiles: {
    // Ditto as above
    get: function (req, res) {
      models.profiles.get(res);
    },
    post: function (req, res) {
      var data = req.body;
      models.profiles.post(data, res);
    }
  },

  status: {
    get: function(req, res) {
    },
    post: function(req, res){
      var data = req.body;
      models.status.post(data, res);
    }
  }

  //
};

//express.Router().route/route.get(messages.get)

//Date.now(); (createdAt)