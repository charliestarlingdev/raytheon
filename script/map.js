var mapOptions = {
    center: [53.383331, -1.466667],
    zoom: 6
}

var map = new L.map('map-container', mapOptions);
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

var marker = new L.Marker([53.383331, -1.466667]);
marker.addTo(map);
