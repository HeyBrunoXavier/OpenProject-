const express = require ('express');
const app = express();

app.get('/',function(req,res){
    res.send("Servidor está funcionando");
});



app.listen(8080,function(erro){
    if(erro){
        console.log('Ocorreu um erro!');
    }else{
        console.log("Alredy Connection");
    }
})