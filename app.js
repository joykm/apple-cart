/*
app.js

Created On: 7/12/2020
Last Updated On: 7/16/2020
Description: Entry point for "The Apple Cart" web app, Store Inventory Management System
*/

/*
Dependencies
*/

const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

/*
Create Express Server
*/

const app = express()

/*
Configure Express Server
*/

app.engine('hbs', exphbs(
    {
        defaultLayout: 'main',
        extname: '.hbs'
    }
))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

/*
Environment Configuration
*/
var config = require('./config')

if (process.env.NODE_ENV == 'development') {
    var DATABASE_CREDENTIALS = config.LOCAL_DATABASE_CREDENTIALS
    process.env.PORT = 8080
} else if (process.env.NODE_ENV == 'production') {
    var DATABASE_CREDENTIALS = process.env.CLEARDB_DATABASE_URL
}
/*
Database Setup and Configuration
*/

const connection = mysql.createPool(DATABASE_CREDENTIALS)

/*
Routing
*/

// Home/Main/Dashboard Route
app.get('/', function(req, res) {

    // Simple query to make sure the database is connected.
    var data = 'ClearDB Connected. Users are: '
    connection.query('SELECT * FROM `users`', function(error, results, fields){
        if (error) {
            data = 'ClearDB is down!'
            res.render('home', {data: data})
        } else {
        results.forEach(element => {
            data += element.first_name + ' '
        });
        res.render('home', {data: data})    
    }
    })
    
})

/* Product Catalog Route
   User will be able to view the content of proudct catalog
*/
app.get('/product_catalog', function(req, res) {
    /*Select Id, name, type, price, unit, description from products*/
    connection.query('SELECT id, name, type, price, unit, description FROM products', function(error, results, fields){
        if (error) {
            console.log("Error loading inventory page: " + error)
        }
        res.render('product_catalog', {results: results})
    })
})

// Inventory Route
app.get('/inventory', function(req, res) {
    connection.query('SELECT * FROM `products` WHERE shelf_quantity <= shelf_min_threshold`', function(error, results, fields){
        if (error) {
          console.log("Error in loading buyer page.")
        } 
        res.render('inventory', results)
    })
  })

/*
Listener
*/

app.listen(process.env.PORT)

/*
Error Handling
*/