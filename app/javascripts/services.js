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
