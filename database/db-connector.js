// ./database/db-connector.js

// Define instance of mysql
var mysql = require('mysql')

// Create 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_ligonj',
    password        : '<password>',
    database        : 'cs340_ligonj'
})

// Export it for use in our applicaiton
module.exports.pool = pool;