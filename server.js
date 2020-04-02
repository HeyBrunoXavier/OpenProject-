const express = require ('express');
const app = express();

 // Rotas HTTP da Aplicação
app.get('/',function(req,res){
    res.sendFile(__dirname + '/view/index.html')
});
app.get('/contratos.html',function(req,res){
        res.sendFile(__dirname + '/view/contratos.html')
});
app.get('/home.html',function(req,res){
    res.sendFile(__dirname + '/view/home.html')
});
// Porta em qual está sendo rodada!
app.listen(8080,function(erro){
    if(erro){
        console.log('Ocorreu um erro!');
    }else{
        console.log("Already Connection");
    }
})