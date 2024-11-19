let updateRocketForm = document.getElementById('update-rocket-form');

updateRocketForm.addEventListener("submit", function(e){
    
    e.preventDefault();

    let inputRocketID = document.getElementById("input-rocket-update");
    let inputMake = document.getElementById("input-make-update");
    let inputModel = document.getElementById("input-model-update");
    let inputCapacity = document.getElementById("input-capacity-update");
    let inputPrice = document.getElementById("input-price-update");
    let inputInventory = document.getElementById("input-inventory-update");
    let inputInventoryAvailable = document.getElementById("input-inventoryAvailable-update");

    let rocketIDValue = inputRocketID.value;
    let makeValue = inputMake.value;
    let modelValue = inputModel.value;
    let capacityValue = inputCapacity.value;
    let priceValue = inputPrice.value;
    let inventoryValue = inputInventory.value;
    let inventoryAvailableValue = inputInventoryAvailable.value;

    let data = {
        rocketID: rocketIDValue,
        make: makeValue,
        model: modelValue,
        capacity: capacityValue,
        price: priceValue,
        inventory: inventoryValue,
        inventoryAvailable: inventoryAvailableValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-rocket-ajax", true);
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
