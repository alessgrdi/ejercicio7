var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }
);

// Importar definicion de la tabla Quiz
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
// exportar tablas
exports.Quiz = Quiz;

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
        Quiz.count().then(function (count){
          if(count === 0) {   // la tabla se inicializa solo si está vacía
            Quiz.bulkCreate(
              [ {pregunta: 'Capital de Italia',   respuesta: 'Roma', tema: 'humanidades'}, // estos quizes pertenecen al usuario pepe (2)
                {pregunta: 'Capital de Portugal', respuesta: 'Lisboa', tema: 'ciencia'}
              ]
            ).then(function(){console.log('Base de datos (tabla quiz) inicializada')});
          }
          else {
            console.log('Base de datos (tabla quiz) ya estaba inicializada')
          }
        });
      });