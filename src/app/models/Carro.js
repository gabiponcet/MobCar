const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const CarroSchema = new mongoose.Schema({
  modelo: {
    type: String,
    required: true,
  },

  placa: {
    type: String,
    required: true,
  },

  cor: {
    type: String,
    required: true,
  },
  observacoes: {
    type: String,
    required: true,
  },
});


const Carro = mongoose.model('Carro', CarroSchema);

module.exports = Carro;


