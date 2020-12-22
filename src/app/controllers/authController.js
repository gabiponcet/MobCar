const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');


const authConfig = require('../../config/auth.json');

const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {

    if (await User.findOne({ email }))
      return res.status(400).send({ error: "Usuário já existe!" });

    const user = await User.create(req.body);

    user.senha = undefined;

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, senha } = req.body;

  const user = await User.findOne({ email }).select('+senha');

  if (!user)
    return res.status(400).send({ error: 'Usuário não encontrado' });

  if (!await bcrypt.compare(senha, user.senha))
    return res.status(400).send({ error: 'Senha inválida' });

  user.senha = undefined;

  res.send({
    user,
    token: generateToken({ id: user.id }),
  });
});

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).send({ error: 'Usuário não encontrado.' });

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      '$set': {
        senhaResetToken: token,
        senhaResetExpires: now,
      }
    });

    mailer.sendMail({
      to: email,
      from: 'gabiponcet@gmail.com',
      template: 'auth/forgot_password',
      context: { token },
    }, (err) => {
      if (err)
        return res.status(400).send({ error: 'Não é possível enviar a senha do email' });

      return res.send();
    });

  } catch (err) {
    console.log(err);
    res.status(400).send({ error: 'Erro na senha. Tente novamente.' });
  }
});

module.exports = app => app.use('/auth', router);
