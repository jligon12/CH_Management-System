let updateCustomerForm = document.getElementById('update-customer-form');

updateCustomerForm.addEventListener("submit", function(e){
    
    e.preventDefault();

    let inputCustomerID = document.getElementById("input-customer-update");
    let inputName = document.getElementById("input-name-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputPhoneNum = document.getElementById("input-phoneNum-update");

    let customerIDValue = inputCustomerID.value;
    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    let phoneNumValue = inputPhoneNum.value;

//     if (isNaN(customerIDValue)) 
//         {
//             return;
//         }
    
//     if (isNaN(nameValue)) 
//         {
//             return;
//         }
    
//     if (isNaN(emailValue)) 
//         {
//             return;
//         }
    
//     if (isNaN(phoneNumValue)) 
//         {
//             return;
//         }
    let data = {
        customerID: customerIDValue,
        name: nameValue,
        email: emailValue,
        phoneNum: phoneNumValue,
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
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

