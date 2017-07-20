'use strict';
	
var app = angular.module('app', ['ngMap']);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var codmovil = getParameterByName('codmovil');

app.controller('mapaCtrl', function($scope, $http,NgMap)
{	
	
 
	$scope.load = true;
	$scope.show_traffic = false;
	var trafficLayers = new google.maps.TrafficLayer();
	
	NgMap.getMap().then(function(map) {
	    $scope.map = map;
	    console.log($scope.map);
	});


    $scope.loadCar = function(){
    	$http.get("http://192.168.1.238:3030/service1.svc/getmapaasociadoconsulta/"+codmovil)
	        .success(function (res)
	        {
	          $scope.data = res.getmapaasociadoconsultaResult[0];
	          console.log($scope.data);
	          $scope.load = false;
	        });
    }

   	$scope.loadCar();
    
   /*	window.setInterval(function(){
    	$scope.loadCar();
    	console.log($scope.map);
    	console.log($scope.map.center.toJSON());
    }, 5000); 
*/
  
    $scope.traficos = function() {
    	if ($scope.show_traffic == true) {
    		trafficLayers.setMap($scope.map);
    	}else if ($scope.show_traffic == false) {
    		trafficLayers.setMap(null);
    	}
	}

});
