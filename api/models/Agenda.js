const mongoose = require('mongoose');
const ConsultorSchema = require('./Consultor')
const EstacaoTrabalhoSchema = require('./EstacaoTrabalho')


const AgendaSchema = new mongoose.Schema({

  _id: { type: mongoose.SchemaTypes.String },
  nome: ConsultorSchema.schema,
  data: {
    type: Date,
    required: true,
  },
  estacaotrabalho: EstacaoTrabalhoSchema.schema
})

module.exports = mongoose.model('Agenda', AgendaSchema)