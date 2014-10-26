var mySchoolManagerApp = angular.module('MySchoolManagerApp', ['ngRoute', 'controllers', 'services']);


mySchoolManagerApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/home.html',
        controller: 'MainCtrl'
      })
      .when('/afterschoolcare', {
        templateUrl: '/partials/afterschoolcare.html',
        controller: 'AfterSchoolCareCtrl'
      })
      .when('/administration', {
        templateUrl: '/partials/famillyAdministration.html',
        controller: 'FamillyAdministrationCtrl'
      })
      .when('/contact', {
        templateUrl: '/partials/contact.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);

mySchoolManagerApp.config(function($sceProvider) {
  // Completely disable SCE to support IE7.
  $sceProvider.enabled(false);
});
