var mySchoolManagerCtrl = angular.module('myschoolmanager.controllers', []);

mySchoolManagerCtrl.controller('AfterSchoolCareCtrl', ['$scope',
  function($scope) {

   $scope.title = "After school care page";
   $scope.montant = 12.0;
   $scope.description = "Nothing yet ! Plenty to comme !!";

   // $scope.afterSchoolCares = AfterSchoolCareService.getAfterSchoolCares();
   // $scope.afterSchoolCareSelected = $scope.afterSchoolCares[0];

   // $scope.$watch('afterSchoolCareSelected', function(newValue, oldValue) {
   //  console.log("afterSchoolCareSelecte has chaged from " + oldValue.title + " to " + newValue.title);
  // });

 }]);

mySchoolManagerCtrl.controller('MainCtrl', ['$scope',
  function($scope) {

   $scope.title = "My School Manager App";
   $scope.message = "a Web application that helps a Montessori school to run smoothly !";

 }]);

mySchoolManagerCtrl.controller('FamillyAdministrationCtrl', ['$scope',
  function($scope) {

    $scope.master ={};

    $scope.title = "Familly administration page";
    $scope.message = "This page is dedicated to the familly administration.";

    FamillyService.get().success (function(famillies){
      $scope.famillies = famillies;
    }).error(function(){
      $scope.err="sorry, something goes wrong ! Impossible to retreive the famillies from the database.";
    });

    // Reset the content of the New Familly Form
    $scope.resetNewFamillyForm=function() {
      $scope.newFamilly=angular.copy($scope.master);
    };

    // Reset the content of the Edit Familly Form
    $scope.resetEditFamillyForm=function() {
      $scope.selectedFamilly=angular.copy($scope.master);
    };


    $scope.addFamilly = function(newFamilly) {
      FamillyService.save(newFamilly).success(function(data,status,headers,config){
        $scope.famillies.push(data);
        $scope.insertSuccessMessage="The familly " + data.surname + " has been added.";
        $scope.resetNewFamillyForm();
      }).error(function(data,status,headers,config){
        $scope.insertErrorMessage="Error during familly saving action !.";
      });
    };

    $scope.saveFamilly = function(selectedFamilly,index) {
      FamillyService.update(selectedFamilly).success(function(data,status,headers,config){
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
