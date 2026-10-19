const form = document.getElementById("search-form");
const input = document.getElementById("search-input");

//setting up the map
const map = L.map("map", { zoomControl: false }).setView([0, 0], 2);

//original view
L.titleLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);


//The Pin icon 
const pin = L.icon({
    iconUrl: "images/icon-location.svg",
    //needed for pin tip
    iconanchor: [23, 56],
});
//where its placed on the map
let marker = L.marker([0.0], {icon:pin}).addTo(map);

//handling the user input and tying it with the API data
async function lookup(query = "") {

    const theIP = /^(\d{1,3}\.){3}\d{1,3}$/.test(query); // ip address input
    const param = query ? (theIP ? `&ipAddress=${query}` : `&domain=${query}`) : ""; // is it either the domain or ip address
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_jTBvHDxGSYnhY47ntsm6gTpWHyCOV&ipAddress=8.8.8.8`;

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
    document.getElementById("location").textContent = `${location.region}`;
    document.getElementById("timezone").textContent = `UTC ${location.timezone}`;
    document.getElementById("isp").textContent = isp;

}

//eventlistenter