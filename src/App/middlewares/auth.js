const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json')

module.exports = (req, res, next) => {
    //recebe o que veio do header para fazer a autorização
    const authHeader = req.headers.authorization;
    //faz a autenticação e verifica o token se ele existe
    if(!authHeader){
        return res.status(401).send({error: 'No Token provided'});
    }
    //quebra o token apartir do BEARER
    const parts = authHeader.split(' ');
    //verifica se o token foi quebrado
    if(!parts.length === 2){
        return res.status(401).send({error: 'Token error'});
    }
    //pega skema do banco de dados e verifica se os tokens estao iguais
    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return res.status(401).send({error: 'Token malformatted'});
    }
    //verificação se o token esta criptografado do mesmo jeito que o HASH
    jwt.verify(token, authConfig.secret, (err, decoded) =>{
        
        if(err){
            
        return res.status(401).send({error: 'Invalid Token'});
     }

        req.userId = decoded.id;
        return next();
    });
};