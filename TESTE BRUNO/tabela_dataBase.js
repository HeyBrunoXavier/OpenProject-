const bd = require('./bd');

const Cadastro = bd.sequelize.define('users', {
    nome : {
        type : bd.Sequelize.STRING
    },
    email : {
        type : bd.Sequelize.STRING
    },
    password : {
        type : bd.Sequelize.STRING
    }
});

//USA ESSE FORCE E ATUALIZA SUA TABELA DO BAMCO DE DADOS, DEPOIS QUE ATUALIZAR A TABELA, COMENTA O FORCE DENOVO, E USA O MODULE EXPORTS



//CRIA A TABELA
//Cadastro.sync({force : true});


//USA ELE PARA IMPORTAR NO SERVER JS E PODER UTILIZAR PARA O CADASTRO
module.exports = Cadastro;