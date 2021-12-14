async function myMap() {
    let mapProp= {
        center: {lat: 51.508742, lng: -0.120850},
        zoom:5
    };
    const map = new google.maps.Map(document.querySelector("#map"),mapProp);

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
}
