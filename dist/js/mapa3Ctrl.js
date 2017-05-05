'use strict';
// var base_url=location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
var base_url = "http://192.168.1.237:5595";

var app = angular.module('app', ['ngMap']);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var nreserva = getParameterByName('nreserva');

var idpro = getParameterByName('idpro');

app.controller('mapaCtrl', function($scope, $http,NgMap)
{	
	
 
	$scope.load = true;


	NgMap.getMap().then(function(map) {
	    $scope.map = map;
	    console.log($scope.map);
	});


    $scope.loadCar = function(){
    	$http.get("http://192.168.1.238:3030/Service1.svc/getserviciomapaproceso/"+idpro+'/'+nreserva)
	        .success(function (res)
	        {
	          console.log(res);
	          $scope.data = res.getserviciomapaprocesoResult[0];
	          $scope.loadServices();
	          $scope.load = false;
	        });
    }

    $scope.loadServices = function(){
    	$http.get("http://192.168.1.238:5595/Service1.svc/getwsmaparuta/"+nreserva)
	        .success(function (res)
	        {
	          $scope.servicios = res.getwsmaparutaResult;
	          console.log($scope.servicios);
	        });
    }

   	$scope.loadCar();
    
  /* 	window.setInterval(function(){
    	$scope.loadCar();
    	console.log($scope.map);
    	console.log($scope.map.center.toJSON());
    }, 5000); */

   	$scope.showDetail = function(e, servicio){
   		console.log(servicio);
   		$scope.select = servicio;	
   		$scope.map.showInfoWindow('foo', 'servicio-'+$scope.select.item);
   	}

});
