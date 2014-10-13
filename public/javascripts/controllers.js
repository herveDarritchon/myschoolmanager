var mySchoolManagerCtrl = angular.module('myschoolmanager.controllers', []);

mySchoolManagerCtrl.controller('AfterSchoolCareCtrl', ['$scope', 'AfterSchoolCareService',
  function($scope, AfterSchoolCareService) {

   $scope.title = "After school care page";
   $scope.message = "Nothing yet ! Plenty to comme !!";

   $scope.afterSchoolCares = AfterSchoolCareService.getAfterSchoolCares();
   $scope.afterSchoolCareSelected = $scope.afterSchoolCares[0];

   $scope.$watch('afterSchoolCareSelected', function(newValue, oldValue) {
    console.log("afterSchoolCareSelecte has chaged from " + oldValue.title + " to " + newValue.title);
  });

 }]);

mySchoolManagerCtrl.controller('MainCtrl', ['$scope',
  function($scope) {

   $scope.title = "My School Manager App";
   $scope.message = "a Web application that helps a Montessori school to run smoothly !";

 }]);

mySchoolManagerCtrl.controller('FamillyAdministrationCtrl', ['$scope', 'FamillyAdministrationService',
  function($scope, FamillyAdministrationService) {

    $scope.master ={};

    $scope.title = "Familly administration page";
    $scope.message = "This page is dedicated to the familly administration.";

    FamillyAdministrationService.get().success (function(famillies){
      $scope.famillies = famillies;
    }).error(function(){
      $scope.err="sorry, something goes wrong ! Impossible to retreive the famillies from the database.";
    });

    $scope.resetNewFamillyForm=function() {
      $scope.newFamilly=angular.copy($scope.master);
    };

    $scope.resetEditFamillyForm=function() {
      $scope.selectedFamilly=angular.copy($scope.master);
    };

    $scope.addFamilly = function(newFamilly) {
      FamillyAdministrationService.save(newFamilly).success(function(data,status,headers,config){
        $scope.famillies.push(data);
        $scope.insertSuccessMessage="The familly " + data.surname + " has been added.";
        $scope.resetNewFamillyForm();
      }).error(function(data,status,headers,config){
        $scope.insertErrorMessage="Error during familly saving action !.";
      });
    };

    $scope.saveFamilly = function(selectedFamilly,index) {
      FamillyAdministrationService.update(selectedFamilly).success(function(data,status,headers,config){
        $scope.master=angular.copy(data);
        console.log ('data updated : %j',data);
        $scope.famillies[index]=angular.copy(data);
        $scope.insertSuccessMessage="The familly " + data.surname + " has been edited.";
      }).error(function(data,status,headers,config){
        $scope.insertErrorMessage="Error during familly saving action !.";
      });
    };

    $scope.setSelectedFamilly=function(familly,index) {
      $scope.selectedFamilly=angular.copy(familly);
      $scope.famillyIndex=index;
      $scope.master=angular.copy($scope.selectedFamilly);
    };

  }]);
