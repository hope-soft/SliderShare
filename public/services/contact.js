dsApp.factory('contact', function($http){
  return {
    getprofile: function(id, callback){
      $http({
        method: 'GET',
        url: 'admin/user/profile',
        cache: true
      }).success(callback);
    }
  };
});