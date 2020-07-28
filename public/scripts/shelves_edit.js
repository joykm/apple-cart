/*
shelves_edit.js
Author: George Kochera
Description: Enables the ability to click on a row in the inventory page and edit the shelves capacity. Data validation
is enforced in the modal. The only rule is that the maximum must be greater than or equal to the minimum value.
*/

// Find all the product rows on the page.
var shelf_row = document.getElementsByClassName('gt_product')

// Add event listeners to all the rows so when we click on them, they open a modal.
for (var row of shelf_row) {
    (function (row){
        row.addEventListener('click', function(){
            
            // Get the current values from the table on the screen.
            var min = row.querySelector('.gt_shelf_min_threshold').innerHTML
            var max = row.querySelector('.gt_shelf_max_threshold').innerHTML
            var id = row.querySelector('.gt_shelf_id').innerHTML
            console.log(min, max)
            
            // Populate the modal with the current values.
            var modal_input_min = document.querySelector('#modal_shelf_minimum_threshold')
            var modal_input_max = document.querySelector('#modal_shelf_maximum_threshold')
            var modal_input_id = document.querySelector('#modal_shelf_id')
            modal_input_min.value = min
            modal_input_max.value = max
            modal_input_id.value = id

            // Make the modal appear.
            $("#shelvesEditModal").modal("show")
        })
    }(row))
}

// Add event listener to the form so that only valid input can be given. This enforces the minimum shelf value must be greater
// than the maximum shelf value.
form.addEventListener('submit', function(event) {
    var form = document.getElementsByClassName('needs-validation')[0]
    var input_min = form.querySelector('#modal_shelf_minimum_threshold')
    var input_max = form.querySelector('#modal_shelf_maximum_threshold')
    if (input_min.value > input_max.value) {
        input_min.classList.add("is-invalid")
        input_max.classList.add("is-invalid")
        event.preventDefault();
        event.stopPropagation();
    }
})