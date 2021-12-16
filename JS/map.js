async function myMap() {
    let miniMarkers = []
    let mapProp= {
        center: {lat: 51.508742, lng: -0.120850},
        zoom:5
    };
    const map = new google.maps.Map(document.querySelector("#map"),mapProp);

    let infoWindow = new google.maps.InfoWindow({
        title: "Click anywhere to add a new route"
    });

    let toggleClickListenerMode = true
    const markerModeSubmit = document.querySelector('#markerModeSubmit')
    const markerMode = document.querySelector('#markerMode');

    markerMode.addEventListener('click', (e) => {
        e.preventDefault()
        markerModeSubmit.style.visibility = 'visible'
        toggleClickListenerMode = false
    })

    markerModeSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        let id = markerMode.value
        let url = 'http://localhost:3000/markers/' + id
        fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(miniMarkers)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            if(data){
                markerMode.value = ''
                miniMarkers = []
            }
        })
        toggleClickListenerMode = true
        document.querySelector('#mapName').innerHTML = '';
        document.querySelector('#time').innerHTML = '';
        document.querySelector('#instructions').innerHTML = '';
        document.querySelector('#difficulty').innerHTML = '';
        markerMode.style.visibility = 'hidden'
        markerModeSubmit.style.visibility = 'hidden'
    })

    map.addListener("click", (mapsMouseEvent) => {
        infoWindow.close()
        if(toggleClickListenerMode){
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
            let miniMarker = {
                position: mapsMouseEvent.latLng,
                id: value,
                icon: pinImage,
                shadow: pinShadow
            }
            new google.maps.Marker({...miniMarker, map: map});
            miniMarkers.push(miniMarker)
            console.log(miniMarkers)
        }
    })

    let markersArray = await fetchData('http://localhost:3000/markers');
    addMarkers(markersArray.data, map, () => infoWindow.close())
}
