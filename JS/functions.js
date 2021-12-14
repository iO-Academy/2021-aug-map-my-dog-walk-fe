async function fetchData(url) {
    let response =  await fetch(url);
    return await response.json();
}

async function addMarkers(markersArray, map) {
    const markerIcons = {
        "1": 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        "2": 'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png',
        "3": 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
        "4": 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        "5": 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
    }

    markersArray.forEach(function (marker) {
        let newMarker = new google.maps.Marker({
            position: marker.markersObject,
            map,
            title: marker.name,
            id: marker.id,
            difficulty: marker.difficulty,
            icon: markerIcons[marker.difficulty]
        })
        google.maps.event.addListener(newMarker, "click", function() {
            displayWalkInfo(newMarker.id);
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
