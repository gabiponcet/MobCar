const app = require('../index.js');

module.exports = (err) => {
  if (err) {
    return console.log('Erro ao conectar com o banco de dados');
  }
  app.listen(config.app.port, (err) => {
    if (err) {
      return console.log('erro');
    }
    console.log('iniciou em localhost:3000');
  })
};