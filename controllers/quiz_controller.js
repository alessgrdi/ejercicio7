var models = require ('../models/models.js');

// GET /quizes/question
/*exports.question = function(req, res) {
  models.Quiz.findAll().success(function(quiz) {
   res.render('quizes/question', {pregunta: quiz[0].pregunta});
 })
};*/

// GET /quizes/answer
/*exports.answer = function(req, res) {
models.Quiz.findAll().success(function(quiz) {
   if (req.query.respuesta === quiz[0].respuesta){
      res.render('quizes/answer', {respuesta: 'Correcto'});
   } else {
      res.render('quizes/answer', {respuesta: 'Incorrecto'});
   }
  })
};*/

exports.author = function(req, res) {
  res.render('author');
};

// POST /quizes/create
exports.create = function(req, res) {
/*  req.body.quiz.UserId = req.session.user.id;
  if(req.files.image){
    req.body.quiz.image = req.files.image.name;
  }*/
  var quiz = models.Quiz.build( req.body.quiz );

  /*quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {*/
         // save: guarda en DB campos pregunta y respuesta de quiz
        quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then( function(){
          res.redirect('/quizes');
        })
      //}      // res.redirect: Redirección HTTP a lista de preguntas
    //}
  //).catch(function(error){next(error)});
};

// GET /quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
  res.render('quizes/show', { quiz: quiz});
})
};



exports.index = function(req, res) {
  //console.log(req);
  /*var options = {};
  if(req.user){
    options.where = {UserId: req.user.id}
  }*/

  //models.Quiz.findAll(options).then(
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index.ejs', {quizes: quizes});//, errors: []});
    })
  //).catch(function(error){next(error)});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build( // crea objeto quiz
    {pregunta: "", respuesta: "", tema: ""}
  );
  res.render('quizes/new', {quiz: quiz});//, errors: []});
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
  console.log("req.quiz.id: " + req.quiz.id);
  req.quiz.destroy().then( function() {
    res.redirect('/quizes');
  })//.catch(function(error){next(error)});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    if (req.query.respuesta === quiz.respuesta){
       res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'});
    } else {
       res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
    }
  })
};

// GET buscar
exports.buscar = function(req, res) {
/*  models.Quiz.find(req.params.quizId).then(function(quiz) {
    if (req.query.respuesta === quiz.respuesta){
       res.render('quizes/answer', {quiz: quiz, respuesta: 'Correcto'});
    } else {
       res.render('quizes/answer', {quiz: quiz, respuesta: 'Incorrecto'});
    }
  }) */
//var res = str.replace("Microsoft", "W3Schools");
  var search2 = req.query.search.replace(" ", "%");

  models.Quiz.findAll({where:['pregunta LIKE ?',"%"+search2+"%"],order:'pregunta ASC'}).then(
    function(quizes) {
      //console.log(quizes.respuesta);
       res.render('quizes/buscar', {quizes:quizes, search23: quizes.respuesta});
    })

};
