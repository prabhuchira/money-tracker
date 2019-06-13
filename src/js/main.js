

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
var incomes = [];
var expenses = [];
var res;
var modal = document.getElementById("myModal");
var date = new Date();
var dateString = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "&nbsp;".repeat(4) + formatAMPM(date)
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var income_mapped_values,expense_mapped_values;

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function getResponse(){
    console.log('Its working as hell')
}

// When the user clicks on the button, open the modal 
function modalDisplay() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}



window.onload = async function () {
    const incomeListValues  = await getIncomes();
    const expenseListValues  = await getExpenses();
    
     income_mapped_values = incomeListValues.map(cur=> Number(cur.input)).reduce((a,b)=>a+b);
     expense_mapped_values = expenseListValues.map(cur=> Number(cur.input)).reduce((a,b)=>a+b);


    inc_amount.innerText = income_mapped_values;
    exp_amount.innerText = expense_mapped_values;
    modalDisplay();
    // total_amount = Number(prompt("Enter total Budget"));
    // tot_budget.innerText  = total_amount; 
    document.getElementById('modal_button').addEventListener('click', () => {
        total_amount = Number(total_amount_modal.value);
        tot_budget.innerText = total_amount + income_mapped_values;

        span.onclick();
    })

    if(incomeListValues.length >= 0){
        document.querySelector('.no-income').style.display ="none"
        incomeListValues.forEach(cur=>{
            let element =  "<li " +  "id=" + k + " "+"onclick=deleteItem(event)"  +" &nbsp; class='list-group-item childStyle'>" + cur.input + "  &#8377" + `<span class="label text-right grey">${cur.inc_exp_type}</span>` + "<span class='spanStyle grey' style='text-align:left'>As on</span>" + "<span class='spanStyle grey' >" + dateString + "</span>" + 
            
            "<span class='closeButton'>Delete</span> "+"</li>";
        
            document.getElementById('income-list').insertAdjacentHTML('afterbegin',element)
        })
    
    }
    else{
        document.querySelector('.no-income').style.display ="block"
    }

    if(expenseListValues.length >= 0){
        document.querySelector('.no-expense').style.display ="none"
        expenseListValues.forEach(cur=>{
            let element =  "<li " +  "id=" + k + " "+"onclick=deleteItem(event)"  +" &nbsp; class='list-group-item childStyle'>" + cur.input + "  &#8377" + `<span class="label text-right grey">${cur.inc_exp_type}</span>` + "<span class='spanStyle grey' style='text-align:left'>As on</span>" + "<span class='spanStyle grey' >" + dateString + "</span>" + 
            
            "<span class='closeButton'>Delete</span> "+"</li>";
        
            document.getElementById('expense-list').insertAdjacentHTML('afterbegin',element)
        })
    
    }
    else{
        document.querySelector('.no-expense').style.display ="block"
    }
    

    
    

    
    
}

document.getElementById("amount_input").addEventListener('change',async ()=>{
    
   console.log(await getIncomes())
   console.log(await getExpenses())
})


async function getIncomes(){
    let data = await fetch('http://localhost:4000/income',{
        method:'GET',
        
    });
    // console.log(data);
    let res = await data.json();
    return res;
}


async function getExpenses(){
    let data = await fetch('http://localhost:4000/expense',{
        method:'GET',
        
    });
    // console.log(data);
    let res = await data.json();
    return res;
}

submit.addEventListener('click', onAddClick);
myModal.addEventListener('keypress', (e) => {
    e.stopPropagation();
})



document.addEventListener('keypress', (e) => {
    if (e.key == "enter" || e.keyCode == 13)
        onAddClick();
})


let k = Math.floor(Math.random() * 1222034)
//Add event listener to return key 

document.querySelector('.no-expense').style.display ="block"
document.querySelector('.no-income').style.display ="block"



function onAddClick() {




  
  
    k++;
    var inputValue = checkValidation(input.value);
    document.querySelector(".not-visible").style.display = "block";
    //input value holds the input amount field

    if (inputValue !== undefined && inputValue !== '') {
        document.querySelector('.no-income').style.display ="none"
        document.querySelector(".not-visible").style.display = "none";
        

       
        let childValue = "<li " +  "id=" + k + " "+"onclick=deleteItem(event)"  +" &nbsp; class='list-group-item childStyle'>" + inputValue + "  &#8377" + `<span class="label text-right grey">${inc_or_exp_type.value.charAt(0).toUpperCase() + inc_or_exp_type.value.slice(1)}</span>` + "<span class='spanStyle grey' style='text-align:left'>As on</span>" + "<span class='spanStyle grey' >" + dateString + "</span>" + 
        
        "<span class='closeButton'>Delete</span> "+"</li>";

        if (type.value == "income") {
            //Add element to dom income list
            let values = {
                type:type.value,
                input:input.value,
                inc_exp_type:inc_or_exp_type.value
            }

            incomes.push(values);

            income_amount = income_amount + Number(inputValue);
            total_amount = total_amount + income_mapped_values + Number(inputValue);
            
             fetch('http://localhost:4000/income',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(values)

            }).then(data => data.json()).then(res=>console.log(res))

       

            addToList('#income-list', childValue)
            console.log(income_mapped_values);
            inc_amount.innerText = income_mapped_values + income_amount ;
            //tot_budget.innerText = total_amount;
            let val = Number(tot_budget.innerText)
            console.log(inputValue);
            tot_budget.innerText = val + Number(inputValue);
            input.value = '';

            
        } else {
            document.querySelector('.no-expense').style.display ="none"

            let values = {
                type:type.value,
                input:input.value,
                inc_exp_type:inc_or_exp_type.value
            }

            expenses.push(values);

            fetch('http://localhost:4000/expense',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(values)

            }).then(data => data.json()).then(res=>console.log(res))



            //Add element to dom expense list
            // let childValue = "<li class='list-group-item'>"+inputValue  +  "<span style='text-align:right;display:block'>"+ ` ${date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + "&nbsp;".repeat(8) + formatAMPM(date)}`   +"</span>"+ "</li>" ;
            expense_amount = expense_amount + Number(inputValue);
            total_amount = total_amount - Number(inputValue);

            addToList('#expense-list', childValue, "3232")
            exp_amount.innerText = expense_mapped_values + expense_amount;
            tot_budget.innerText =  tot_budget.innerText - Number(inputValue);
            cons
            input.value = ''; 
        }
    }

  
}

var getButton =document.getElementById('getButton')           

getButton.addEventListener('click',startServer);

async function  startServer(){
    let data = await fetch('http://localhost:4000/income',{
        method:'GET',   
        mode:'cors',

        headers:{
            "Content-type":'application/text'
        }
       
    }).catch(()=>{
        console.log("not exist");
        throw new Error("No its")
    })
    ;
    let res = await data.json();
    console.log(res);
}



var postButton =document.getElementById('postButton')           

postButton.addEventListener('click',postSomething);

let drone = {name: 'A US NAVAL AIRFORCE'}

async function postSomething(){
    let data = await fetch('http://localhost:4000/expense',{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
        // body: JSON.stringify(drone)
    })

    let res = await data.json();
    console.log(res)
}



