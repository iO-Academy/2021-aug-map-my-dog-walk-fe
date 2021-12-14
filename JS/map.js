function myMap() {
    let mapProp= {
        center: {lat: 51.508742, lng: -0.120850},
        zoom:5
    };
    const map = new google.maps.Map(document.querySelector("#map"),mapProp);

    let infoWindow = new google.maps.InfoWindow({
        title: "Click anywhere to add a new route"
    });

    map.addListener("click", (mapsMouseEvent) => {
        infoWindow.close()
        let infoPosition = mapsMouseEvent.latLng
        infoWindow = new google.maps.InfoWindow({
            content: generateForm(),
            position: infoPosition
        });

        infoWindow.open(map)

        google.maps.event.addListener(infoWindow, 'domready', () => {
            document.querySelector('#formWindow').addEventListener('submit', (e) => {
                e.preventDefault()
                handleSubmit(infoPosition)
                infoWindow.close()
                alert("New route added!")
            })
        });
    })

}

function generateForm() {
    let formContent = '<form class="d-flex flex-column" id="formWindow">'
    formContent += '<label for="name"></label>'
    formContent += '<input type="text" id="name" name="name" minlength="0" maxlength="20" placeholder="Name of walk..." />'
    formContent += '<label class="mt-2">Length of Walk (mins)</label>'
    formContent += '<input type="number" id="length" name="length" min="0" max="500" />'
    formContent += '<label class="mt-2">Difficulty</label>'
    formContent += '<input type="number" id="difficulty" name="difficulty" min="1" max="5" />'
    formContent += '<label class="mt-2">Start Instructions</label>'
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

    await fetch('http://localhost:3000', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newRoute)
    })
}