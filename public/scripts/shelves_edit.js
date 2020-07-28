/*
shelves_edit.js
Author: George Kochera
Description: Enables the ability to click on a row in the inventory page and edit the shelves capacity.
*/

// Find all the items on the page.
var shelf_row = document.getElementsByClassName('gt_product')

// Add event listeners to all the rows so when we click on them, they open a modal.
for (var row of shelf_row) {
    (function (row){
        row.addEventListener('click', function(){
            
            // Get the current values from the table on the screen.
            var min = row.querySelector('.gt_shelf_min_threshold').innerHTML
            var max = row.querySelector('.gt_shelf_max_threshold').innerHTML
            console.log(min, max)
            
            // Populate the modal with the current values
            var 
            $("#shelvesEditModal").modal("show")
        })
    }(row))
}