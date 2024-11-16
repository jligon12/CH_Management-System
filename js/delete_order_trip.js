function deleteOrder_Trip(ordersTripsID) {
    let data = {
        ordersTripsID: ordersTripsID
    };

    function deleteRow(ordersTripsID){
    let table = document.getElementById("orders_trips-table");
    for (let i=0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == ordersTripsID){
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
            deleteRow(ordersTripsID);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(ordersTripsID){
    let table = document.getElementById("orders_trips-table");
    for (let i=0, row; row = table.rows[i]; i++){
        if (table.rows[i].getAttribute("data-value") == ordersTripsID){
            table.deleteRow(i);
            break;
        }
    }
}