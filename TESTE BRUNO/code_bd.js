

// copia este metodo e cira um nvo post
app.post('/register', function(req, res) {
    Cadastro.create({
        nome : req.body.name,
        email : req.body.email,
        password : req.body.password
    }).then(function(){
        res.send("CADASTRADO COM SUCESSO");
    }).catch(function(err){
        res.send("Erro ao Cadastrar");
    })
})