var dsApp = angular.module('dsApp', ['ngRoute']);

dsApp.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'views/index.html',
      controller: 'indexCtrl'
    }).
    when('/admin/campaigns', {
      templateUrl: 'views/campaign-list.html',
      controller: 'CampaignListCtrl'
    }).
    when('/admin/campaign/view/:campaignId', {
      templateUrl: 'views/campaign-detail.html',
      controller: 'CampaignDetailCtrl'
    }).
    when('/admin/users', {
      templateUrl: 'views/users.html',
      controller: 'UserListCtrl'
    }).
    when('/admin/profile/edit', {
      templateUrl: 'views/profile.html',
      controller: 'UserProfileCtrl'
    }).
    when('/admin/user/view/:userId', {
      templateUrl: 'views/user-detail.html',
      controller: 'UserDetailsCtrl'
    }).
    when('/admin/user/edit/:userId', {
      templateUrl: 'views/user-detail-edit.html',
      controller: 'UserDetailsCtrl'
    }).
    when('/admin/user/delete/:userId', {
      templateUrl: 'views/user-detail-delete.html',
      controller: 'UserDetailsCtrl'
    }).
    when('/support/contact', {
      templateUrl: 'views/contact.html',
      controller: 'contactCtrl'
    });
});