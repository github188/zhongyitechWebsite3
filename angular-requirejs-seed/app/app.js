'use strict';


/**
 *
 *   "define" is use to load files, while "angular" use to do logic module things.
 *   we load all files in one time, and use module if we need.
 *
 **/

define([
	'angular',
	'angularRoute',
	'angularUiRouter',
	'controllers/index',
], function(angular, angularRoute, angularUiRouter) {
	// Declare app level module which depends on views, and components
	return angular.module('myApp', [
		'ngRoute',
		'ui.router',
		'app.controllers',
	])
	.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
          $urlRouterProvider.otherwise('/');
          
          $stateProvider
              .state('public', {
                  abstract: true,
                  data: {
                      roles: ['public']
                  },
                  templateUrl: "views/bone.html"
              })
              .state('public.index', {
                  url: '/',
                  views:{
                      "nav": {
                          templateUrl: 'views/public/nav.html',
                          controller: 'navCtrl'
                      },
                      "body": {
                          templateUrl: 'views/public/body.html'
                      },
                      "footer": {
                          templateUrl: 'views/public/footer.html'
                      }
                  }
              })
              ;//end one stateProvider
    }])
	;
});

