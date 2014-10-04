dsApp.factory('campaigns', function($http){
  return {
    list: function (callback){
      $http({
        method: 'GET',
        url: 'campaign',
        cache: true
      }).success(callback);
    },
    find: function(id, callback){
      $http({
        method: 'GET',
        url: 'campaign/' + id,
        cache: true
      }).success(callback);
    }
  };
});