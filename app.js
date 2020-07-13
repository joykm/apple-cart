/*
app.js

Created On: 7/12/2020
Last Updated On: 7/12/2020
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

app.set('port', process.env.PORT || 8080)

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
Database Setup and Configuration
*/

const connection = mysql.createConnection(process.env.CLEARDB_DATABASE_URL)

/*
Routing
*/

app.get('/', function(req, res) {

    // Simple query to make sure the database is connected.
    var data = 'ClearDB Connected. Users are: '
    connection.query('SELECT * FROM `users`', function(error, results, fields){
        results.forEach(element => {
            data += element.first_name + ' '
        });
        res.render('home', {data: data})    
    })
    
})

/*
Listener
*/

app.listen(app.get('port'))