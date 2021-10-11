const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/agendapp'

const app = express()
app.use(cors());

mongoose.connect(url, {useNewUrlParser: true})
const con = mongoose.connection

con.on('open', () => console.log('connected...') )

app.use(express.json())

const consultorRouter = require('./controllers/ConsultorController')
app.use('/consultores', consultorRouter)
const escritorioRouter = require('./controllers/EscritorioController')
app.use('/escritorios', escritorioRouter)
const estacaoTrabalhoRouter = require('./controllers/EstacaoTrabalhoController')
app.use('/estacoes_trabalho', estacaoTrabalhoRouter)
const agendaRouter = require('./controllers/AgendaController')
app.use('/agendas', agendaRouter)

app.listen(9000, () => console.log('server started'))