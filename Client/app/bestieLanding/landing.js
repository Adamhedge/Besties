angular.module('bestie.landing', [])

.controller('landingController', function ($scope, landing) {
  // Your code here
  // $scope.data = {};
  // $scope.getLinks = function () {
  //   //var result = Links;
  //   Links.GET()
  //   .then(function (data) {
  //     //console.log(data);
  //     $scope.data.links = data;
  //   });
  // };
  $scope.makeUser = function(){
    console.log("The makeUser function works.");
    var user = {};
    user.user_name = "JohnDoe";
    user.password = "fart";
    user.name = "John Doe";
    user.status = "My password is not fart.";
    landing.makeUser(user);
  };

  $scope.getUser = function(){
    var myUser;
    landing.getUser().then(function(user){
      console.log("The user: " + user);
      myUser = user;
      $scope.name = user.data.user[0].name;
    }).then(function(){
      console.log("The bestie ID: "+ myUser.data.user[0].bestie_user_ID);
      landing.getUser(myUser.data.user[0].bestie_user_ID).then(function(bestie){
        console.log(bestie);
        $scope.bestieName = bestie.data.user[0].name;
      });
    });
  };

  $scope.getUser();
  // $scope.getLinks();
});

// var users = sequelize.define('user', {
//   //id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   user_name: Sequelize.STRING,
//   password: Sequelize.STRING,
//   profile_ID: Sequelize.STRING
// });

// var profiles = sequelize.define('profile', {
//   //id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
//   user_ID: Sequelize.INTEGER,
//   name: Sequelize.STRING,
//   status: Sequelize.STRING,
//   profile_pic: Sequelize.STRING,
//   has_bestie: Sequelize.BOOLEAN,
//   bestie_profile_ID: Sequelize.INTEGER
// });