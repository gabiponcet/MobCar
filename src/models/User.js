const mongoose = require('../database');

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },

  cpf: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,

  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  telefone: {
    type: String,
    required: true,
  },
  dt_nascimento: {
    type: Date,
    required: true,
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;


