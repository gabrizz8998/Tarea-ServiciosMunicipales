// Cargar mapa  
var map;
var lat="";
var lng="";
function visualizaMapa(){
    cargarMapa(this.articulo.latitud,this.articulo.longitud)
}
function cargarMapa(latitud,longitud)
{
map = new google.maps.Map(
    document.getElementById('map_canvas'), {
    // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
        center: new google.maps.LatLng(latitud,longitud),//latitud,longitud),//
       // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
    zoom: 18, // zoom del mapa
    draggableCursor: 'auto', // forma del cursor
    draggingCursor: 'crosshair',
    mapTypeId: google.maps.MapTypeId.SATELLITE // tipo de mama
});}
