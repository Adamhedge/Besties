angular.module('bestie.landing', [])

.controller('landingController', function ($scope, $q, landing) {

  $scope.myProfile = {};
  $scope.bestie = undefined;

  //a Simple function to make a user.  Tests the database Sequelize functionality.
  $scope.makeUser = function(){
    console.log("The makeUser function works.");
    var user = {};
    user.user_name = "JohnDoe";
    user.password = "fart";
    user.name = "John Doe";
    user.status = "My password is not fart.";
    landing.makeUser(user);
  };

  //Function that retrieves a user and their bestie.
  //Assumes there is a bestie.  Also sets a default ID of 1 if no user is specified.
  //Currently hardcoded to get the first user.
  $scope.getUser = function(){
    var myUser;
    var deferred = $q.defer();
    // return $q(function(){
    landing.getUser(2).then(function(user){
      console.log("The user: " + user.data.user[0].name);
      myUser = user;
      $scope.name = user.data.user[0].name;
      $scope.myProfile = user.data.user[0];
    }).then(function(){
      console.log("The bestie ID: "+ myUser.data.user[0].bestie_user_ID);
      landing.getUser(myUser.data.user[0].bestie_user_ID).then(function(bestie){
        console.log(bestie);
        $scope.bestieName = bestie.data.user[0].name;
        $scope.bestie = bestie.data.user[0];
        deferred.resolve("Success");
      });
    });
    return deferred.promise;
  };

  $scope.getMessages = function(){
    landing.getMessages($scope.myProfile.id, $scope.bestie.id).then(function(messages){
      //console.log("Messages : " + messages);
      //console.log(messages);
      $scope.messages = [];
      for(var i = 0; i < messages.data.results.length; i ++){
        //console.log(messages.data.results[i]);
        $scope.messages[i] = {
          message: messages.data.results[i].text,
        };
        if(messages.data.results[i].bestie_ID === $scope.bestie.id){
          $scope.messages[i].sender = 'Me';
        } else {
          $scope.messages[i].sender = $scope.bestieName;
        }
      }
    });
  };

  $scope.addMessage = function(){
    console.log("Executing send message");
    var thing = landing.sendMessage($scope.message, $scope.myProfile)
    .then(function(res){
      //console.log("I get to the get Messages call");
      $scope.getMessages();
    });
    //console.log(thing);
    $scope.message = '';
  };
  //Asynchronously loads the user profiles and messages.
  var promise = $scope.getUser();
  console.log(promise);
  promise.then(function(){
    //console.log("Made it to the promise");
    $scope.getMessages();
  });

});
