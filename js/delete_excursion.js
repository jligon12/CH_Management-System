function deleteExcursion(excursionID) {
    let data = {
        excursionID: excursionID
    };

    function deleteRow(excursionID){
    let table = document.getElementById("excursions-table");
    for (let i=0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == excursionID){
            table.deleteRow(i);
            break;
        }
    }
}

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-excursion-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(excursionID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(excursionID){
    let table = document.getElementById("excursions-table");
    for (let i=0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == excursionID){
            table.deleteRow(i);
            break;
        }
    }
}