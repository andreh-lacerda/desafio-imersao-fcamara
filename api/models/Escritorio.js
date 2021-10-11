const mongoose = require('mongoose');

const EscritorioSchema = new mongoose.Schema({

  _id: { type: mongoose.SchemaTypes.String },
  nome: {
    type: String,
    required: true
  },

})

module.exports = mongoose.model('Escritorio', EscritorioSchema)