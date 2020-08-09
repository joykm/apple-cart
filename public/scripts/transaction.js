/*
transaction.js
Author: George Kochera
Description: Handles the AJAX calls necessary for keeping the checkout basket up to date and populating the available items for the user to select during checkout.
*/

// Get the main elements from the DOM so we can manipulate them later
const productWindow = document.querySelector('#gt_available_products_on_shelf_window')
const basketWindow = document.querySelector('#gt_products_in_basket_window')
const productList = document.querySelector('#gt_available_products_list_group')
const basketTable = document.querySelector('#gt_products_in_basket_table tbody')
const checkoutButton = document.querySelector('#gt_checkout_button')
const clearButton = document.querySelector('#gt_clear_button')
const errorMessageText = document.querySelector('#gt_transaction_error_message')

// Save the created basket in an object for easy access later
let basket = {  
    items: {},
    subtotal: '',
    totalTax: '',
    grandTotal: '',
    userId: 0,
    empty: true    
}

// Add a listener to populate the page when its done loading
window.addEventListener("load", function() {
    productTableBuilder()
    checkoutButton.addEventListener("click", function() {
        checkout()
    })
    clearButton.addEventListener("click", function() {
        emptyBasket()
        clearBasketTable()
        clearTotals()
    })
})

// Define a method to make requests of the database, takes a SQL string as input, returns an array containing row objects for each field.
function databaseRequest(query) {
    return new Promise(function(resolve, reject) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.open("POST", "/transaction/get_data/", true)
        xmlhttp.setRequestHeader("Content-Type", "application/JSON")
    
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
               if (xmlhttp.status == 200) {
                   if (xmlhttp.responseText) {
                        let responseObject = JSON.parse(xmlhttp.responseText)
                        resolve(responseObject)
                   } else {
                    resolve()
                   }
                   
               }
               else if (xmlhttp.status == 400) {
                  reject("Error 400")
               }
               else {
                   reject("A different error, not 400.")
               }
            }
        };
    
        xmlhttp.send(JSON.stringify({requestedData: query}));
    })
}

// Builds the product table on the left of the screen
function productTableBuilder() {
    
    // Clear the product list if there is one
    productList.innerHTML = ''

    // Establish the queries necessesary
    var availableProductQuery = `SELECT id, name, shelf_quantity, wh_quantity, price FROM products WHERE active = true;`
    
    // Send the query
    databaseRequest(availableProductQuery).then(function(serverResponseInJSON){

        let serverResponseInJSONKeys = Object.keys(serverResponseInJSON)
        serverResponseInJSONKeys.forEach(key => {
            if (key === 'userId') {
                basket.userId = serverResponseInJSON[key]
            } else {
                let element = serverResponseInJSON[key]
                // create the row with the product name
                let a = document.createElement("a");
                a.classList.add("list-group-item", "list-group-item-action", "d-flex", "justify-content-between", "align-items-center")
                a.innerText = element.name
         
                
         
                // add the badge/pill with the shelf inventory
                if (element.shelf_quantity > 0) {
                     let p = document.createElement("span");
                     p.classList.add("badge", "badge-primary", "badge-pill");
                     p.innerText = element.shelf_quantity
                     
                     a.addEventListener("click", function() {
                        
                        // remove the error text if there was any 
                        errorMessageText.innerText = ""
                        
                        // update an item in the table if it is already there
                        if (element.id in basket.items){
                             if (basket.items[element.id]["shelf_quantity"] > 0){
                                 basket.items[element.id]["quantity"] += 1;
                                 basket.items[element.id]["total"] = basket.items[element.id]["quantity"] * basket.items[element.id]["unit_price"];
                                 thisQuantity = document.querySelector("#gt_" + element.id + "_quantity")
                                 thisQuantity.innerText = basket.items[element.id]["quantity"]
                                 thisPrice = document.querySelector("#gt_" + element.id + "_total")
                                 thisPrice.innerText = parseMoney(basket.items[element.id]["total"])
                                 basket.items[element.id]["shelf_quantity"] -= 1;
                                 updateTotals()
                                 basket.empty = false
                            }
                        
                        // create a new item in the table
                        } else {
                        item = {id: element.id,
                            name: element.name,
                            unit_price: parseInt(element.price * 100),
                            quantity: 1,
                            total: parseInt(element.price * 100),
                            shelf_quantity: parseInt(element.shelf_quantity - 1)
                        }
                        let tr = document.createElement("tr")
                        let name = document.createElement("th")
                        let unit_price = document.createElement("td")
                        let qty = document.createElement("td")
                        let total = document.createElement("td")
                        
                        qty.id = "gt_" + element.id + "_quantity"
                        total.id = "gt_" + element.id + "_total"
                        name.scope = "row"
                        name.innerText = element.name
                        unit_price.innerText = parseMoney(item.unit_price)
                        qty.innerText = 1
                        total.innerText = parseMoney(item.total)
            
                        tr.appendChild(name)
                        tr.appendChild(qty)
                        tr.appendChild(unit_price)
                        tr.appendChild(total)
                        basketTable.appendChild(tr)
                        basket.items[element.id] = item
                        updateTotals()
                        basket.empty = false
                        }
                    })
         
                     a.appendChild(p)

                // when an item does not have inventory on the shelf, make it disabled with a red badge showing the warehouse inventory available
                } else {
                     let p = document.createElement("span");
                     p.classList.add("badge", "badge-danger", "badge-pill");
                     a.classList.add("disabled")
                     p.innerText = element.wh_quantity
                     a.appendChild(p)
                }
         
                productList.appendChild(a)
            }
     
         });
    })
}

