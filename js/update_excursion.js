let updateExcursionForm = document.getElementById('update-excursion-form');

updateExcursionForm.addEventListener("submit", function(e){
    
    e.preventDefault();

    let inputExcursionID = document.getElementById("input-excursion-update");
    let inputDescription = document.getElementById("input-description-update");
    let inputPrice = document.getElementById("input-price-update");
    let inputAdditionalDays = document.getElementById("input-additionalDays-update");

    let excursionIDValue = inputExcursionID.value;
    let descriptionValue = inputDescription.value;
    let priceValue = inputPrice.value;
    let additionalDaysValue = inputAdditionalDays.value;

    let data = {
        excursionID: excursionIDValue,
        description: descriptionValue,
        price: priceValue,
        additionalDays: additionalDaysValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-excursion-ajax", true);
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
