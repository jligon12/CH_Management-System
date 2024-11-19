let updateOrderForm = document.getElementById('update-order-form');

updateOrderForm.addEventListener("submit", function(e){
    
    e.preventDefault();

    let inputOrderID = document.getElementById("input-order-update");
    let inputCustomerID = document.getElementById("input-customerID-update");
    let inputRocketID = document.getElementById("input-rocketID-update");
    let inputPriceRocketRented = document.getElementById("input-priceRocketRented-update");
    let inputExcursionID = document.getElementById("input-excursionID-update");
    let inputPriceExcursionSold = document.getElementById("input-priceExcursionSold-update");
    let inputOrderDate = document.getElementById("input-orderDate-update");
    let inputTravelDays = document.getElementById("input-travelDays-update");
    let inputTotalPaid = document.getElementById("input-totalPaid-update");
    let inputOrderStatus = document.getElementById("input-orderStatus-update");



    let orderIDValue = inputOrderID.value;
    let customerIDValue = inputCustomerID.value;
    let rocketIDValue = inputRocketID.value;
    let priceRocketRentedValue = inputPriceRocketRented.value;
    let excursionIDValue = inputExcursionID.value;
    let priceExcursionSoldValue = inputPriceExcursionSold.value;
    let orderDateValue = inputOrderDate.value;
    let travelDaysValue = inputTravelDays.value;
    let totalPaidValue = inputTotalPaid.value;
    let orderStatusValue = inputOrderStatus.value;

    let data = {
        orderID: orderIDValue,
        customerID: customerIDValue,
        rocketID: rocketIDValue,
        priceRocketRented: priceRocketRentedValue,
        excursionID: excursionIDValue,
        priceExcursionSold: priceExcursionSoldValue,
        orderDate: orderDateValue,
        travelDays: travelDaysValue,
        totalPaid: totalPaidValue,
        orderStatus: orderStatusValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-order-ajax", true);
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