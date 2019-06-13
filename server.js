const express = require('express')
const app = express();
const fs = require('fs');
// const writeData = '';

const incomesLoad = fs.readFileSync('incomes.json',(data)=>{
    console.log(data)
});

var incomes = JSON.parse(incomesLoad);

const expensesLoad = fs.readFileSync('expenses.json',(data)=>{
    console.log(data)
});
var expenses = JSON.parse(expensesLoad);


app.listen(4000,()=>{
    console.log('Server Started')
})

// app.use(express.static('dist'))
app.use(express.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/income',(request,response)=>{

    response.json(
       
        incomes
    )
})

app.post('/income',(request,response)=>{
    incomes.push(request.body);
    // writeData = JSON.parse(incomesLoad)
    fs.writeFile('incomes.json',JSON.stringify(incomes,null,2),err=>{
        console.log('Income Added successfully  ' + request.body)
    });
    response.json(
      
        request.body
    )
})



app.get('/expense',(request,response)=>{
    
    response.json(
        expenses
    )
})

app.post('/expense',(request,response)=>{

   expenses.push(request.body);
    // writeData = JSON.parse(incomesLoad)
    fs.writeFile('expenses.json',JSON.stringify(expenses,null,2),err=>{
        console.log('Expense Added successfully  ' + request.body)
    });
    response.json(
      
        request.body
    )
})




app.delete('/income',(request,response)=>{
    
    response.json({what:'deleted function'})
})