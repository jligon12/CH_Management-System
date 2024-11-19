let updateTripForm = document.getElementById('update-trip-form');

updateTripForm.addEventListener("submit", function(e){
    
    e.preventDefault();

    let inputTripID = document.getElementById("input-trip-update");
    let inputDestination = document.getElementById("input-destination-update");
    let inputDurationDays = document.getElementById("input-durationDays-update");
    let inputPrice = document.getElementById("input-price-update");
    

    let tripIDValue = inputTripID.value;
    let destinationValue = inputDestination.value;
    let durationDaysValue = inputDurationDays.value;
    let priceValue = inputPrice.value;


    let data = {
        tripID: tripIDValue,
        destination: destinationValue,
        durationDays: durationDaysValue,
        price: priceValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-trip-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log('Success');
    //         updateRow(xhttp.response, nameValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
})