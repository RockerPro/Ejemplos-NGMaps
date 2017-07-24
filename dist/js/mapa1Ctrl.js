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
	$scope.show_traffic = false;
  $scope.radio_number = 2000;
	var trafficLayers = new google.maps.TrafficLayer();
  var circle = new google.maps.Circle({
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    editable:true,
    draggable: false,
    map: $scope.map,
    radius: $scope.radio_number
  });

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
    }, 5000); 

   	$scope.showDetail = function(e, servicio){
   		console.log(servicio);
   		$scope.select = servicio;	
   		$scope.map.showInfoWindow('foo', 'servicio-'+$scope.select.item);
   	}

    

    $scope.traficos = function() {
      	if ($scope.show_traffic == true) {
      		trafficLayers.setMap($scope.map);
      	}else if ($scope.show_traffic == false) {
      		trafficLayers.setMap(null);
      	} 
  	}

    $scope.radio = function(data) {
        console.log(data);
        if ($scope.show_radio == true) {
          if (data == undefined) {
            circle.setOptions({
              center: $scope.map.center
            });
            circle.setMap($scope.map);
          }else{
            circle.setOptions({
              center: {
                lat: parseFloat(data.Latitude),
                lng: parseFloat(data.Longitude)
              }
            });
            circle.setMap($scope.map);
            console.log(circle.getRadius());
          }
        }else if ($scope.show_radio == false) {
          circle.setMap(null);
        }        
    }

    google.maps.event.addListener(circle, 'radius_changed', function() {
      $scope.radio_number = circle.getRadius().toFixed(2);
      console.log(circle.getRadius());
      $scope.$apply();
    });


    /*$scope.moveCicle = function(data){
      circle.setOptions({
        center: {
          lat: parseFloat(data.Latitude),
          lng: parseFloat(data.Longitude)
        }
      });
    }*/

});
