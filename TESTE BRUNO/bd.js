const Sequelize = require('sequelize');


//                      Coloca seu banco de dados aqui
const sequelize = new Sequelize('seu', 'banco', 'dados', {

    host: 'localhost',
    dialect : 'mysql',
});

module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
}