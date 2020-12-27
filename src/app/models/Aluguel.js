const mongoose = require('../../database');

const AluguelSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  carro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Carro',
  },
  data_retirada: {
    type: Date,
    required: true,
  },
  data_devolucao: {
    type: Date,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  }
});


const Aluguel = mongoose.model('Aluguel', AluguelSchema);

module.exports = Aluguel;


