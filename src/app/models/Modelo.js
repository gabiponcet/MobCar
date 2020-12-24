const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const ModeloSchema = new mongoose.Schema({
  modelo: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  }
});


const Modelo = mongoose.model('Modelo', ModeloSchema);

module.exports = Modelo;


