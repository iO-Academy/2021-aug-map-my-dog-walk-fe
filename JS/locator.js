const locatorButton = document.querySelector('#locationButton')
const locationDiv = document.querySelector('#location')

locatorButton.addEventListener('click', handleLocatorClick)

function handleLocatorClick(e){
    e.preventDefault()
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,errorCallback,{timeout:10000});
    } else {
        locationDiv.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    locationDiv.innerHTML = '<div>Latitude: ' + position.coords.latitude + '</div>' +
        '<div>Longitude: ' + position.coords.longitude + '</div>';
}

function errorCallback(){
    locationDiv.innerHTML = '<div>Location not found</div>'
}