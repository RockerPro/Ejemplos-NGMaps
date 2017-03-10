'use strict';
// var base_url=location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

var app = angular.module('app', ['ngMap']);

app.controller('mapaCtrl', function($scope, $http,NgMap)
{	
	    	
	     
	    	$scope.load = true;

	    	$scope.pos_map = [-12.173210128048739,-76.85258206660156];
	    	$scope.zoom_map = 11;
	    	 

	    	NgMap.getMap().then(function(map) {
			    $scope.map = map;
			    console.log($scope.map);
			});

	        $scope.loadServices = function(){
	        	$http.get("http://192.168.1.238:5595/Service1.svc/getwsmapaserviciosdia/")
			        .success(function (res)
			        {
			          $scope.servicios = res.getwsmapaserviciosdiaResult;
			          $scope.load = false;
			          console.log($scope.servicios);
			        });
	        }

	       	$scope.loadServices();
	        
	       	window.setInterval(function(){
	        	$scope.loadServices();
            }, 10000); 

            $scope.select = {};

	       	$scope.showDetail = function(e, servicio){
	       		console.log(servicio);
            	/*$scope.select = {};*/
	       		$scope.select = servicio;	
	       		$scope.map.showInfoWindow('foo', $scope.select.nreserva);
	       	}

	       	$scope.search = function(){
	     	jQuery("#msg-error").hide();
	     	$scope.encontrado = 0;
	     	var id_resv = '';
	     	for (var i = 0; i < $scope.servicios.length; i++) {
	     		if ($scope.servicios[i].nreserva == $scope.nreserva) {
	     			$scope.pos_map = [ parseFloat($scope.servicios[i].latitude), parseFloat($scope.servicios[i].longitude) ];
	     			$scope.map.setZoom(18);
		       		$scope.loadServices();
		       		$scope.encontrado = 1;
		       		$scope.select = $scope.servicios[i];	
		       		$scope.map.showInfoWindow('foo', $scope.servicios[i].nreserva);
		       		console.log($scope.map);
	     		}
	     	}
	     	if ($scope.encontrado == 0) {
	     		jQuery("#msg-error").fadeIn(1000);
	     	}
	     }

});
