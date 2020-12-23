const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const AluguelSchema = new mongoose.Schema({
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  carros: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carro',
  }],
  valor: {
    type: Number,
    required: true,
  },
  data_retirada: {
    type: Date,
    required: true,
  },
  data_devolucao: {
    type: Date,
    required: true,
  },
});


const Aluguel = mongoose.model('Aluguel', AluguelSchema);

module.exports = Aluguel;


