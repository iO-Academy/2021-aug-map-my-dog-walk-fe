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
    })
}