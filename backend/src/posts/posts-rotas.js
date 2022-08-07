const postsControlador = require('./posts-controlador');
const middlewaresAutenticacao = require("../usuarios/middlewares-autenticacao")

module.exports = app => {
  app
    .route('/post')
    .get(middlewaresAutenticacao.bearer, postsControlador.lista)
    .post(middlewaresAutenticacao.bearer, postsControlador.adiciona);
};
