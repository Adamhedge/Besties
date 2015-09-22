angular.module('bestie.services', [])
.factory('landing', function ($http, $location, $window) {
  return {
    makeUser: function(user){
      console.log("The makeUser factory method works.");
      return $http({
        method: 'POST',
        url: '/besties/users/',
        data: user
      })
      .then(function (resp) {
        return resp.data.token;
      });
    },
    getUser: function(id){
      console.log(id);
      data = id || 1;
      console.log("Data: " + data);
      return $http({
        method: 'GET',
        url: '/besties/users/',
        params: {ID: data}
      });
    },
    getMessages : function (user, bestie) {
      return $http({
        method: 'GET',
        url: '/besties/messages/',
        params: { id: user,
                  bestie: bestie
        }
      });
    },
    sendMessage : function (user, message) {
    }
  };
});

//.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
//   // Don't touch this Auth service!!!
//   // it is responsible for authenticating our user
//   // by exchanging the user's username and password
//   // for a JWT from the server
//   // that JWT is then stored in localStorage as 'com.shortly'
//   // after you signin/signup open devtools, click resources,
//   // then localStorage and you'll see your token from the server
//   var signin = function (user) {
//     return $http({
//       method: 'POST',
//       url: '/api/users/signin',
//       data: user
//     })
//     .then(function (resp) {
//       return resp.data.token;
//     });
//   };

//   var signup = function (user) {
//     return $http({
//       method: 'POST',
//       url: '/api/users/signup',
//       data: user
//     })
//     .then(function (resp) {
//       return resp.data.token;
//     });
//   };

//   var isAuth = function () {
//     return !!$window.localStorage.getItem('com.shortly');
//   };

//   var signout = function () {
//     $window.localStorage.removeItem('com.shortly');
//     $location.path('/signin');
//   };


//   return {
//     signin: signin,
//     signup: signup,
//     isAuth: isAuth,
//     signout: signout
//   };
// })
