const express = require('express');
const router = express.Router();
const Escritorio = require('../models/Escritorio');

router.get('/', async(req, res) => {
  try {
    const escritorios = await Escritorio.find()
    res.json(escritorios)
  }
  catch(err) {
    res.send('Erro ' + err)
  }
});

router.get('/:id', async(req, res) => {
  try {
    const escritorio = await Escritorio.findById(req.params.id)
    res.json(escritorio)
  }
  catch(err) {
    res.send('Erro ' + err)
  }
});

router.post('/', async(req, res) => {
  const escritorio = new Escritorio({
    nome: req.body.nome
  })

  try {
    const e = await escritorio.save()
    res.json(e)
  }
  catch(err) {
    res.send('Erro')
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const escritorio = await Escritorio.findById(req.params.id)
    escritorio.nome = req.body.nome
    const e = await escritorio.save()
    res.json(e)
  }
  catch(err) {
    res.send('Erro')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const escritorio = await Escritorio.findByIdAndDelete(req.params.id)
    res.json(escritorio)
  }
  catch(err) {
    res.send('Erro')
  }
})

module.exports = router