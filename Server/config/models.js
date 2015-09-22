var db = require('../DB/DB.js');
var bodyParser = require('body-parser');
var Sequelize = require('Sequelize');

module.exports = {
  messages: {
    get: function (userID, bestieID, res) {
      db.Messages.sync().then(function() {
        db.Messages.findAll({
          where:
            Sequelize.or({
              userID: userID,
              bestie_ID: bestieID
            },
            {
              userID: bestieID,
              bestie_ID: userID
            }
          )
        }).then(function(msg){
          console.log("Success");
          res.send({results: msg});
        });
      });
    },

    post: function (data, res) {
      console.log(data);
      console.log(data.message);
      db.Messages.sync().then(function(){
        return db.Messages.create({
          userId: data.user.id,
          text: data.message,
          bestie_ID: data.user.bestie_user_ID
        });
      }).then(function(user){
        //console.log(user);
        res.sendStatus(201);
      });
    }
  },

  users: {
    get: function (ID, req, res) {
      //console.log("Request Data: " + ID);
      db.Users.sync().then(function(){
        db.Users.findAll({
        where: {
          ID: ID,
        }
      }).then(function(user){
          //console.log("result? : " + user.name);
          res.send({user: user});
        });
      });
    },

    post: function (data, res) {
      //console.log(data);
      var myUser;
      db.Users.sync().then(function(){
        return db.Users.create({
          user_name: data.user_name,
          password: data.password,
          name: data.name,
          status: data.status
        });
      }).then(function(user){
        //console.log(user);
        res.sendStatus(201);
      });
    }
  },

  profiles: {
    get: function (res) {

    },
    post: function (res) {

    }
  },

  status: {
    post: function(data, res){
      console.log(data);
      db.Users.sync().then(function(){
        db.Users.update({
            status: data.status
          }, {
          where: {
            id: data.id
          }
        }).then(function(user){
            res.sendStatus(201);
        });
      });
    }
    // Post.update({
    //   updatedAt: null,
    // }, {
    //   where: {
    //     deletedAt: {
    //       $ne: null
    //     }
    //   }
    // });
  }
};

      // var queryString = "select m.id, u.user_name, m.message, m.createdAt, r.room_name from messages m inner join rooms r on (m.room_id = r.id) inner join user u on(u.id = m.user_id);"; 
// insert into user (user_name) values ("Adam");

// Messages.sync().then(function() {
//   var newMessage = Messages.build({
//     // user_id: 1, //?How do we know?,
//     text: "In Mercy's Name, three days are all I need!",
//     room_name: "France"
//   });

//   Messages.findAll({ where: {room_name : "France"} }).then(function(msg){
//       for (var i=0; i<msg.length; i++){
//         console.log(msg[i].text + "is what he said in " + msg[i].room_name);
//       }
//     })
// });







