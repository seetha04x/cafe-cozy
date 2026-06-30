var map = L.map('map').setView(
  [cafeCoords.geometry.coordinates[1], cafeCoords.geometry.coordinates[0]],
  13
);

// setTimeout(() => map.invalidateSize(), 100);
// window.addEventListener('load', () => map.invalidateSize());

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Create marker manually from coordinates
var marker = L.marker([
  cafeCoords.geometry.coordinates[1], // latitude
  cafeCoords.geometry.coordinates[0]  // longitude
]).addTo(map);

// Bind custom popup message
marker.bindPopup(`
  <div style="font-size:12px;">
    <b>${cafeCoords.location}</b><br>
    <P>Exact location will be provided after booking.</P>
  </div>
`);

// Show popup on hover
marker.on('mouseover', function () {
  this.openPopup();
});
marker.on('mouseout', function () {
  this.closePopup();
});
