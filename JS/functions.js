async function fetchData(url) {
    let response =  await fetch(url);
    return await response.json();
}

async function addMarkers(markersArray, map) {
    markersArray.forEach(function (marker) {
        let newMarker = new google.maps.Marker({
            position: marker.markersObject,
            map,
            title: marker.name
        })
        newMarker.id = marker.id;
        // Marker Event Listener
        google.maps.event.addListener(newMarker, "click", function() {
            displayWalkInfo(newMarker.id)
        })
    })
}

async function displayWalkInfo(id) {
    const data = await fetchData('http://localhost:3000/markers/' + id);
    document.querySelector('#mapName').innerHTML = data.name;
    document.querySelector('#time').innerHTML = data.length;
    document.querySelector('#instructions').innerHTML = data.startInstructions;
    document.querySelector('#difficulty').innerHTML = data.difficulty;
}
