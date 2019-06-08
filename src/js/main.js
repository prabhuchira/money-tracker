

import { checkForNumber as checkValidation, addToList, formatAMPM } from "./functions";


var input = document.getElementById('amount_input')
var type = document.getElementById('type')
var submit = document.getElementById('add');
var inc_amount = document.getElementById('inc_amount')
var exp_amount = document.getElementById('exp_amount')
var tot_budget = document.getElementById('total_budget');
var total_amount_modal = document.getElementById('total_amount_modal');
var inc_or_exp_type = document.getElementById('inc_or_exp_type');
var income_amount = 0;
var expense_amount = 0;
var total_amount = 0;

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
function modalDisplay() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}



window.onload = function () {
    inc_amount.innerText = 0;
    exp_amount.innerText = 0;
    modalDisplay();
    // total_amount = Number(prompt("Enter total Budget"));
    // tot_budget.innerText  = total_amount; 
    document.getElementById('modal_button').addEventListener('click', () => {
        total_amount = Number(total_amount_modal.value);
        tot_budget.innerText = total_amount;
        span.onclick();
    })
}



submit.addEventListener('click', onAddClick);
myModal.addEventListener('keypress', (e) => {
    e.stopPropagation();
})



document.addEventListener('keypress', (e) => {
    if (e.key == "enter" || e.keyCode == 13)
        onAddClick();
})




//Add event listener to return key 

function onAddClick() {

    var inputValue = checkValidation(input.value);
    document.querySelector(".not-visible").style.display = "block";
    //input value holds the input amount field

    if (inputValue !== undefined && inputValue !== '') {
        document.querySelector(".not-visible").style.display = "none";
        var date = new Date();

        var dateString = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "&nbsp;".repeat(4) + formatAMPM(date)
        let childValue = "<li class='list-group-item childStyle'>" + inputValue + "  &#8377" + `<span class="label text-right grey">${inc_or_exp_type.value.charAt(0).toUpperCase() + inc_or_exp_type.value.slice(1)}</span>` + "<span class='spanStyle grey' style='text-align:left'>As on</span>" + "<span class='spanStyle grey' >" + dateString + "</span>" + "</li>";

        if (type.value == "income") {
            //Add element to dom income list

            // total_amount = total_amount + income_amount;
            income_amount = income_amount + Number(inputValue);
            total_amount = total_amount + Number(inputValue);
            addToList('#income-list', childValue)
            inc_amount.innerText = income_amount;
            tot_budget.innerText = total_amount;
            input.value = '';

        } else {
            //Add element to dom expense list
            // let childValue = "<li class='list-group-item'>"+inputValue  +  "<span style='text-align:right;display:block'>"+ ` ${date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "&nbsp;".repeat(8) + formatAMPM(date)}`   +"</span>"+ "</li>" ;
            expense_amount = expense_amount + Number(inputValue);
            total_amount = total_amount - Number(inputValue);

            addToList('#expense-list', childValue, "3232")
            exp_amount.innerText = expense_amount;
            tot_budget.innerText = total_amount;
            input.value = '';
        }
    }
}




