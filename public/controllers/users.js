dsApp.controller('UserListCtrl', function ($scope, users){
  users.list( function(users) {
    $scope.users = users;
  });
});

dsApp.controller('UserProfileCtrl', function ($scope, users){
  users.getprofile( function(profile) {
    $scope.user = profile;
  });
});

dsApp.controller('UserDetailsCtrl', function ($scope, $routeParams, users){
  users.userFind( $routeParams.userId, function(userDetail) {
    $scope.userDetail = userDetail;
  });
});

