module.exports = function(req, res, next) {
  var err = new Error('Pagina Não Encontrada');
  err.status = 404;
  next(err);
}