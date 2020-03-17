const express = require ('express');
const app = express();

app.get('/',function(req,res){
    res.sendFile(__dirname + '/view/index.html')
    });
app.get('/high.html',function(req,res){
    res.sendFile(__dirname + '/view/high.html')
    });
app.get('/Contratos.html',function(req,res){
        res.sendFile(__dirname + '/view/contratos.html')
        });
    
app.listen(8080,function(erro){
    if(erro){
        console.log('Ocorreu um erro!');
    }else{
        console.log("Already Connection");
    }
})