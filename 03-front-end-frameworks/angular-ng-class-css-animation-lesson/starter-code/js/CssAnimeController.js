var cssAnimeApp = angular.module('CssAnimeApp');

cssAnimeApp.controller('CssAnimeController', ['$scope', function($scope){
  
  $scope.winners = [
    {name: 'Colin Firth'},
    {name: 'Jean Dujardin'},
    {name: 'Daniel Day Lewis'},
    {name: 'Matthew McConaughey'},
    {name: 'Eddie Redmayne'},
    {name: 'Leonardo DiCaprio'}
  ];
  
}]);