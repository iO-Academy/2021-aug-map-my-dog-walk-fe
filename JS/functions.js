
function generateForm() {
    let formContent = '<form class="d-flex flex-column" id="formWindow">'
    formContent += '<label for="name"></label>'
    formContent += '<input type="text" id="name" name="name" minlength="5" maxlength="20" placeholder="Name of walk..." />'
    formContent += '<label for="length" class="mt-2">Length of Walk (mins)</label>'
    formContent += '<input type="number" id="length" name="length" min="0" max="500" />'
    formContent += '<label for="difficulty" class="mt-2">Difficulty</label>'
    formContent += '<input type="number" id="difficulty" name="difficulty" min="1" max="5" />'
    formContent += '<label for="startInstructions" class="mt-2">Start Instructions</label>'
    formContent += '<textarea id="startInstructions" name="startInstructions" minlength="0" maxlength="200"></textarea>'
    formContent += '<input class="my-2" type="submit" value="Submit" />'
    formContent += '</form>'
    return formContent;
}

async function handleSubmit(position) {
    let newWalk = {
        name: document.querySelector('#name').value,
        length: parseInt(document.querySelector('#length').value),
        difficulty: parseInt(document.querySelector('#difficulty').value),
        startInstructions: document.querySelector('#startInstructions').value,
        markersArray: [position]
    }

    return fetch('http://localhost:3000/walks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newWalk)
    })
}

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
        console.log(marker.markersObject)
        let newMarker = new google.maps.Marker({
            ... marker.markersObject,
            map: map,
            title: marker.walkName,
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
    document.querySelector('#mapName').innerHTML = data.data.name;
    document.querySelector('#time').innerHTML = data.data.length;
    document.querySelector('#instructions').innerHTML = data.data.startInstructions;
    document.querySelector('#difficulty').innerHTML = data.data.difficulty;
}
