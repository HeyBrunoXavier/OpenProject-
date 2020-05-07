const express = require ('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

require('./src/app/controllers/index')(app);




app.use(express.static('public'));
// Rotas HTTP da Aplicação
app.get('/',function(req,res){
    res.sendFile(__dirname + '/view/index.html')
});
app.get('/login.html',function(req,res){
        res.sendFile(__dirname + '/view/login.html')
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