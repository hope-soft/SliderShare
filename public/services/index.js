dsApp.factory('index', function($http){
  return {
    home: function (callback){
      $http({
        method: 'GET',
        url: '/',
        cache: true
      }).success(callback);
    }
  };
});