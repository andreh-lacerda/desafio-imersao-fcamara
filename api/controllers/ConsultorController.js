const express = require('express');
const router = express.Router();
const Consultor = require('../models/Consultor');

router.get('/', async(req, res) => {
  try {
    const consultores = await Consultor.find()
    res.json(consultores)
  }
  catch(err) {
    res.send('Erro ' + err)
  }
});

router.get('/:id', async(req, res) => {
  try {
    const consultor = await Consultor.findById(req.params.id)
    res.json(consultor)
  }
  catch(err) {
    res.send('Erro ' + err)
  }
});

router.post('/', async(req, res) => {
  const consultor = new Consultor({
    nome: req.body.nome,
    ativo: req.body.ativo
  })

  try {
    const c = await consultor.save()
    res.json(c)
  }
  catch(err) {
    res.send('Erro')
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const consultor = await Consultor.findById(req.params.id)
    consultor.ativo = req.body.ativo
    const c = await consultor.save()
    res.json(c)
  }
  catch(err) {
    res.send('Erro')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const consultor = await Consultor.findByIdAndDelete(req.params.id)
    res.json(consultor)
  }
  catch(err) {
    res.send('Erro')
  }
})

module.exports = router