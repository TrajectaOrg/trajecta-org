document.addEventListener("DOMContentLoaded", () => {
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const map = L.map("map").setView([20, 0], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
  }).addTo(map);

  fetch("/alumni?limit=500") // you can create a lightweight /api endpoint
    .then((res) => res.json())
    .then((data) => {
      data.forEach((alum) => {
        if (!alum.lat || !alum.lng) return;
        L.circleMarker([alum.lat, alum.lng], { radius: 4 })
          .addTo(map)
          .bindPopup(
            `<strong>${alum.name}</strong><br>${alum.olympiad} ${alum.year} (${alum.medal})`
          );
      });
    });
});
