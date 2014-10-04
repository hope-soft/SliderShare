dsApp.controller('contactCtrl', function ($scope, $routeParams, contact){
  contact.getprofile( $routeParams.userId, function(user) {
    $scope.user = user;
  });
});