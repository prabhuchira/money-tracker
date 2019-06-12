const express = require('express')
const app = express();
const fs = require('fs');

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

app.get('/save',(request,response)=>{
    
    response.json({
        status:'success'
    })
})
app.post('/save',(request,response)=>{
    response.json({
        success:request.body

    })
})