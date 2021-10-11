const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Agenda = require('../models/Agenda');
const Consultor = require('../models/Consultor');
const EstacaoTrabalho = require('../models/EstacaoTrabalho');
const Escritorio = require('../models/Escritorio');

router.get('/', async(req, res) => {
  try {
    const agendas = await Agenda.find()
    res.json(agendas)
  }
  catch(err) {
    res.send('Erro ' + err)
  }
});

router.get('/:id', async(req, res) => {
  try {
    const agenda = await Agenda.findById(req.params.id)
    res.json(agenda)
  }
  catch(err) {
    res.send('Erro ' + err)
  }
});

router.post('/', async(req, res) => {
  try {
  const agenda = new Agenda({
    _id: uuidv4(),
    nome: new Consultor({
      _id: req.body.consultor.id,
      nome: req.body.consultor.nome
    }),
    data: req.body.data,
    estacaotrabalho: new EstacaoTrabalho({
      _id: req.body.estacaotrabalho.id,
      label: req.body.estacaotrabalho.label,
      escritorio: new Escritorio({
        _id: req.body.estacaotrabalho.escritorio.id,
        nome: req.body.estacaotrabalho.escritorio.nome
      })
    })
  })

  
    const a = await agenda.save()
    res.json(a)
  }
  catch(err) {
    res.send('Erro')
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const agenda = await Agenda.findById(req.params.id)
    agenda.consultor = req.body.consultor
    agenda.data = req.body.data
    agenda.estacaotrabalho = req.body.estacaotrabalho
    const a = await agenda.save()
    res.json(a)
  }
  catch(err) {
    res.send('Erro')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const agenda = await Agenda.findByIdAndDelete(req.params.id)
    res.json(agenda)
  }
  catch(err) {
    res.send('Erro')
  }
})

module.exports = router