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

var mySchoolManagerCtrl = angular.module('controllers', []);

mySchoolManagerCtrl.controller('AfterSchoolCareCtrl', ['$scope', 'AfterSchoolService',
  function($scope, AfterSchoolService) {

    $scope.message = AfterSchoolService.getMessage;
    $scope.montant = AfterSchoolService.getAmount;
    $scope.description = "Nothing yet ! Plenty to come !!";

    // $scope.afterSchoolCares = AfterSchoolCareService.getAfterSchoolCares();
    // $scope.afterSchoolCareSelected = $scope.afterSchoolCares[0];

    // $scope.$watch('afterSchoolCareSelected', function(newValue, oldValue) {
    //  console.log("afterSchoolCareSelecte has chaged from " + oldValue.title + " to " + newValue.title);
    // });

  }
]);

mySchoolManagerCtrl.controller('MainCtrl', ['$scope',
  function($scope) {

    $scope.title = "My School Manager App";
    $scope.message = "a Web application that helps a Montessori school to run smoothly !";

  }
]);

mySchoolManagerCtrl.controller('FamillyAdministrationCtrl', ['$scope', 'Familly',
  function($scope, Familly) {

    $scope.master = {};

    $scope.title = "Familly administration page";
    $scope.message = "This page is dedicated to the familly administration.";

    $scope.famillies = Familly.query();
    $scope.familly = new Familly();

    $scope.save = function(familly) {
      if ($scope.familly._id) {
        console.log('Update Data : %j', familly);
        Familly.update({
          _id: $scope.familly._id
        }, $scope.familly);
      } else {
        console.log('Create Data : %j', familly);
        $scope.familly.$save().then(function(response) {
          console.log('Response Data : %j', response);
          $scope.famillies.push(response);
          $scope.insertSuccessMessage = "The familly " + $scope.familly.surname + " has been added.";
          $scope.resetNewFamillyForm();
        });
      }
    };

    // Reset the content of the New Familly Form
    $scope.resetNewFamillyForm = function() {
      $scope.newFamilly = angular.copy($scope.master);
    };

    // Reset the content of the Edit Familly Form
    $scope.resetEditFamillyForm = function() {
      $scope.selectedFamilly = angular.copy($scope.master);
    };

    $scope.setSelectedFamilly = function(familly, index) {
      $scope.selectedFamilly = angular.copy(familly);
      $scope.famillyIndex = index;
      $scope.master = angular.copy($scope.selectedFamilly);
    };

  }
]);

var mySchoolManagerService = angular.module('services', ['ngResource']);

// super simple service
// each function returns a promise object
mySchoolManagerService.factory('AfterSchoolService', [

  function() {
    return {
      getMessage: "After school care page",
      getAmount: 14.00
    }
  }
]);

mySchoolManagerService.factory('Familly', ['$resource',
  function($resource) {
    var Familly = $resource('/api/famillies/:_id', {}, {
      update: {
        method: 'PUT'
      }
    });

    return Familly;

  }
]);


//# sourceMappingURL=app.js.map