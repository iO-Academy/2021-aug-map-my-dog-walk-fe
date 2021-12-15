

async function myMap() {
    let miniMarkers = []
    let mapProp= {
        center: {lat: 51.508742, lng: -0.120850},
        zoom:5
    };
    const map = new google.maps.Map(document.querySelector("#map"),mapProp);

    let testMarker =new google.maps.Marker({
        position: {lat: 51.508742, lng: -0.120850},
        map: map,
        customInfo: "test",
        startInstructions: 'weeeeee',
        difficulty: 3,
        length: 3,
        name: 'test',
        id: 'gob1'
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

    let toggle = true
    const markerModeSubmit = document.querySelector('#markerModeSubmit')
    const markerMode = document.querySelector('#markerMode');

    markerMode.addEventListener('click', (e) => {
        e.preventDefault()
        markerModeSubmit.style.visibility = 'visible'
        toggle = false
    })
    markerModeSubmit.addEventListener('click', async (e) => {
        e.preventDefault()
        let value = markerMode.value
        let url = 'http://localhost:3000/markers' + value
        await fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(miniMarkers)
        })
        toggle = true
        document.querySelector('#mapName').innerHTML = '';
        document.querySelector('#time').innerHTML = '';
        document.querySelector('#instructions').innerHTML = '';
        document.querySelector('#difficulty').innerHTML = '';
        markerMode.style.visibility = 'hidden'
        markerMode.value = ''
        markerModeSubmit.style.visibility = 'hidden'

    })

    map.addListener("click", (mapsMouseEvent) => {
        infoWindow.close()
        if(toggle){
            document.querySelector('#mapName').innerHTML = '';
            document.querySelector('#time').innerHTML = '';
            document.querySelector('#instructions').innerHTML = '';
            document.querySelector('#difficulty').innerHTML = '';
            markerMode.style.visibility = 'hidden'
            markerMode.value = ''

            let infoPosition = mapsMouseEvent.latLng
            infoWindow = new google.maps.InfoWindow({
                content: generateForm(),
                position: infoPosition
            });

            infoWindow.open(map)

            google.maps.event.addListener(infoWindow, 'domready', (e) => {
                document.querySelector('#formWindow').addEventListener('submit',    async (e) => {
                    e.preventDefault()
                    let response = handleSubmit(infoPosition)
                    infoWindow.close()
                    response.then(res => res.json()).then((response) => {
                            document.querySelector('#addRoute').textContent = response.ok ? 'Route added!' : 'Something went wrong :('
                        }
                    )
                })
            });
        }else{
            let pinColor = "FE7569";
            let pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
                new google.maps.Size(21, 34),
                new google.maps.Point(0,0),
                new google.maps.Point(10, 34));
            let pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
                new google.maps.Size(40, 37),
                new google.maps.Point(0, 0),
                new google.maps.Point(12, 35));
            let value = markerMode.value
            let miniMarker = new google.maps.Marker({
                position: mapsMouseEvent.latLng,
                map: map,
                id: value,
                icon: pinImage,
                shadow: pinShadow
            });
            miniMarkers.push(miniMarker)
        }
    })

    let markersArray = await fetchData('http://localhost:3000/markers');
    google.maps.event.addListener( testMarker, "click", function() {
        document.querySelector('#mapName').innerHTML = testMarker.name;
        document.querySelector('#time').innerHTML = testMarker.length;
        document.querySelector('#instructions').innerHTML = testMarker.startInstructions;
        document.querySelector('#difficulty').innerHTML = testMarker.difficulty;
        markerMode.style.visibility = "visible"
        markerMode.value = testMarker.id
    })
    addMarkers(markersArray, map);
    let markerTest = map.Markers
    console.log(markerTest)
}
