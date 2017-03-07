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

	    app.controller('mapaCtrl', function($scope, $http,NgMap)
	    {	
	    	
	     
	    	$scope.load = true;

	    	/* --trafficLayers*/
	    	console.log(NgMap.getMap(map));

	    	NgMap.getMap().then(function(map) {
			    $scope.map = map;
			    console.log($scope.map);
			});


	        $scope.loadCar = function(){
	        	$http.get("http://192.168.1.238:5595/Service1.svc/getwsmapamoviles/"+nreserva)
			        .success(function (res)
			        {
			          $scope.data = res.getwsmapamovilesResult[0];
			          console.log($scope.data);
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
	        
	       	window.setInterval(function(){
	        	$scope.loadCar();
	        	console.log($scope.map);
	        	console.log($scope.map.center.toJSON());
            }, 5000); 

	       	$scope.showDetail = function(e, servicio){
	       		console.log(servicio);
	       		$scope.select = servicio;	
	       		$scope.map.showInfoWindow('foo', 'servicio-'+$scope.select.item);
	       	}

	       
	        $scope.traficos = function() {
			    if (document.getElementById('trafico').checked == true) {
			        trafficLayers.setMap($scope.map);
			        document.all('trafics').style.backgroundColor = '#FF6633';
			    }
			    else {
			        trafficLayers.setMap(null);
			        document.all('trafics').style.backgroundColor = '#58B2D2';
			    }
			}

	    });
