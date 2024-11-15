function deleteRocket(rocketID) {
    let data = {
        rocketID: rocketID
    };

    function deleteRow(rocketID){
    let table = document.getElementById("rockets-table");
    for (let i=0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == rocketID){
            table.deleteRow(i);
            break;
        }
    }
}

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-rocket-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(rocketID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(rocketID){
    let table = document.getElementById("rockets-table");
    for (let i=0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == rocketID){
            table.deleteRow(i);
            break;
        }
    }
}