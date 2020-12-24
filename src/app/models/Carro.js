const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const CarroSchema = new mongoose.Schema({
  modelo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Modelo',
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


