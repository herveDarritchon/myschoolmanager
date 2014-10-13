var mySchoolManagerService = angular.module('myschoolmanager.services', ['ngResource']);

  // super simple service
  // each function returns a promise object
  mySchoolManagerService.factory('FamillyAdministrationService', function($http) {
    return {
      get: function() {
        return $http.get("/api/famillies");
        //return [{surname: 'Edison', firstname: 'Thomas'},{surname: 'Tesal', firstname: 'Nikola'}];
      },
      save: function(familly) {
        return $http.post("/api/famillies",familly);
      },
      update: function(familly) {
        return $http.put("/api/famillies/"+familly._id,familly);
      }
    };

  });