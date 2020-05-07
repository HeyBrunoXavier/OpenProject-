const express = require ('express');
var mysql = require('mysql');
var session = require('express-session');
var path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//---------------DATABASE----------------
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'Bruno5230',
	database : 'nodelogin'
});

// ROTAS HTTP DA APLICAÇÂO MODULO GET VIEW
app.get('/',function(req,res){
    res.sendFile(__dirname + '/view/login.html')
});
app.get('/index',function(req,res){
        res.sendFile(__dirname + '/view/index.html')
});
app.get('/home.html',function(req,res){
    res.sendFile(__dirname + '/view/home.html')
});

// AUTENTICAÇÂO DE LOGIN
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/index');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
// PORT 8080 STARTED SERVICE
app.listen(8080,function(erro){
    if(erro){
        console.log('Ocorreu um erro!');
    }else{
        console.log("ALREADY CONNECTION IN SERVICE");
    }
})