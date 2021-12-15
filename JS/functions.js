const markerMode = document.querySelector('#markerMode');

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

async function fetchData(url, method = {}) {
    let response =  await fetch(url, method);
    return await response.json();
}

async function addMarkers(markersArray, map) {
    markersArray.forEach(function (marker) {
        let newMarker = new google.maps.Marker({...marker.markersObject, map: map})
        newMarker.id = marker.id;
        newMarker.name = marker.name
        // Marker Event Listener
        google.maps.event.addListener(newMarker, "click", function() {
            displayWalkInfo(newMarker.id)
            markerMode.value = newMarker.id
        })
    })
}

async function displayWalkInfo(id) {
    const data = await fetchData('http://localhost:3000/markers/' + id);
    document.querySelector('#mapName').innerHTML = data.name;
    document.querySelector('#time').innerHTML = data.length;
    document.querySelector('#instructions').innerHTML = data.startInstructions;
    document.querySelector('#difficulty').innerHTML = data.difficulty;
    document.querySelector('#markerMode').style.visibility = "visible";
}
