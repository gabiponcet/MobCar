const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Carro = require('../models/Carro');
const Aluguel = require('../models/Aluguel');
const Modelo = require('../models/Modelo');

const router = express.Router();

/* //ROTAS USUÁRIO
router.use(authMiddleware);

router.get('/users', async (req, res) => {
  res.send({ ok: true, user: req.userId });
});


//ROTAS ALUGUEL
router.get('/:aluguelId', async (req, res) => {
  res.send({ ok: true, user: req.userId });
});


router.put('/aluguel/:id', async (req, res) => {
  res.send({ ok: true, user: req.userId });
});

router.delete('/aluguel/:id', async (req, res) => {
  res.send({ ok: true, user: req.userId });
});
 */

//criar reserva de aluguel
router.post('/aluguel', async (req, res) => {
  try {
    const aluguel = await Aluguel.create(req.body);

    return res.send({ aluguel });

  } catch (error) {
    return res.status(400).send({ error: 'Erro ao gerar aluguel do carro. ' });
  }
});

//ROTAS CARRO

//listar carros
router.get('/carros', async (req, res) => {
  try {
    const carros = await Carro.find();

    return res.send({ carros });

  } catch (error) {
    return res.status(400).send({ error: 'Não foi possível mostrar os carros disponíveis.' });
  }
});

//listar um carro
router.get('/:carroId', async (req, res) => {
  try {
    const carro = await Carro.findById(req.params.carroId);

    return res.send({ carro });

  } catch (error) {
    return res.status(400).send({ error: 'Não foi possível mostrar o carro selecionado.' });
  }
});

//criar carro
router.post('/carro', async (req, res) => {
  try {
    const carro = await Carro.create(req.body);

    return res.send({ carro });

  } catch (error) {
    return res.status(400).send({ error: 'Erro ao gerar carro. ' });
  }
});

//remover carro
router.delete('/:carroId', async (req, res) => {
  try {
    await Carro.findByIdAndRemove(req.params.carroId);

    return res.send();

  } catch (error) {
    return res.status(400).send({ error: 'Não foi possível remover o carro selecionado.' });
  }
});
//ROTAS MODELO
//listar modelos
router.get('/modelos', async (req, res) => {
  try {
    const modelos = await Modelo.find();

    return res.send({ modelos });

  } catch (error) {
    return res.status(400).send({ error: 'Não foi possível mostrar os modelos disponíveis.' });
  }
});


//criar
router.post('/modelo', async (req, res) => {
  try {
    const modelo = await Modelo.create(req.body);

    return res.send({ modelo });

  } catch (error) {
    return res.status(400).send({ error: 'Erro ao gerar modelo do carro. ' });
  }
});
//alterar
//deletar 

module.exports = app => app.use('/projects', router);