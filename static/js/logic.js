// ===================================================================================================
// CREATE VARIABLE FOR TECTONIC PLATES JSON FILE
// ===================================================================================================

var url_1 = "data/PB2002_plates.json";



// ===================================================================================================
// USE d3.json TO EXTRACT TECTONIC PLATES DATA, STYLE THE DATA AND ADD POP-UPS 
// ===================================================================================================

d3.json(url_1,function(data)

{
    
    var plates = L.geoJSON(data,{  
        style: function(feature){
            return {
                color:"red",
                fillColor: "white",
                fillOpacity:0
            }
        },      
        onEachFeature: function(feature,layer){
            console.log(feature.coordinates);
            layer.bindPopup("Plate Name: "+feature.properties.PlateName);
        }
        
    })



// ===================================================================================================
// CREATE VARIABLE FOR URL CONTAINING EARTHQUAKES DATA IN GEOJSON FORMAT
// ===================================================================================================
    
    var url_2 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";



// ===================================================================================================
// USE d3.json TO EXTRACT EARTHQUAKES DATA, CREATE CIRCLES TO REPRESENT THE MAGNITUDES
// AND ADD POP-UPS 
// ===================================================================================================    

    d3.json(url_2,function(data){
    console.log(data);
   
    function createCircleMarker(feature,latlng){
        var options = {
            radius:feature.properties.mag*4,
            fillColor: assignColor(feature.properties.mag),
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.9
        }
        return L.circleMarker( latlng, options );

    }

    var earthQuakes = L.geoJSON(data,{
        onEachFeature: function(feature,layer){
            layer.bindPopup("Place:"+feature.properties.place + "<br> Magnitude: "+feature.properties.mag+"<br> Time: "+new Date(feature.properties.time));
        },
        pointToLayer: createCircleMarker

    });

    createMap(plates,earthQuakes);

    });
    
});

  

// ===================================================================================================
// CREATE A FUNCTION TO:
// ADD 5 BASEMAPS - - SATTELLITE, SATELLITE-STREETS, LIGHT, DARK & OUTDOORS
// CREATE A BASEMAP OBJECT TO HOLD ALL THE 5 BASEMAPS
// ADD AN OVERLAY OBJECT TO HOLD THE 2 OVERLAY LAYERS - - PLATES AND EARTHQUAKES
// SPECIFY THE DEFAULT SETTINGS FOR THE MAP WHEN THE WEBSITE IS LAUNCHED
// ADD THE CONTROL LAYER TO THE MAP THAT ALLOWS US TO PICK THE BASEMAP AND THE OVERLAY LAYER
// ===================================================================================================

    function createMap(plates,earthQuakes) 
    {
    
    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox/satellite-v9",
      accessToken: API_KEY
    });
 

    var satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox/satellite-streets-v11",
      accessToken: API_KEY
    });


    var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox/light-v10",
      accessToken: API_KEY
    });


    var dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox/dark-v10",
      accessToken: API_KEY
    });


    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox/outdoors-v11",
      accessToken: API_KEY
    });


    var myBaseMaps = {
      "Satellite": satellite,
      "Satellite Streets": satelliteStreets,
      "Light": light,
      "Dark": dark,
      "Outdoors": outdoors
    };

    
    var myOverlayMaps = {
      "Fault Lines": plates,
      Earthquakes: earthQuakes
    };
  

    var myMap = L.map("map", {
      center: [
        40, -100
      ],
      zoom: 4,
      layers: [satellite, plates, earthQuakes]
    });
  
        
    L.control.layers(myBaseMaps, myOverlayMaps, {
      collapsed: false
    }).addTo(myMap);

    var info = L.control({
        position: "bottomright"
    });

    info.onAdd = function(){
        var div = L.DomUtil.create("div","legend");
        return div;
    }

    info.addTo(myMap);

    document.querySelector(".legend").innerHTML=displayColorLegend();

    }



// ===================================================================================================
// CREATE A FUNCTION TO ADD COLORS TO THE CIRCLES REPRESENTING THE MAGNITUDES OF THE EARTHQUAKES
// MAGNITUDE < 1: SKYBLUE
// MAGNITUDE BETWEEN 1 AND 2: LIGHT GREEN
// MAGNITUDE BETWEEN 2 AND 3: PURPLE 
// MAGNITUDE BETWEEN 3 AND 4: YELLOW
// MAGNITUDE BETWEEN 4 AND 5: DARK ORANGE 
// MAGNITUDE > 5: RED
// =================================================================================================== 

  function assignColor(mag){
    switch(true){
        case (mag<1):
            return "skyblue";
        case (mag<2):
            return "lightgreen";
        case (mag<3):
            return "yellow";
        case (mag<4):
            return "gold";
        case (mag<5):
            return "darkorange";
        default:
            return "red";
    };
}



// ===================================================================================================
// CREATE A FUNCTION TO ADD LEGEND FOR THE COLORS OF THE EARTHQUAKE MAGNITUDES
// MAGNITUDE < 1: SKYBLUE
// MAGNITUDE BETWEEN 1 AND 2: LIGHT GREEN
// MAGNITUDE BETWEEN 2 AND 3: PURPLE 
// MAGNITUDE BETWEEN 3 AND 4: YELLOW
// MAGNITUDE BETWEEN 4 AND 5: DARK ORANGE 
// MAGNITUDE > 5: RED
// =================================================================================================== 

function displayColorLegend(){
    var legendInfo = [{
        limit: "Mag: 0-1",
        color: "skyblue"
    },{
        limit: "Mag: 1-2",
        color: "lightgreen"
    },{
        limit:"Mag: 2-3",
        color:"yellow"
    },{
        limit:"Mag: 3-4",
        color:"gold"
    },{
        limit:"Mag: 4-5",
        color:"darkorange"
    },{
        limit:"Mag: 5+",
        color:"red"
    }];

    var header = "<h3>Magnitude</h3><hr>";

    var strng = "";
   
    for (i = 0; i < legendInfo.length; i++){
        strng += "<p style = \"background-color: "+legendInfo[i].color+"\">"+legendInfo[i].limit+"</p> ";
    }
    
    return header+strng;

}



// ===================================================================================================
// END OF THE SCRIPT
// =================================================================================================== 
