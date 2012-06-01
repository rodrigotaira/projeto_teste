var panorama;
var endereco;
var header;

$(document).ready(function () {

    function initialize() {
        var cappuccino = new google.maps.LatLng(-23.607867,-46.691747);
        endereco = new google.maps.Geocoder();
        
        var panoramaOptions = {
            linksControl: false,
            panControl: false,
            zoomControl: false,
            addressControl: false,
            position: cappuccino,
            pov: {
                heading: 0,
                pitch: 0,
                zoom: 1
            }
        };
        panorama = new google.maps.StreetViewPanorama(document.getElementById("pano"),panoramaOptions);
    }
    
    initialize();
    
    $("#busca").submit(function(){
        endereco.geocode({
            "address" : $("#endereco").val() + " Brasil"
        }, function(response, status){
            console.dir(response);
            console.dir(status);
            panorama.setPosition(response[0].geometry.location);
            
            var bobSponja = new google.maps.MarkerImage('images/dnc.gif');
            
            var bobMark = new google.maps.Marker({
                position: response[0].geometry.location,
                map: panorama,
                icon: bobSponja,
                title: 'Bob'
            });
            
            panorama.setPov({
                heading: 180,
                pitch: 0,
                zoom: 0
            });
        });
        return false;
    });
    
    $("#look-left").click(function(){
        panorama.setPov({
            heading: panorama.getPov().heading - 90,
            pitch: 0,
            zoom: 0
        });
    });
    
    $("#look-right").click(function(){
        panorama.setPov({
            heading: 90 + panorama.getPov().heading,
            pitch: 0,
            zoom: 0
        });

    });
    
    $("#look-back").click(function(){
        panorama.setPov({
            heading: 180 + panorama.getPov().heading,
            pitch: 0,
            zoom: 0
        });
    });
    
    $("#header-value").change(function(){
        panorama.setPov({
            heading: parseInt($("#header-value").val()),
            pitch: panorama.getPov().pitch,
            zoom: panorama.getPov().zoom
        });
        return false;
    });
    
    $("#pitch-value").change(function(){
        panorama.setPov({
            heading: panorama.getPov().heading,
            pitch: parseInt($("#pitch-value").val()),
            zoom: panorama.getPov().zoom
        });
        return false;
    });
    
    $("#zoom-value").change(function(){
        panorama.setPov({
            heading: panorama.getPov().heading,
            pitch: panorama.getPov().pitch,
            zoom: parseInt($("#zoom-value").val())
        });
        return false;
    });
    
    google.maps.event.addListener(panorama, 'pov_changed', function() {
        $("#atual-header").val(panorama.getPov().heading);
        $("#atual-zoom").val(panorama.getPov().zoom);
        $("#atual-pitch").val(panorama.getPov().pitch);
    });
    
});