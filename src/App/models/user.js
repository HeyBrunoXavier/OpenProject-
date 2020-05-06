//Imports
const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

//Schema são os campos da tabela do nosso banco de dados
const UserSchema = new mongoose.Schema({ //tabela do banco de dados

    name : {
        type : String,
        required : true,
    },
    email : {
        type: String,
        unique : true,
        required : true,
        lowercase: true,
    },
    password : {
        type : String,
        required : true,
        select : false,
    },
    passwordResetToken : {
        type: String,
        select : false,
    },
    passwordResetExpire : {
        type: Date,
        select : false
    },
    createdAt : {
        type : Date,
        default : Date.now,
    }
});

//antes de salvar ele usa o HASH para criptografar
UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

//tabela montada, peguei as informações e joguei os dados dentro do USER
const User = mongoose.model('User', UserSchema);

module.exports = User;