const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors())
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

const existPhoneArr = ['13000001111','13100001111','13200001111']; 
// var allowCrossDomain = function(req, res, next){
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Methods','GET,POST,PUT');
//     return next();
//     }
    
// app.use(allowCrossDomain);

app.get(`/api/sendCode/:phone`,(req,res)=>{
    res.type('application/json');
    const { phone  } = req.params;
    if(existPhoneArr.indexOf(phone) !== -1){
        res.status(200).send({
            code:'1000000',
            message:'发送成功',
            phone: phone
        });
    }else{
        res.status(200).send({
            code:'1000001',
            message:'该手机号不存在',
            phone: phone
        });
    }
});

app.listen(3000,()=>{
    console.log('start server----');
}); 