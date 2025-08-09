// Predefined KSRTC bus stands in Trivandrum (lat, lon)
const busStands = [
    { name: "Thampanoor KSRTC Bus Stand", lat: 8.4871, lon: 76.9524 },
    { name: "Peroorkada KSRTC Bus Stand", lat: 8.5360, lon: 76.9582 },
    { name: "East Fort KSRTC Bus Stand", lat: 8.4824, lon: 76.9435 },
    { name: "Vellanad KSRTC Bus Stand", lat: 8.4800, lon: 77.0400 }
];

// Predefined schools, colleges, and landmarks
const places = [
    { name: "Aries Plex Cinemas", lat: 8.5003, lon: 76.9489 },
    { name: "College of Engineering Trivandrum", lat: 8.5576, lon: 76.8810 },
    { name: "Mar Ivanios College", lat: 8.5215, lon: 76.9381 },
    { name: "Government Model Boys Higher Secondary School", lat: 8.4863, lon: 76.9490 }
];

// Function to calculate distance using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function findNearestBusStand() {
    const input = document.getElementById("placeInput").value.trim().toLowerCase();
    const place = places.find(p => p.name.toLowerCase() === input);

    if (!place) {
        document.getElementById("result").textContent = "Place not found. Please enter a valid name.";
        return;
    }

    let nearest = null;
    let minDistance = Infinity;

    busStands.forEach(stand => {
        const distance = getDistance(place.lat, place.lon, stand.lat, stand.lon);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = stand;
        }
    });

    document.getElementById("result").textContent =
        `The nearest KSRTC bus stand is at ${nearest.name} and it is ${minDistance.toFixed(2)} km away from you.`;
}
