let updateOrderTripForm = document.getElementById('update-order_trip-form');

updateOrderTripForm.addEventListener("submit", function(e){
    
    e.preventDefault();

    let inputOrdersTripsID = document.getElementById("input-ordersTrips-update");
    let inputTripID = document.getElementById("input-tripID-update");
    let inputOrderID = document.getElementById("input-orderID-update");
    let inputPriceTripSold = document.getElementById("input-priceTripSold-update");
    let inputDepartureDate = document.getElementById("input-departureDate-update");
    let inputReturnDate = document.getElementById("input-returnDate-update");
    let inputTotalGuests = document.getElementById("input-totalGuests-update");

    let ordersTripsIDValue = inputOrdersTripsID.value;
    let tripIDValue = inputTripID.value;
    let orderIDValue = inputOrderID.value;
    let priceTripSoldValue = inputPriceTripSold.value;
    let departureDateValue = inputDepartureDate.value;
    let returnDateValue = inputReturnDate.value;
    let totalGuestsValue = inputTotalGuests.value;

    let data = {
        ordersTripsID: ordersTripsIDValue,
        tripID: tripIDValue,
        orderID: orderIDValue,
        priceTripSold: priceTripSoldValue,
        departureDate: departureDateValue,
        returnDate: returnDateValue,
        totalGuests: totalGuestsValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-order_trip-ajax", true);
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