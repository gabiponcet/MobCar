const mongoose = require('../../database');

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


