module.exports = function(app){

  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Index' });
  });

   app.get('/sobre', function(req, res, next) {
    res.render('index', { title: 'Sobre','aaa': asa.s });
  });

  return this;

}