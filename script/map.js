var mapOptions = {
    center: [53.383331, -1.466667],
    zoom: 6
};

var map = new L.map('map-container', mapOptions);
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

var markersCluster = L.markerClusterGroup({
    disableClusteringAtZoom: 10,
    chunkedLoading: true,
    maxClusterRadius: 50,
    iconCreateFunction: function (cluster) {
        return new L.DivIcon({
            html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
            className: 'custom-cluster-icon',
            iconSize: new L.Point(40, 40)
        });
    }
});

map.addLayer(markersCluster);

let activePolygons = {};

function addMarkersToMap(markerData) {
    const markerObjects = markerData.map(({ lat, lng, productId, coordinates }) => {
        let encodedCoords = encodeURIComponent(JSON.stringify(coordinates));
        let popupContent = `
            <div>
                <strong>Product ID:</strong> ${productId} <br>
                ${coordinates && coordinates.length ? 
                    `<button id="polygon-btn-${productId}" onclick='togglePolygon("${productId}", "${encodedCoords}")'>Show Polygon</button>` 
                : `<span style="color:red;">No polygon data</span>`}
            </div>
        `;
        let marker = L.marker([lat, lng]).bindPopup(popupContent);
        return marker;
    });

    markersCluster.addLayers(markerObjects);
}

function togglePolygon(productId, encodedCoordinates) {
    let polygonBtn = document.getElementById(`polygon-btn-${productId}`);

    if (activePolygons[productId]) {
        map.removeLayer(activePolygons[productId]);
        delete activePolygons[productId];
        polygonBtn.innerText = "Show Polygon";
    } else {
        let coordinates = JSON.parse(decodeURIComponent(encodedCoordinates));
        let polygon = L.polygon(coordinates, { color: "blue" }).addTo(map);
        activePolygons[productId] = polygon;
        map.fitBounds(polygon.getBounds());
        polygonBtn.innerText = "Hide Polygon";
    }
}


function drawPolygon(coordinates) {
    if (!coordinates || !Array.isArray(coordinates) || coordinates.length === 0) {
        alert("Polygon data is not available for this product.");
        return;
    }
    
    var polygon = L.polygon(coordinates, { color: "blue" }).addTo(map);
    map.fitBounds(polygon.getBounds());
}


var style = document.createElement('style');
style.innerHTML = `
    .custom-cluster-icon {
        background-color: #42A5F5;
        color: white;
        border-radius: 50%;
        text-align: center;
        font-size: 14px;
        line-height: 40px;
    }
`;
document.head.appendChild(style);
