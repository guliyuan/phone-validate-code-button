const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const phone = 15244443333;

app.get(`/api/sendCode/:${phone}`,(req,res)=>{
    res.type('application/json');
    res.status(200).send({
        mock: phone
    });
});

app.listen(3000,()=>{
    console.log('start server----');
}); 