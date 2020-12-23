const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Carro = require('../models/Carro');
const Aluguel = require('../models/Aluguel');


const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  res.send({ ok: true, user: req.userId });
});

router.get('/:aluguelId', async (req, res) => {
  res.send({ ok: true, user: req.userId });
});

router.post('/aluguel', async (req, res) => {
  res.send({ ok: true, user: req.userId });
});

router.put('/:aluguelId', async (req, res) => {
  res.send({ ok: true, user: req.userId });
});

router.delete('/:aluguelId', async (req, res) => {
  res.send({ ok: true, user: req.userId });
});

//rota listar carros
router.get('/carros', async (req, res) => {
  res.send({ ok: true, user: req.userId });
});


module.exports = app => app.use('/projects', router);