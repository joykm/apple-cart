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

/*
Routing
*/

app.get('/', function(req, res) {
    res.render('home')
})

/*
Listener
*/

app.listen(app.get('port'))