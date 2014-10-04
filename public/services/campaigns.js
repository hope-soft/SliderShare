dsApp.factory('campaigns', function($http){
  return {
    list: function (callback){
      $http({
        method: 'GET',
        url: 'campaigns',
        cache: true
      }).success(callback);
    },
    detail: function(id, callback){
      $http({
        method: 'GET',
        url: 'campaign/view/' + id,
        cache: true
      }).success(callback);
    }
  };
});