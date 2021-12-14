
async function myMap() {
    let mapProp= {
        center: {lat: 51.508742, lng: -0.120850},
        zoom:5
    };
    const map = new google.maps.Map(document.querySelector("#map"),mapProp);

    let testMarker =new google.maps.Marker({
        position: {lat: 51.508742, lng: -0.120850},
        map: map,
        customInfo: "test",
    })
    let response =  await fetch('http://localhost:3000/markers');
    let markers = await response.json();

    markers.forEach(function (marker) {
        let newMarker = new google.maps.Marker({
            position: marker.markersObject,
            map,
            title: marker.name
        })
        newMarker.id = marker.id;
    })

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
            document.querySelector('#formWindow').addEventListener('submit',    async (e) => {
                e.preventDefault()
                let response = handleSubmit(infoPosition)
                infoWindow.close()
                response.then((response) => {
                    document.querySelector('#addRoute').textContent = response.ok ? 'Route added!' : 'Something went wrong :('
                    }
                )
            })
        });
    })

    let markersArray = await fetchData('http://localhost:3000/markers');
    addMarkers(markersArray, map);

}
