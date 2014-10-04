dsApp.controller('CampaignListCtrl', function ($scope, campaigns){
  campaigns.list( function(campaigns) {
    $scope.campaigns = campaigns;
  });
});


dsApp.controller('CampaignDetailCtrl', function ($scope, $routeParams, campaigns){
  campaigns.detail( $routeParams.campaignId, function(detail) {
    $scope.campaignDetail = detail;
  });
});

