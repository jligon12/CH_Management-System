// App.js

/*
    SETUP
*/
var express = require('express');   // express library for the web server
var app     = express();            // instantiate an express object to interact with the server

//endable express for JSON and form data
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT        = 9876;                 // Set a port number

var db = require('./database/db-connector');

//connecting to hbs
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


// /*
//     ROUTES
// */
app.get('/', function(req, res)
    {  
        res.render('index');                  
    });

app.get('/trip_add', function(req, res)
    {  
        res.render('trip_add');                  
    });      
                        

app.get('/customer_add', function(req, res)
    {  
        res.render('customer_add');                  
    }); 

app.get('/rocket_add', function(req, res)
    {  
        res.render('rocket_add');                  
    }); 

app.get('/excursion_add', function(req, res)
    {  
        res.render('excursion_add');                  
    }); 

app.get('/order_add', function(req, res)
    {  
        res.render('order_add');                  
    }); 

app.get('/order_trip_add', function(req, res)
    {  
        res.render('order_trip_add');                  
    });

app.get('/customers', function(req, res)
    {  
        let query1 = "SELECT * FROM Customers;";               

        db.pool.query(query1, function(error, rows, fields){    

            res.render('customers', {data: rows});                  
        })                                                      
    });        

app.get('/trips', function(req, res)
    {  
        let query1 = "SELECT * FROM Trips;";               

        db.pool.query(query1, function(error, rows, fields){    

            res.render('trips', {data: rows});                  
        })                                                      
    });

app.get('/rockets', function(req, res)
    {  
        let query1 = "SELECT * FROM Rockets;";               

        db.pool.query(query1, function(error, rows, fields){    

            res.render('rockets', {data: rows});                  
        })                                                      
    });

app.get('/excursions', function(req, res)
    {  
        let query1 = "SELECT * FROM Excursions;";               

        db.pool.query(query1, function(error, rows, fields){    

            res.render('excursions', {data: rows});                  
        })                                                      
    });

app.get('/orders', function(req, res)
    {  
        let query1 = "SELECT * FROM Orders;";               

        db.pool.query(query1, function(error, rows, fields){    

            res.render('orders', {data: rows});                  
        })                                                      
    });

app.get('/orders_trips', function(req, res)
    {  
        let query1 = "SELECT * FROM Orders_Trips;";               

        db.pool.query(query1, function(error, rows, fields){    

            res.render('orders_trips', {data: rows});                  
        })                                                      
    });

app.delete('/delete-trip-ajax/', function(req,res,next){
        let data = req.body;
        let tripID = parseInt(data.tripID);
        let Trips = `DELETE FROM Trips WHERE tripID = ?`;

            db.pool.query(Trips, [tripID], function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                    }
                    else {
                        res.sendStatus(204);
                    }
            }
)});

app.delete('/delete-rocket-ajax/', function(req,res,next){
    let data = req.body;
    let rocketID = parseInt(data.rocketID);
    let Rockets = `DELETE FROM Rockets WHERE rocketID = ?`;

        db.pool.query(Rockets, [rocketID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
                }
                else {
                    res.sendStatus(204);
                }
        }
)});

app.delete('/delete-excursion-ajax/', function(req,res,next){
    let data = req.body;
    let excursionID = parseInt(data.excursionID);
    let Excursions = `DELETE FROM Excursions WHERE excursionID = ?`;

        db.pool.query(Excursions, [excursionID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
                }
                else {
                    res.sendStatus(204);
                }
        }
)});

app.delete('/delete-order_trip-ajax/', function(req,res,next){
    let data = req.body;
    let order_tripID = parseInt(data.order_tripID);
    let Orders_Trips = `DELETE FROM Orders_Trips WHERE order_tripID = ?`;

        db.pool.query(Orders_Trips, [order_tripID], function(error, rows, fields){
            if (error) {
                console.log(error);
                res.sendStatus(400);
                }
                else {
                    res.sendStatus(204);
                }
        }
)});


// FUNCTIONING HTML FORM ADD ROW
app.post('/add-trip-form', function(req, res) 
    {
        let data = req.body;
        
            // Add later - Capture NULL values
        
        query1 = `INSERT INTO Trips (destination, durationDays, price) VALUES ('${data['input-destination']}', '${data['input-durationDays']}', '${data['input-tripPrice']}')`;
        db.pool.query(query1, function(error, rows, fields){
        
            if (error) {
                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                res.redirect('/trip_add');
            }
                   
            })
        })                 


app.post('/add-customer-form', function(req, res) 
{
    let data = req.body;

    query1 = `INSERT INTO Customers (name, email, phoneNum) VALUES ('${data['input-name']}', '${data['input-email']}', '${data['input-phoneNum']}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            res.redirect('/customer_add');
         }
        })
    })

app.post('/add-rocket-form', function(req, res) 
    {
        let data = req.body;
    
        query1 = `INSERT INTO Rockets (make, model, capacity, price, inventory, inventoryAvailable) VALUES ('${data['input-make']}', '${data['input-model']}', '${data['input-capacity']}', '${data['input-price']}', '${data['input-inventory']}', '${data['input-inventoryAvailable']}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            if (error) {

                console.log(error)
                res.sendStatus(400);
            }
            else
            {
                res.redirect('/rocket_add');
             }
            })
        })

app.post('/add-excursion-form', function(req, res) 
        {
            let data = req.body;

            query1 = `INSERT INTO Excursions (description, price, additionalDays) VALUES ('${data['input-description']}', '${data['input-price']}', '${data['input-additionalDays']}')`;
            db.pool.query(query1, function(error, rows, fields){
        
                if (error) {

                    console.log(error)
                    res.sendStatus(400);
                }
                else
                {
                    res.redirect('/excursion_add');
                 }
                })
            })

app.post('/add-order_trip-form', function(req, res) 
            {
                let data = req.body;
    
                query1 = `INSERT INTO Orders_Trips (tripID, orderID, priceTripSold, departureDate, returnDate, totalGuests) VALUES ('${data['input-tripID']}', '${data['input-orderID']}', '${data['input-priceTripSold']}'), '${data['input-departureDate']}', '${data['input-returnDate']}', '${data['input-totalGuests']}')`;
                db.pool.query(query1, function(error, rows, fields){
            
                    if (error) {
    
                        console.log(error)
                        res.sendStatus(400);
                    }
                    else
                    {
                        res.redirect('/order_trip_add');
                     }
                    })
                })

 app.post('/add-order-form', function(req, res) 
                {
                    let data = req.body;
        
                    query1 = `INSERT INTO Orders (customerID, rocketID, priceRocketRented, excursionID, priceExcursionSold, orderDate, travelDays, totalPaid, orderStatus) VALUES ('${data['input-customerID']}', '${data['input-rocketID']}', '${data['input-priceRocketRented']}'), '${data['input-excursionID']}', '${data['input-priceExcursionSold']}', '${data['input-orderDate']}', '${data['input-travelDays']}', '${data['input-totalPaid']}', '${data['input-orderStatus']}')`;
                    db.pool.query(query1, function(error, rows, fields){
                
                        if (error) {
        
                            console.log(error)
                            res.sendStatus(400);
                        }
                        else
                        {
                            res.redirect('/order_add');
                         }
                        })
                    })

// /*
//     LISTENER
// */
app.listen(PORT, function(){            // 'listener' receives incoming requests on the specified PORT
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
