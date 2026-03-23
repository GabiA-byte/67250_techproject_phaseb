const now = new Date();

// Greeting
function greeting(h) {
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
}

const greetingEl = document.getElementById("greeting");
if (greetingEl) {
    greetingEl.textContent = greeting(now.getHours()) + ", Welcome to MonoMuse";
}

// Year
const copyYear = document.getElementById("copyYear");
if (copyYear) {
    copyYear.textContent = "Copyright © " + now.getFullYear();
}

// View More
const viewMore = document.getElementById("viewMore");
const viewLess = document.getElementById("viewLess");
const explore = document.getElementById("exploreSection");

if (viewMore) {
    viewMore.onclick = () => {
        explore.style.display = "block";
        viewMore.style.display = "none";
        viewLess.style.display = "inline-block";
    };

    viewLess.onclick = () => {
        explore.style.display = "none";
        viewMore.style.display = "inline-block";
        viewLess.style.display = "none";
    };
}

// NAV TOGGLE
function toggleNav() {
    const nav = document.getElementById("myNav");

    if (nav.className === "nav_bar") {
        nav.className += " responsive";
    } else {
        nav.className = "nav_bar";
    }
}
// ── LEAFLET MAP ──
const mapContainer = document.getElementById("map");

if (mapContainer) {

    // ── LEAFLET MAP ──
const mapContainer = document.getElementById("map");

if (mapContainer) {

    const lat = 40.4433;
    const lng = -79.9525;

    const map = L.map('map').setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup("Carnegie Museum of Natural History")
        .openPopup();
}
}
