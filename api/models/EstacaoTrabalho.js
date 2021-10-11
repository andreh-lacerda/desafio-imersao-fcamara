const mongoose = require('mongoose');
const EscritorioSchema = require('./Escritorio')

const EstacaoTrabalhoSchema = new mongoose.Schema({

  _id: { type: mongoose.SchemaTypes.String },
  label: {
    type: String,
    required: true
  },
  ativo: {
    type: Boolean,
    required: true,
    default: false,
  },
  escritorio: EscritorioSchema.schema
})

module.exports = mongoose.model('EstacaoTrabalho', EstacaoTrabalhoSchema)