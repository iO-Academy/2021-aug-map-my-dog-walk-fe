function myMap() {
    let mapProp= {
        center: {lat: 51.508742, lng: -0.120850},
        zoom:5
    };
    const map = new google.maps.Map(document.querySelector("#map"),mapProp);

    // new google.maps.Marker({
    //     position: {lat: 51.508742, lng: -0.120850},
    //     map
    // })

    let infoWindow = new google.maps.InfoWindow({
        title: "Potatoes"
    });

    map.addListener("click", (mapsMouseEvent) => {
        infoWindow.close()
        infoWindow = new google.maps.InfoWindow({
            content: generateForm(),
            position: mapsMouseEvent.latLng,
        });

        infoWindow.open(map)
    })
}

function generateForm() {
    let formContent = '<form class="d-flex flex-column">'
    formContent += '<label for="name"></label><input type="text" id="name" name="name" minlength="5" maxlength="20" placeholder="Name of walk..." />'
    formContent += '<label class="mt-2">Length of Walk (mins)</label>'
    formContent += '<input type="number" id="lengthOfWalk" name="lengthOfWalk" min="0" max="500" />'
    formContent += '<label class="mt-2">Difficulty</label>'
    formContent += '<input type="number" id="difficulty" name="difficulty" min="1" max="5" />'
    formContent += '<label class="mt-2">Start Instructions</label>'
    formContent += '<textarea id="startInstructions" name="startInstructions" minlength="0" maxlength="200"></textarea>'
    formContent += '<input class="my-2" type="submit" value="Submit" />'
    formContent += '</form>'
    return formContent;
}