const mongoose = require('mongoose');

const ConsultorSchema = new mongoose.Schema({

  _id: { type: mongoose.SchemaTypes.String },
  nome: {
    type: String,
    required: true
  },
  ativo: {
    type: Boolean,
    required: true,
    default: false,
  }

})

module.exports = mongoose.model('Consultor', ConsultorSchema)