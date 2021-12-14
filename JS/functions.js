
function generateForm() {
    let formContent = '<form class="d-flex flex-column" id="formWindow">'
    formContent += '<label for="name"></label>'
    formContent += '<input type="text" id="name" name="name" minlength="0" maxlength="20" placeholder="Name of walk..." />'
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
    let newRoute = {
        name: document.querySelector('#name').value,
        length: parseInt(document.querySelector('#length').value),
        difficulty: parseInt(document.querySelector('#difficulty').value),
        startInstructions: document.querySelector('#startInstructions').value,
        markersArray: [position]
    }

    return fetch('http://localhost:3000', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newRoute)
    })
}

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