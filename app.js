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
        res.render('index');                  // Render the index.hbs file, and also send the renderer
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

app.get('/customers', function(req, res)
    {  
        let query1 = "SELECT * FROM Customers;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('customers', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });        

app.get('/trips', function(req, res)
    {  
        let query1 = "SELECT * FROM Trips;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('trips', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

app.get('/rockets', function(req, res)
    {  
        let query1 = "SELECT * FROM Rockets;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('rockets', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });

app.get('/excursions', function(req, res)
    {  
        let query1 = "SELECT * FROM Excursions;";               // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('excursions', {data: rows});                  // Render the index.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
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

//AJAX
// app.post('/add-customer-ajax', function(req, res)
// {
//     let data = req.body;

//     query1=`INSERT INTO Customers (name, email, phoneNum) VALUES ('${data.name}', '${data.email}', '${data.phoneNum}')`;
//     db.pool.query(query1, function(error, rows, fields){
//         if (error) {
//             console.log(error)
//             res.sendStatus(400);
//     }
//     //LEAVING OUT ELSE STATEMENTS FOR NOW
//     }

// )
// })


    


// FUNCTIONING HTML FORM ADD ROW
app.post('/add-trip-form', function(req, res) 
    {
            // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        
            // Capture NULL values
        
            // Create the query and run it on the database
        query1 = `INSERT INTO Trips (destination, durationDays, price) VALUES ('${data['input-destination']}', '${data['input-durationDays']}', '${data['input-tripPrice']}')`;
        db.pool.query(query1, function(error, rows, fields){
        
                // Check to see if there was an error
            if (error) {
        
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
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
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (name, email, phoneNum) VALUES ('${data['input-name']}', '${data['input-email']}', '${data['input-phoneNum']}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
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
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
    
        // Create the query and run it on the database
        query1 = `INSERT INTO Rockets (make, model, capacity, price, inventory, inventoryAvailable) VALUES ('${data['input-make']}', '${data['input-model']}', '${data['input-capacity']}', '${data['input-price']}', '${data['input-inventory']}', '${data['input-inventoryAvailable']}')`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
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
            // Capture the incoming data and parse it back to a JS object
            let data = req.body;
        
            // Capture NULL values
        
            // Create the query and run it on the database
            query1 = `INSERT INTO Excursions (description, price, additionalDays) VALUES ('${data['input-description']}', '${data['input-price']}', '${data['input-additionalDays']}')`;
            db.pool.query(query1, function(error, rows, fields){
        
                // Check to see if there was an error
                if (error) {
        
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error)
                    res.sendStatus(400);
                }
                else
                {
                    res.redirect('/excursion_add');
                 }
                })
            })
            // // If there was no error, perform a SELECT * on bsg_people
            // query2 = `SELECT * FROM Customers;`;
            // db.pool.query(query2, function(error, rows, fields){

            //     // If there was an error on the second query, send a 400
            //     if (error) {
                    
            //         // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            //         console.log(error);
            //         res.sendStatus(400);
            //     }
            //     // If all went well, send the results of the query back.
            //     else
            //     {
            //         res.send(rows);
            //     }
//     })
// }) 

// /*
//     LISTENER
// */
app.listen(PORT, function(){            // 'listener' receives incoming requests on the specified PORT
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
