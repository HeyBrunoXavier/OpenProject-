//IMPORTS
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');
const User = require('../models/user');
//rota usada
const router = express.Router();

//funcao para gerar um token
function generateToken(params = {}){
    //pega o parametro infotmado e autentica no HASH com a expiração de 1 dia
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400

});
}

//rota para fazer o cadastro de um user
router.post('/register', async (req, res) =>{

    const {email} = req.body;

    try{
        //verifica se o email citado existe no banco de dados
        if(await User.findOne({email})){

            return res.status(400).send({error: 'Usuário ja existe'});
        }
         
        //objeto para criar um usuario
        const user = await User.create(req.body);

        //nao traz o password no retorno da API
        user.password = undefined;

        return res.send({
             user,
             token : generateToken({id: user.id})
            });
    }
    catch(err){
            return res.status(400).send({error: 'erro ao registrar'});
    }
});

//metodo de autenticação
router.post('/authenticate', async (req, res) =>{
    //recebe email, password como parametro
    const {email, password} = req.body;

    //procura se o usuario existe e retorna o email + password
    const user = await User.findOne({email}).select('+password');

    //verifica se o usuario existe
    if(!user){
        return res.status(400).send({error: 'user not found'});
    }

    //criptografa e compara se o password informado bate com o do banco de dados
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({error: 'invalid password'});   
    }

    //nao faz o password retornar no JSON
    user.password = undefined;

    res.send({
        user,
        token : generateToken({id: user.id}),
        });
});

//metodo de recuperar senha
router.post('/forgot_password', async (req, res) =>{
    //recebe um email de parametro
    const { email } = req.body;

    try{
        //verifica se o usuario existe
        const user = await User.findOne({ email });

        // verifica se o usuario existe
        if(!user){
            return res.status(400).send({error: 'User not found'});
        }
        
        //cripitografar em bites e converter para hexadecimal
        const token = crypto.randomBytes(20).toString('hex');

        //pegando a data atual
        const now = new Date();
        //adicionando +1 hora no vencimento do token
        now.setHours(now.getHours() + 1);

        //fazer o update pelo ID
        await User.findByIdAndUpdate(user.id, {
            //setando a tabela do banco de dados
            '$set': {
                passwordResetToken : token,
                passwordResetExpire: now,
            }
        });
        //metodo de enviar email
        await mailer.sendMail({

            to: email,
            from : 'ronaldo.asconcellos@gmail.com',
            template: 'auth/forgot_password',
            context: { token },
            
            //aero function caso de erro no envio de email
        }, (err) => {
            if(err){
                console.log(err)
                return res.status(400).send({error : 'Cannot send from forgot password email'});
            }
            return res.send();
        });
        
    }
    catch(err){
        console.log(err);
        res.status(400).send({error : 'Error on forgot password, try again'});
    }
});

//metodo de resetar a senha
router.post('/reset_password', async(req, res) =>{

    const { email, token, password} = req.body;

    try{
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpire');

            if(!user){
                return res.status(400).send({error: 'User not found'});
            }

            if(token !== user.passwordResetToken){
                return res.status(400).send({error : 'Token invalid'});
            }

            const now = new Date();

            if(now > user.passwordResetExpire){
                res.status(400).send({error : 'Token expired, genereate a new token'});
            }

            user.password = password;
            
            await user.save();

            res.send();
    }
    catch(err){
        console.log(err);
        res.status(400).send({error: 'Cannot reset password, try again'});
    }
});

//exportando as informoções para o app
module.exports = app => app.use('/auth', router);
