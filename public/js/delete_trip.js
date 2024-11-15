function deleteTrip(tripID) {
    let data = {
        tripID: tripID
    };

    function deleteRow(tripID){
    let table = document.getElementById("trips-table");
    for (let i=0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == tripID){
            table.deleteRow(i);
            break;
        }
    }
}

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-trip-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(tripID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(tripID){
    let table = document.getElementById("trips-table");
    for (let i=0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == tripID){
            table.deleteRow(i);
            break;
        }
    }
}