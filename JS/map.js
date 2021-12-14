function myMap() {
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
}