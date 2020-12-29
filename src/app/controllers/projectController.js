const express = require('express');
const authMiddleware = require('../middlewares/auth');
const moment = require('moment');

const Carro = require('../models/Carro');
const Aluguel = require('../models/Aluguel');
const Modelo = require('../models/Modelo');

const router = express.Router();

//ROTAS USUÁRIO
/* router.use(authMiddleware);

router.get('/users', async (req, res) => {
  res.send({ ok: true, user: req.userId });
}); */


//criar reserva de aluguel
router.post('/aluguel', async (req, res) => {
  try {
    const aluguel = await Aluguel.create(req.body);

    return res.send({ aluguel });

  } catch (error) {
    return res.status(400).send({ error: 'Erro ao gerar aluguel do carro. ' });
  }
});

//calcular o valor de um alguel
router.get('/total_aluguel', async (req, res) => {
  const { aluguel, modelo, data_retirada, data_devolucao } = req.body;

  try {
    const modelo_valor = await Modelo.findById(modelo)
      .select('+valor');


    const retirada = moment(data_retirada);
    const devolucao = moment(data_devolucao);
    const duration = moment.duration(devolucao.diff(retirada));
    const dias = duration.asDays();

    const total = dias * modelo_valor.valor;

    const aluguel_total = await Aluguel.findByIdAndUpdate(aluguel, {
      total: total,
    }, { new: true });

    await aluguel_total.save();

    return res.send({ aluguel_total });

  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: 'Não foi possível calcular o valor do aluguel.' });
  }
});


//ROTAS CARRO
//listar carros com paginação 
router.get('/carros', async (req, res) => {
  try {
    const { page, perPage } = req.body;
    const { cor, ord } = req.query;

    const options = {
      page: parseInt(page, 5),
      limit: parseInt(perPage, 5),
      find: {},
      sort: ord,
    };


    const carros = await Carro.paginate({ cor: cor }, options);


    return res.send({ carros });

  } catch (error) {
    return res.status(400).send({ error: 'Não foi possível mostrar os carros disponíveis.' });
  }
});





//listar um carro
router.get('/carros/:carroId', async (req, res) => {
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

//atualizar carro 
router.put('/:carroId', async (req, res) => {
  try {
    const { modelo, placa, cor, observacoes } = req.body;

    const carro = await Carro.findByIdAndUpdate(req.params.carroId, {
      modelo,
      placa,
      cor,
      observacoes
    }, { new: true });

    await carro.save();

    return res.send({ carro });
  } catch (error) {
    return res.status(400).send({ error: 'Erro ao atualizar carro. ' });
  }
});
//ROTAS MODELO
//listar modelos
router.get('/modelos', async (req, res) => {
  try {
    const modelos = await Modelo.find({ $or: [{ valor: { $lt: 200 } }, { valor: { $lt: 100 } }] });

    console.log(modelos);
    return res.send({ modelos });

  } catch (error) {
    return res.status(400).send({ error: 'Não foi possível mostrar os modelos disponíveis.' });
  }
});


router.get('/modelos_carros', async (req, res) => {
  try {
    const modelos = await Modelo.find().populate('carro');

    console.log(modelos);
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
router.post('/:modeloId', async (req, res) => {
  try {
    const { carro } = req.body;

    const modelo = await Modelo.findById(req.params.modeloId);

    console.log(modelo.modelo);
    modelo.carroId.push(carro);

    await modelo.save();

    return res.send({ modelo });
  } catch (error) {
    return res.status(400).send({ error: 'Erro ao atualizar modelo. ' });
  }
});
//deletar 

module.exports = app => app.use('/projects', router);