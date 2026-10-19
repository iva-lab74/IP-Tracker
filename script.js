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

//api methods
async function lookup(query = "") {

}



//completed form , then search

//results