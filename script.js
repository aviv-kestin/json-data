let artists;
let sortByAsc = true;
let selectedMovement = "";
let filteredArtists = [];

document.addEventListener("DOMContentLoaded", function () {
    const toggleSortButton = document.getElementById("toggleSort");
    const movementSelect = document.getElementById("movementSelect");

    toggleSortButton.addEventListener("click", toggleSort);
    movementSelect.addEventListener("change", filterByMovement);

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            artists = data;
            renderArtists(artists);
        })
        .catch(error => console.error("Error fetching artists:", error));
});

function toggleSort() {
    sortByAsc = !sortByAsc;
    if (selectedMovement === "") {
        artists.sort((a, b) => sortByAsc ? a.born - b.born : b.born - a.born);
        renderArtists(artists);
    } else {
        filteredArtists.sort((a, b) => sortByAsc ? a.born - b.born : b.born - a.born);
        renderArtists(filteredArtists);
    }
}

function filterByMovement() {
    selectedMovement = this.value;
    if (selectedMovement === "") {
        renderArtists(artists);
    } else {
        filteredArtists = artists.filter(artist =>
            Array.isArray(artist.movement) ? artist.movement.includes(selectedMovement) : artist.movement === selectedMovement
        );
        renderArtists(filteredArtists);
    }
    document.getElementById("movementSelect").classList.add("centered");
}

function renderArtists(artistsData) {
    const artistsGrid = document.getElementById("artistsGrid");
    artistsGrid.innerHTML = ""; 

    artistsData.forEach(artist => {
        let movement = Array.isArray(artist.movement) ? artist.movement[0] : artist.movement;
        if (selectedMovement !== "" && Array.isArray(artist.movement) && artist.movement.includes(selectedMovement)) {
            movement = selectedMovement;
        } else if (selectedMovement === artist.movement) {
            movement = selectedMovement;
        }

        const div = document.createElement("div");
        div.textContent = `${artist.name} (${artist.born})`;
        div.classList.add("artist", movement); 
        artistsGrid.appendChild(div);
    });
}

