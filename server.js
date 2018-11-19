/*
---Server Code---
*/
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var http = require('http');
const port1 = '8080';
const net = require('net');
const url = require('url');

//For accessing Google Maps API
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBSjmzkXbR-yUgs-un-8Q922ynfm0OVg_4'
});
//For decoding overview_polyline for all points along the route
const decodePolyline = require('decode-google-map-polyline');

//Server main code
var fs = require("fs");
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/gas-station', function(req,res){ //Receiving data from frontend
    //console.log(req.body);
    var origin=req.body.origin;
    var radius=req.body.radius;
    var type=req.body.fuel;
    console.log('Request for cheapest '+type);
    var address=null,latitude=null,longitude=null,price=null;
    var a=getCheapestGas(origin,radius,type);
        a.then(function(r){
        try{
            //console.log(r);
            //console.log(JSON.parse(r).geoLocation);
            var result=JSON.parse(r).stations;
            //console.log(result.length);
            for(var i=0;i<result.length;i++){
            	//console.log(result[i].reg_price);
            	if(type=='reg'){
            		if(result[i].reg_price!='N\/A'){
            			address=JSON.parse(r).stations[i].address+', '+JSON.parse(r).stations[i].zip;
            			latitude=JSON.parse(r).stations[i].lat;
            			longitude=JSON.parse(r).stations[i].lng;
            			price=JSON.parse(r).stations[i].reg_price;
            			break;
            		}
            	}
            	else if(type=='mid'){
            		if(result[i].mid_price!='N\/A'){
            			address=JSON.parse(r).stations[i].address+', '+JSON.parse(r).stations[i].zip;
            			latitude=JSON.parse(r).stations[i].lat;
            			longitude=JSON.parse(r).stations[i].lng;
            			price=JSON.parse(r).stations[i].mid_price;
            			break;
            		}
            	}
            	else if(type=='pre'){
            		if(result[i].pre_price!='N\/A'){
            			address=JSON.parse(r).stations[i].address+', '+JSON.parse(r).stations[i].zip;
            			latitude=JSON.parse(r).stations[i].lat;
            			longitude=JSON.parse(r).stations[i].lng;
            			price=JSON.parse(r).stations[i].pre_price;
            			break;
            		}
            	}
            	else if(type=='diesel'){
            		if(result[i].diesel_price!='N\/A'){
            			address=JSON.parse(r).stations[i].address+', '+JSON.parse(r).stations[i].zip;
            			latitude=JSON.parse(r).stations[i].lat;
            			longitude=JSON.parse(r).stations[i].lng;
            			price=JSON.parse(r).stations[i].diesel_price;
            			break;
            		}
            	}
            }
            //console.log(address);
            /*var min=JSON.parse(r).main.temp_min;
            var max=JSON.parse(r).main.temp_max;
            var temp=JSON.parse(r).main.temp;*/
            }
        catch(error){
        }
    res.send({address:address,geoLocation:{lat: Number(latitude),lng: Number(longitude)},price:price});
    console.log("Result : Address "+address+" Latitude "+latitude+" Longitude "+longitude+" Price "+price);
});
});
module.exports = app;
var request = require('request');
//Instantiating Local Server
var server = http.createServer(app);
server.listen(port1,
 function() {
  console.log('HTTP listening on port ' + port1);
});
server.listen(port1, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

//Accessing Gas Station API
var apiKey = 'ud1ejfvapi';
function getCheapestGas(loc,rad,fuel){
return new Promise(function(resolve,reject){
    var url='http://api.mygasfeed.com/stations/radius/'+loc.lat+'/'+loc.lng+'/'+rad+'/'+fuel+'/price/ud1ejfvapi.json';
    request(url, function (err, response, body) {
        if(err){
            reject(error);
        } else {
            resolve(body);
        }
    });
    });
}