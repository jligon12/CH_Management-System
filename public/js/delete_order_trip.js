function deleteOrder_Trip(order_tripID) {
    let data = {
        order_tripID: order_tripID
    };

    function deleteRow(order_tripID){
    let table = document.getElementById("orders_trips-table");
    for (let i=0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == order_tripID){
            table.deleteRow(i);
            break;
        }
    }
}

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-order_trip-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(order_tipID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(order_tripID){
    let table = document.getElementById("orders_trips-table");
    for (let i=0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == order_tripID){
            table.deleteRow(i);
            break;
        }
    }
}