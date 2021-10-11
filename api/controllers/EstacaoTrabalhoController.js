const express = require('express');
const router = express.Router();
const EstacaoTrabalho = require('../models/EstacaoTrabalho');

router.get('/', async(req, res) => {
  try {
    const estacoesTrabalho = await EstacaoTrabalho.find()
    res.json(estacoesTrabalho)
  }
  catch(err) {
    res.send('Erro ' + err)
  }
});

router.get('/:id', async(req, res) => {
  try {
    const estacaoTrabalho = await EstacaoTrabalho.findById(req.params.id)
    res.json(estacaoTrabalho)
  }
  catch(err) {
    res.send('Erro ' + err)
  }
});

router.post('/', async(req, res) => {
  const estacaoTrabalho = new EstacaoTrabalho({
    label: req.body.label,
    ativo: req.body.ativo,
    escritorio: req.body.escritorio
  })

  try {
    const et = await estacaoTrabalho.save()
    res.json(et)
  }
  catch(err) {
    res.send('Erro')
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const estacaoTrabalho = await EstacaoTrabalho.findById(req.params.id)
    estacaoTrabalho.label = req.body.label
    estacaoTrabalho.ativo = req.body.ativo
    estacaoTrabalho.escritorio = req.body.escritorio
    const et = await estacaoTrabalho.save()
    res.json(et)
  }
  catch(err) {
    res.send('Erro')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const estacaoTrabalho = await EstacaoTrabalho.findByIdAndDelete(req.params.id)
    res.json(estacaoTrabalho)
  }
  catch(err) {
    res.send('Erro')
  }
})

module.exports = router