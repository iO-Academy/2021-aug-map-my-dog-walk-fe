function myMap() {
    let mapProp= {
        center: {lat: 51.508742, lng: -0.120850},
        zoom:5
    };
    const map = new google.maps.Map(document.querySelector("#map"),mapProp);

    new google.maps.Marker({
        position: {lat: 51.508742, lng: -0.120850},
        map,
        title: "Hello World!"
    })
}