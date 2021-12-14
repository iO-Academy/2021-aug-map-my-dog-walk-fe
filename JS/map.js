async function myMap() {
    let mapProp= {
        center: {lat: 51.508742, lng: -0.120850},
        zoom:5
    };
    const map = new google.maps.Map(document.querySelector("#map"),mapProp);
    let markersArray = await fetchData('http://localhost:3000/markers');
    addMarkers(markersArray, map);
}
