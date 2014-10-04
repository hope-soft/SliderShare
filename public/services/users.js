dsApp.factory('users', function($http){
  return {
    list: function (callback){
      $http({
        method: 'GET',
        url: 'admin/users',
        cache: true
      }).success(callback);
    }, 
    getprofile: function(callback){
      $http({
        method: 'GET',
        url: 'admin/user/profile',
        cache: true
      }).success(callback);
    },
    userFind: function (userId, callback){
      $http({
        method: 'GET',
        url: 'admin/user/view/' + userId,
        cache: true
      }).success(callback);
    }
  };
});