// Function that executes when the user clicks the checkout button
function checkout() {
    if (!(basket.empty)) {

    // clear the error message text if there was any
    errorMessageText.innerText = ""

    // set some variables well need to perform the transaction
    const basketKeys = Object.keys(basket.items)
    let checkoutQuery = ''

    // build the checkout query string - add the items
    basketKeys.forEach(key => {
        checkoutQuery += `UPDATE products SET shelf_quantity = shelf_quantity - ${basket.items[key].quantity} WHERE id = ${basket.items[key].id}; `
    })

    // build the sales query string - add the transaction to the sales table
    checkoutQuery += `INSERT INTO sales (date, total_before_tax, tax_amount, total_after_tax, user_id) VALUES(CURDATE(), ${basket.subtotal}, ${basket.totalTax}, ${basket.grandTotal}, ${basket.userId});`

    // clear the checkout basket
    databaseRequest(checkoutQuery).then(productTableBuilder)
    clearBasketTable()
    clearTotals()
    emptyBasket()
    } else {
        errorMessageText.innerText = "You must add at least one item to the basket before checking out."
    }
}

function updateTotals(){
    let subtotal = document.querySelector("#gt_subtotal")
    let nItems = document.querySelector("#gt_n_items")
    let totalTax = document.querySelector("#gt_total_tax")
    let grandTotal = document.querySelector("#gt_grand_total")

    var subtotalValue = 0
    var nItemsValue = 0
    var totalTaxValue = 0
    var grandTotalValue = 0

    const basketKeys = Object.keys(basket.items)
    basketKeys.forEach(key => {
        element = basket.items[key]
        subtotalValue += element.total
        nItemsValue += element.quantity
        totalTaxValue += applyTax(element.total)
        grandTotalValue = subtotalValue + totalTaxValue
    })
    
    subtotal.innerText = parseMoney(subtotalValue)
    basket.subtotal = parseMoneyWithoutSign(subtotalValue)

    nItems.innerText = nItemsValue

    totalTax.innerText = parseMoney(totalTaxValue)
    basket.totalTax = parseMoneyWithoutSign(totalTaxValue)

    grandTotal.innerText = parseMoney(grandTotalValue)
    basket.grandTotal = parseMoneyWithoutSign(grandTotalValue)
}

//converts an integer representing the number of cents an item costs to a string in the form '$dollars.cents'
function parseMoney(value) {
    var dollars = parseInt(value / 100)
    var cents = parseInt(value % 100)
    if (cents < 10) {
        return '$' + dollars.toString() + '.0' + cents.toString()
    } else {
        return '$' + dollars.toString() + '.' + cents.toString()
    }
}

// converts an integer representing the number of cents an item costs to a string in the form 'dollars.cents'
function parseMoneyWithoutSign(value) {
    valueAsFloat = parseFloat(value) / 100
    return valueAsFloat
}

function applyTax(value) {
    value /= 100
    var taxRate = 0.0635
    var taxedAmount = parseFloat(value) * taxRate
    taxedAmount *= 100
    return parseInt(taxedAmount)
}

function clearBasketTable() {
    basketTable.innerHTML = ''
}

function clearProductList() {
    productList.innerHTML = ''
}

function clearTotals() {
    let subtotal = document.querySelector("#gt_subtotal")
    let nItems = document.querySelector("#gt_n_items")
    let totalTax = document.querySelector("#gt_total_tax")
    let grandTotal = document.querySelector("#gt_grand_total")

    subtotal.innerText = parseMoney(0)
    nItems.innerText = 0
    totalTax.innerText = parseMoney(0)
    grandTotal.innerText = parseMoney(0)
}

function emptyBasket() {
    thisUserId = basket.userId
    basket = {  
        items: {},
        subtotal: '',
        totalTax: '',
        grandTotal: '',
        userId: thisUserId,
        empty: true    
    }
}