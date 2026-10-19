const form = document.getElementById("search-form");
const input = document.getElementById("search-input");

//setting up the map
const map = L.map("map", { zoomControl: false }).setView([0, 0], 2);

//original view
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);


//The Pin icon 
const pin = L.icon({
    iconUrl: "images/icon-location.svg",
    //needed for pin tip
    iconanchor: [23, 56],
});
//where its placed on the map
let marker = L.marker([0,0], {icon:pin}).addTo(map);

//handling the user input and tying it with the API data
async function lookup(query = "") {

    const url = `/.netlify/functions/lookup?q=${encodeURIComponent(query)}`;
    //error handling
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed");
        const data = await response.json();
        showResult(data);
    } catch (error) {
        alert("Search failed, Check IP address or domain");
        console.error(error);
    }

}

//results

function showResult(data) {
    const { ip, location, isp} = data; //all we need from that data pile

    //now we tie it to our HTML
    document.getElementById("ip").textContent = ip;
    document.getElementById("location").textContent = `${location.city}`;
    document.getElementById("timezone").textContent = `UTC ${location.timezone}`;
    document.getElementById("isp").textContent = isp;

    //pin movement
    map.setView([location.lat, location.lng], 9);
    marker.setLatLng([location.lat, location.lng]);

}

//eventlistenter
form.addEventListener("submit", (event) => {
    event.preventDefault(); // no need to reload, just show result
    lookup(input.ariaValueMax.trim());
});

//loading
lookup("8.8.8.8");