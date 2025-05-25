"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var express = require('express'); // Importa o módulo Express, que é um framework web para Node.js.


var _require = require('express-handlebars'),
    engine = _require.engine; // Importa o motor de visualização Handlebars para o Express.


var mysql = require('mysql2'); // Importa o módulo mysql2 para interagir com o banco de dados MySQL.


var passport = require('passport'); // Importa  é utilizado para autenticação de usuários.


var LocalStrategy = require('passport-local').Strategy; // Imporo módulo Passport, queta a estratégia de autenticação local do Passport.


var session = require('express-session'); // Importa o middleware de sessão para o Express.


var flash = require('connect-flash'); // Importa o módulo connect-flash para exibir mensagens flash.


var multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({
  storage: storage
}); // para inicializar o multer e atribuí-lo à variável upload

var fs = require('fs'); // Importe o módulo fs para acessar o sistema de arquivos.


var path = require('path');

var nodemailer = require('nodemailer');

var app = express(); // Cria uma instância do aplicativo Express.

var admin = require('firebase-admin'); // Configure Firebase Admin SDK com as credenciais da variável de ambiente


admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK)),
  storageBucket: 'gs://sitetapburaco.appspot.com' // Substitua 'seu_bucket' pelo nome do seu bucket no Firebase Storage

}); // admin.initializeApp({
//   credential: admin.credential.cert('sitetapburaco-firebase-adminsdk-gnu38-c2134532bb.json'),
//   storageBucket: 'gs://sitetapburaco.appspot.com' // Substitua 'seu_bucket' pelo nome do seu bucket no Firebase Storage
// });

app.engine('handlebars', engine()); // Configura o motor de visualização Handlebars no Express.

app.set('view engine', 'handlebars'); // Configura o uso de arquivos Handlebars como visualizações.

app.set('images', './images');
app.set('views', path.join(__dirname, 'views')); // Define o diretório onde estão armazenadas as visualizações Handlebars.

app.use(express.json()); // Middleware para interpretar o corpo da requisição como JSON.

app.use(express.urlencoded({
  extended: false
})); // Middleware para interpretar dados do formulário codificados na URL.

var conexao = mysql.createConnection({
  host: 'tramway.proxy.rlwy.net',
  user: 'root',
  password: 'ksAVssaxrROprjBIoUcYTAckUZRcFERw',
  database: 'railway',
  port: '44640'
}); // Cria uma conexão com o banco de dados MySQL.
// const conexao = mysql.createConnection({
//   host: '127.0.0.1',
//   user: 'root',
//   password: '123456',
//   database: 'operacaolimpeza',
//   port: '3306'
// }); // Cria uma conexão com o banco de dados MySQL local.
//conexao.connect(function (erro) {
//  if (erro) throw erro; // Se ocorrer um erro na conexão, lança uma exceção.
//  console.log('Conexão efetuada com sucesso'); // Loga uma mensagem informando que a conexão foi estabelecida com sucesso.
//});
// NOVO CÓDIGO PARA TRATAENTO DE ERRO: em vez de simplesmente lançar uma exceção(throw erro), captura o erro e exibe uma mensagem mais amigável e útil para ajudar a depuração.

/* Melhorias nesse código:
Exibe uma mensagem mais clara informando que houve um erro.
Mostra erro.message, erro.code e erro.stack para facilitar a depuração.
Mantido throw erro para interromper todo o programa se o erro ocorrer.
Mantém um log positivo para quando a conexão for bem-sucedida. */

conexao.connect(function (erro) {
  if (erro) {
    console.error("❌ Erro ao conectar ao banco de dados:", erro.message);
    console.error("Código do erro:", erro.code); //Indica um código de erro específico, útil para identificar a causa do problema. Nem todos os erros possuem um code, mas é comum em erros do sistema e bancos de dados.

    console.error("Stack:", erro.stack); // Contém o rastreamento completo do erro, mostrando onde e como ele ocorreu no código. Isso é extremamente útil para depuração

    throw erro; // ** Interrompe todo o programa se o erro ocorrer
  }

  console.log("✅ Conexão ao banco de dados efetuada com sucesso!");
});
app.use(session({
  secret: 'mysecret',
  // Chave secreta utilizada para assinar o cookie da sessão.
  resave: false,
  // Evita que a sessão seja regravada no armazenamento a cada requisição.
  saveUninitialized: false // Evita que sessões não inicializadas sejam salvas.

}));
app.use(flash()); // Middleware para exibir mensagens flash.

app.use(passport.initialize()); // Inicializa o Passport.

app.use(passport.session()); // Middleware para sessões do Passport.

passport.serializeUser(function (user, done) {
  console.log('Serializando usuário:', user); // Loga o processo de serialização do usuário.

  done(null, user.id_usuario); // Completa o processo de serialização do usuário.
});
passport.deserializeUser(function (id, done) {
  console.log('Deserializando usuário com id:', id); // Loga o processo de desserialização do usuário.

  var sql = "SELECT * FROM cad_usuario WHERE id_usuario = ?"; // Consulta SQL para buscar o usuário no banco de dados.

  conexao.query(sql, [id], function (error, results) {
    if (error) {
      return done(error); // Se ocorrer um erro, retorna o erro.
    }

    var user = results[0]; // Obtém o usuário a partir dos resultados da consulta.

    done(null, user); // Completa o processo de desserialização do usuário.
  });
});
passport.use(new LocalStrategy({
  usernameField: 'email',
  // Define o campo do formulário utilizado para o email.
  passwordField: 'password' // Define o campo do formulário utilizado para a senha.

}, function (email, password, done) {
  var sql = "SELECT * FROM cad_usuario WHERE `e-mail` = ? AND senha = ?"; // Consulta SQL para buscar o usuário no banco de dados com base no email e senha.

  conexao.query(sql, [email, password], function (error, results) {
    if (error) {
      return done(error); // Se ocorrer um erro, retorna o erro.
    }

    var user = results[0]; // Obtém o usuário a partir dos resultados da consulta.

    if (!user) {
      return done(null, false, {
        message: 'Email ou senha incorretos'
      }); // Se o usuário não for encontrado, retorna falso e uma mensagem de erro.
    }

    return done(null, user); // Retorna o usuário encontrado.
  });
}));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // Se o usuário estiver autenticado, passa para o próximo middleware.
  }

  console.log('Usuário não autenticado'); // Loga uma mensagem informando que o usuário não está autenticado.

  res.redirect('/'); // Redireciona para a página inicial.
}

app.use('/css', express["static"](path.join(__dirname, 'css'))); // Middleware para servir arquivos estáticos CSS.

app.use('/js', express["static"](path.join(__dirname, 'js'))); // Middleware para servir arquivos estáticos JavaScript.

app.use('/images', express["static"](path.join(__dirname, 'images'))); //app.get('/', function (req, res) {
//  res.render('index', { messages: req.flash('error') });
//});
//Nova rota para nova página incial

app.get("/", function (req, res) {
  res.render("index"); // Renderiza a nova página inicial primeiro
}); //Rota para atiga página index renomeda

app.get('/index_Op-Li', function (req, res) {
  res.render('index_Op-Li', {
    messages: req.flash('error')
  });
});
app.get('/paginadecadastro', function (req, res) {
  res.render('paginadecadastro'); // Rota para renderizar a página de cadastro.
}); // Rota para exibir a página "Esqueceu a senha"

app.get('/esqueceusenha', function (req, res) {
  res.render('esqueceusenha'); // Renderiza a página "Esqueceu a senha"
}); // Aplicando o middleware isLoggedIn para proteger a rota '/paginalogada'

app.get('/paginalogada', isLoggedIn, function (req, res) {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate'); // Define cabeçalhos de controle de cache.

  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  console.log('Usuário autenticado:', req.user); // Loga o usuário autenticado.
  // Verifica se o usario e admin

  if (req.user.id_usuario >= 0 && req.user.id_usuario <= 5) {
    // Query para receber
    var sql = "SELECT \n                cp.id_ocorrencia,\n                cp.id_usuario,\n                cp.tipo_da_ocorrencia,\n                cp.end_ocorrencia,\n                cp.bairro,\n                cp.descricao_da_ocorrencia,\n                cp.foto_da_ocorrencia,\n                cp.status_da_ocorrencia,\n                cs.descricao_solucao,\n                cs.foto_da_solucao\n            FROM \n                cad_problema cp\n            LEFT JOIN \n                cad_solucao cs ON cp.id_ocorrencia = cs.id_ocorrencia"; // Executing the query

    conexao.query(sql, function (error, results) {
      if (error) {
        console.error('Error retrieving data from cad_problema table:', error);
        return res.status(500).send('Erro ao recuperar dados da tabela cad_problema.');
      }

      console.log(results); // Registrando os resultados recuperados para verificar se foram recuperados com sucesso
      // Renderizando a página 'paginaadm' com dados do usuário e problemas recuperados

      res.render('paginaadm', {
        user: req.user,
        problemas: results
      });
    });
  } else {
    // If the user is not an admin, render the 'paginalogada' page
    var _sql = "\n    SELECT \n        cp.id_ocorrencia,\n        cp.id_usuario,\n        cp.tipo_da_ocorrencia,\n        cp.end_ocorrencia,\n        cp.bairro,\n        cp.descricao_da_ocorrencia,\n        cp.foto_da_ocorrencia,\n        cp.status_da_ocorrencia,\n        cs.descricao_solucao,\n        cs.foto_da_solucao\n    FROM \n        cad_problema cp\n    LEFT JOIN \n        cad_solucao cs ON cp.id_ocorrencia = cs.id_ocorrencia"; // Executing the query

    conexao.query(_sql, function (error, results) {
      if (error) {
        console.error('Error retrieving data from cad_problema table:', error);
        return res.status(500).send('Erro ao recuperar dados da tabela cad_problema.'); //mensagem = "❌ Não foi possível acessar o bando de dados. <h6>Erro ao recuperar dados da tabela cad_problema. <br> Por favor, contacte-nos para obter assistência.</h6>";
      }

      console.log(results); // Logging the retrieved results to check if it's retrieved successfully
      // Rendering the 'paginalogada' page with user data and retrieved problems

      res.render('paginalogada', {
        user: req.user,
        problemas: results
      });
    });
  }
});
app.post('/cadastro', function (req, res) {
  var _req$body = req.body,
      nome = _req$body.nome,
      telefone = _req$body.telefone,
      email = _req$body.email,
      senha = _req$body.senha; // ** Validação: Bloquear envios com campos vazios antes de continuar

  if (!nome || !telefone || !email || !senha) {
    return res.status(400).render('paginadecadastro', {
      error: 'Todos os campos precisam ser preenchidos 222.'
    });
  } // Verifica se o email já está cadastrado


  var sqlCheckEmail = "SELECT * FROM cad_usuario WHERE `e-mail` = ?";
  conexao.query(sqlCheckEmail, [email], function (error, results) {
    if (error) {
      console.error('Erro ao verificar email:', error);
      return res.status(500).send('Erro ao cadastrar usuário.');
    }

    if (results.length > 0) {
      // Se o email já existe, retorna uma mensagem de erro
      // return res.render('paginadecadastro', { message: 'E-mail já cadastrado.' });
      return res.status(401).render('paginadecadastro', {
        error: 'E-mail já cadastrado.'
      });
    } // Se o email não existe, procede com o cadastro


    var sqlInsertUser = "INSERT INTO cad_usuario (nome, telefone, `e-mail`, senha) VALUES (?, ?, ?, ?)";
    conexao.query(sqlInsertUser, [nome, telefone, email, senha], function (error, results) {
      if (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).send('Erro ao cadastrar usuário.');
      }

      console.log('Usuário cadastrado com sucesso:', results); // Anteriormente: Após o cadastro bem-sucedido, redireciona para a página de login
      // res.redirect('index_Op-Li');
      // Renderiza a mesma página, mas com a flag indicando sucesso
      // Uma flag (mostrarAviso) é uma variável booleana (true ou false) usada para indicar uma condição ou ativar/desativar um comportamento.

      /* Atualmente: Após o cadastro bem-sucedido, uma flag(mostrarAviso: true)
      indica o sucesso, ou não, da operação. Se mostrarAviso for true, o aviso será
      exibido. Se for false, o aviso não será exibido. Com mostrarAviso sendo true,
      a função mostrarPopup mostra o aviso, e, posteriormente, direciona à página de
      login */

      res.render('paginadecadastro', {
        mostrarAviso: true
      });
    });
  });
});
app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).render('index_Op-Li', {
        error: 'E-mail ou senha incorretos. Tente novamente.'
      });
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }

      return res.redirect('/paginalogada');
    });
  })(req, res, next);
});
app.post('/logout', function (req, res) {
  req.logout(function (err) {
    // Efetua o logout do usuário.
    if (err) {
      console.error('Erro ao desconectar usuário:', err); // Se ocorrer um erro, loga o erro.

      return next(err); // Passa o erro para o próximo middleware.
    }

    req.session.destroy(); // Destroi a sessão do usuário.

    console.log('Usuário desconectado'); // Loga uma mensagem informando que o usuário foi desconectado.

    res.redirect('/'); // Redireciona para a página inicial.
  });
}); // Aplicando o middleware isLoggedIn para proteger a rota '/enviar-formulario'
// Função para lidar com o envio do formulário de ocorrência

app.post('/enviar-formulario', isLoggedIn, upload.fields([{
  name: 'foto_da_ocorrencia',
  maxCount: 1
}]), function _callee(req, res) {
  var tipoOcorrencia, end_ocorrencia, bairro, cep, descricao_da_ocorrencia, mensagem, sucesso, _ref, _ref2, fotoDaOcorrenciaURL, sqlInsertOcorrencia, values;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          tipoOcorrencia = req.body.tipo_da_ocorrencia;
          end_ocorrencia = req.body.end_ocorrencia;
          bairro = req.body.bairro;
          cep = req.body.cep;
          descricao_da_ocorrencia = req.body.descricao_da_ocorrencia;
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(Promise.all([uploadImage(req.files['foto_da_ocorrencia'][0])]));

        case 8:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          fotoDaOcorrenciaURL = _ref2[0];
          // Agora você pode salvar os URLs das imagens no banco de dados ou usá-los diretamente
          // Exemplo de como salvar os URLs no banco de dados:
          // Salva ocorrência no banco de dados
          sqlInsertOcorrencia = "INSERT INTO cad_problema (id_usuario, end_ocorrencia, bairro,cep, tipo_da_ocorrencia, descricao_da_ocorrencia, foto_da_ocorrencia, status_da_ocorrencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
          values = [req.user.id_usuario, end_ocorrencia, bairro, cep, tipoOcorrencia, descricao_da_ocorrencia, fotoDaOcorrenciaURL, 1];
          conexao.query(sqlInsertOcorrencia, values, function (error, results) {
            if (error) {
              console.error('Erro ao inserir ocorrência:', error);
              mensagem = "❌ Erro ao enviar ocorrência. <h6>Por favor, contacte-nos para obter assistência.</h6>";
              sucesso = false;
              return res.render("paginalogada", {
                mensagem: mensagem,
                sucesso: sucesso
              }); // Renderiza página de mensagem
              //return res.status(500).send('Erro ao enviar ocorrência.');
            }

            console.log('Ocorrência inserida com sucesso:', results);
            mensagem = "✅ Ocorrência cadastrada com sucesso!";
            sucesso = true;
            res.render("paginalogada", {
              mensagem: mensagem,
              sucesso: sucesso
            }); // Exibe mensagem antes de redirecionar
            //res.redirect(req.get('referer'));
          });
          _context.next = 22;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](5);
          console.error('Erro ao fazer upload de imagens:', _context.t0);
          mensagem = "❌ Erro ao fazer upload de imagens.";
          sucesso = false;
          res.render("paginalogada", {
            mensagem: mensagem,
            sucesso: sucesso
          }); //res.status(500).send('Erro ao fazer upload de imagens.');

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 16]]);
}); // Função para fazer upload de uma imagem para o armazenamento na nuvem

function uploadImage(file) {
  var bucket, fileName, fileUpload;
  return regeneratorRuntime.async(function uploadImage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          bucket = admin.storage().bucket();
          fileName = "".concat(Date.now(), "-").concat(file.originalname);
          fileUpload = bucket.file(fileName);
          _context2.next = 5;
          return regeneratorRuntime.awrap(fileUpload.save(file.buffer, {
            metadata: {
              contentType: file.mimetype
            }
          }));

        case 5:
          return _context2.abrupt("return", "https://storage.googleapis.com/".concat(bucket.name, "/").concat(fileName));

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
} // app.post('/enviar-formulario', isLoggedIn, upload.fields([
//   { name: 'foto_da_ocorrencia', maxCount: 1 },
//   { name: 'foto_mapa_da_localizacao', maxCount: 1 }
// ]), function (req, res) {
//   const gravidade = req.body.gravidade_da_ocorrencia; // Obtém a gravidade da ocorrência do formulário.
//   const end_ocorrencia = req.body.end_ocorrencia; // Obtém o endereço da ocorrência do formulário.
//   const bairro = req.body.bairro; // Obtém o bairro da ocorrência do formulário.
//   const cep = req.body.cep;// Obtém o cep da ocorrência do formulário.
//   const descricao_da_ocorrencia = req.body.descricao_da_ocorrencia; // Obtém a descrição da ocorrência do formulário.
//   let foto_da_ocorrencia = ''; // Inicializa a variável para armazenar a foto da ocorrência.
//   let foto_mapa_da_localizacao = ''; // Inicializa a variável para armazenar a foto do mapa da localização.
//   // Verifica se o campo de upload 'foto_da_ocorrencia' foi preenchido
//   if (req.files['foto_da_ocorrencia'] && req.files['foto_da_ocorrencia'].length > 0) {
//     foto_da_ocorrencia = req.files['foto_da_ocorrencia'][0].path; // Obtém o caminho da foto da ocorrência.
//   }
//   // Verifica se o campo de upload 'foto_mapa_da_localizacao' foi preenchido
//   if (req.files['foto_mapa_da_localizacao'] && req.files['foto_mapa_da_localizacao'].length > 0) {
//     foto_mapa_da_localizacao = req.files['foto_mapa_da_localizacao'][0].path; // Obtém o caminho da foto do mapa da localização.
//   }
//   if (!gravidade || !end_ocorrencia || !bairro || !descricao_da_ocorrencia) { // Verifica se todos os campos obrigatórios foram preenchidos.
//     return res.status(400).send('Por favor, preencha todos os campos.'); // Retorna um status 400 e uma mensagem de erro caso algum campo esteja em branco.
//   }
//   const status = 1; // Define o status da ocorrência como 1 (ativo).
//   const id_usuario = req.user.id_usuario; // Obtém o ID do usuário autenticado.
//   const sqlInsertOcorrencia = `INSERT INTO cad_problema (id_usuario, end_ocorrencia, bairro,cep, gravidade_da_ocorrencia, descricao_da_ocorrencia, foto_da_ocorrencia, foto_mapa_da_localizacao, status_da_ocorrencia) VALUES (?, ?, ?, ?, ?,?, ?, ?, ?)`; // Consulta SQL para inserir uma nova ocorrência.
//   const values = [id_usuario, end_ocorrencia, bairro, cep, gravidade, descricao_da_ocorrencia, foto_da_ocorrencia, foto_mapa_da_localizacao, status]; // Valores a serem inseridos na consulta SQL.
//   conexao.query(sqlInsertOcorrencia, values, function (error, results) {
//     if (error) {
//       console.error('Erro ao inserir ocorrência:', error); // Se ocorrer um erro, loga o erro.
//       return res.status(500).send('Erro ao enviar ocorrência'); // Retorna um status 500 e uma mensagem de erro.
//     }
//     console.log('Ocorrência inserida com sucesso:', results); // Loga uma mensagem informando que a ocorrência foi inserida com sucesso.
//     res.redirect(req.get('referer'));
//   });
// });
// exibir imagens


app.get('/exibir-imagem', function _callee2(req, res) {
  var caminho, bucket, file, _ref3, _ref4, url;

  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          caminho = req.query.caminho;

          if (!caminho) {
            _context3.next = 19;
            break;
          }

          _context3.prev = 2;
          // Recupere o URL da imagem do Firebase Storage com base no caminho
          bucket = admin.storage().bucket();
          file = bucket.file(caminho);
          _context3.next = 7;
          return regeneratorRuntime.awrap(file.getSignedUrl({
            action: 'read',
            expires: '01-01-2025' // Defina a data de expiração do URL, se necessário

          }));

        case 7:
          _ref3 = _context3.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          url = _ref4[0];
          // Envie o URL da imagem para o cliente
          res.send(url);
          _context3.next = 17;
          break;

        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](2);
          console.error('Erro ao recuperar o URL da imagem:', _context3.t0);
          res.status(500).send('Erro ao recuperar o URL da imagem.');

        case 17:
          _context3.next = 20;
          break;

        case 19:
          res.status(400).send('A URI da imagem não foi fornecida.');

        case 20:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[2, 13]]);
}); //Exibir informações no rodapé
//app.get('/', (req, res) => {
//  fs.readFile('rodape.txt', 'utf8', (err, data) => {
//    if (err) {
//      return res.status(500).send('Erro ao ler o arquivo');
//    }
//    res.render('index', { content: data });
//  });
//});
/// Endpoint para enviar a solução

app.post('/enviar-solucao', isLoggedIn, upload.single('foto_da_solucao'), function _callee3(req, res) {
  var _req$body2, id_ocorrencia, descricao_solucao, foto_da_solucao, checkIdQuery;

  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, id_ocorrencia = _req$body2.id_ocorrencia, descricao_solucao = _req$body2.descricao_solucao;
          foto_da_solucao = ' '; // Inicializa como uma string vazia
          // Verifica se a foto_da_solucao foi enviadat

          if (!req.file) {
            _context4.next = 13;
            break;
          }

          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(uploadImage(req.file));

        case 6:
          foto_da_solucao = _context4.sent;
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](3);
          console.error('Erro ao fazer upload da foto da solução:', _context4.t0);
          return _context4.abrupt("return", res.status(500).send('Erro ao enviar a solução.'));

        case 13:
          if (!(!id_ocorrencia || !descricao_solucao)) {
            _context4.next = 15;
            break;
          }

          return _context4.abrupt("return", res.status(400).send('Por favor, preencha todos os campos obrigatórios.'));

        case 15:
          // Restante do código para salvar a solução no banco de dados...
          // Verifica se o ID da ocorrência existe na tabela cad_problema
          checkIdQuery = 'SELECT * FROM cad_problema WHERE id_ocorrencia = ?';
          conexao.query(checkIdQuery, [id_ocorrencia], function (error, results) {
            if (error) {
              console.error('Erro ao verificar ID da ocorrência:', error);
              return res.status(500).send('Erro ao verificar ID da ocorrência.');
            } // Se o ID da ocorrência não existir na tabela cad_problema, exibe uma mensagem de erro


            if (results.length === 0) {
              return res.status(404).send('O ID da ocorrência não existe.');
            } // Query para atualizar o status para 2 (resolvido) na tabela cad_problema


            var updateStatusQuery = 'UPDATE cad_problema SET status_da_ocorrencia = 2 WHERE id_ocorrencia = ?';
            conexao.query(updateStatusQuery, [id_ocorrencia], function (error, results) {
              if (error) {
                console.error('Erro ao atualizar o status da ocorrência:', error);
                return res.status(500).send('Erro ao atualizar o status da ocorrência.');
              }

              console.log('Status da ocorrência atualizado com sucesso:', results);
            }); // Verifica se já existe uma solução para essa ocorrência na tabela cad_solucao

            var checkSolutionQuery = 'SELECT * FROM cad_solucao WHERE id_ocorrencia = ?';
            conexao.query(checkSolutionQuery, [id_ocorrencia], function (error, results) {
              if (error) {
                console.error('Erro ao verificar solução existente:', error);
                return res.status(500).send('Erro ao verificar solução existente.');
              } // Se já existir uma solução para essa ocorrência, substitui a solução existente pela nova


              if (results.length > 0) {
                var id_usuario = req.user.id_usuario; // Obtém o ID do usuário autenticado.

                var updateSolutionQuery = "UPDATE cad_solucao SET id_usuario = ?, descricao_solucao = ?, foto_da_solucao = ? WHERE id_ocorrencia = ?";
                var values = [id_usuario, descricao_solucao, foto_da_solucao, id_ocorrencia];
                conexao.query(updateSolutionQuery, values, function (error, results) {
                  if (error) {
                    console.error('Erro ao atualizar solução:', error);
                    return res.status(500).send('Erro ao atualizar solução: ' + error.message); // Enviando mensagem de erro específica
                  }

                  console.log('Solução atualizada com sucesso:', results);
                  res.redirect(req.get('referer')); //Redireciona para a página inicial após a atualização bem-sucedida
                });
              } else {
                // Se não existir uma solução para essa ocorrência, insere uma nova solução
                var _id_usuario = req.user.id_usuario; // Obtém o ID do usuário autenticado.

                var insertSolutionQuery = "INSERT INTO cad_solucao (id_ocorrencia,id_usuario, descricao_solucao, foto_da_solucao) VALUES (?, ?, ?, ?)";
                var _values = [id_ocorrencia, _id_usuario, descricao_solucao, foto_da_solucao];
                conexao.query(insertSolutionQuery, _values, function (error, results) {
                  if (error) {
                    console.error('Erro ao enviar solução:', error);
                    return res.status(500).send('Erro ao enviar solução: ' + error.message); // Enviando mensagem de erro específica
                  }

                  console.log('Solução enviada com sucesso:', results);
                  res.redirect(req.get('referer'));
                });
              }
            });
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 9]]);
}); // app.post('/remover-ocorrencia', isLoggedIn, function (req, res) {
//   const idOcorrencia = req.body.id_ocorrencia;
//   // Excluir os registros relacionados na tabela cad_solucao
//   const deleteSolucaoQuery = 'DELETE FROM cad_solucao WHERE id_ocorrencia = ?';
//   conexao.query(deleteSolucaoQuery, [idOcorrencia], function (error, results) {
//     if (error) {
//       console.error('Erro ao remover as soluções relacionadas:', error);
//       return res.status(500).send('Erro ao remover as soluções relacionadas');
//     }
//     console.log('Soluções relacionadas removidas com sucesso:', results);
//     // Remover a ocorrência
//     const deleteQuery = 'DELETE FROM cad_problema WHERE id_ocorrencia = ?';
//     conexao.query(deleteQuery, [idOcorrencia], function (error, results) {
//       if (error) {
//         console.error('Erro ao remover ocorrência:', error);
//         return res.status(500).send('Erro ao remover ocorrência');
//       }
//       console.log('Ocorrência removida com sucesso:', results);
//       res.sendStatus(200);
//     });
//   });
// });

app.post('/esqueceusenha', function (req, res) {
  var email = req.body.email; // Obtém o e-mail fornecido pelo usuário no formulário de recuperação de senha.
  // Consulta SQL para buscar a senha correspondente ao e-mail no banco de dados

  var sql = "SELECT senha FROM cad_usuario WHERE `e-mail` = ?";
  conexao.query(sql, [email], function (error, results) {
    if (error) {
      console.error('Erro ao buscar a senha:', error);
      return res.status(500).send('Erro ao buscar a senha.');
    }

    if (results.length === 0) {
      // Se nenhum resultado for retornado, significa que o e-mail não está cadastrado
      //return res.status(404).send('E-mail não encontrado.');
      //return res.status(404).render('esqueceusenha', { error: '! E-mail não encontrado.' });
      return res.status(404).render('esqueceusenha', {
        errorMessage: '! E-mail não encontrado.'
      });
    }

    var senha = results[0].senha; // Obtém a senha do primeiro resultado
    // Configuração do transporte para enviar o e-mail usando um serviço SMTP

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tapaburacosite@gmail.com',
        // Substitua pelo seu e-mail
        pass: 'fexg pizo edyt zpqe	' // Substitua pela senha de aplicativo gerada

      }
    }); // Configuração do e-mail a ser enviado

    var mailOptions = {
      from: 'tapaburacosite@gmail.com',
      // Seu endereço de e-mail
      to: email,
      // Endereço de e-mail do destinatário (o usuário que está solicitando a recuperação de senha)
      subject: 'Recuperação de Senha',
      // Assunto do e-mail
      html: "<p>Ol\xE1, voc\xEA solicitou a recupera\xE7\xE3o de senha. Sua senha \xE9: ".concat(senha, "</p>") // Corpo do e-mail (pode ser HTML)

    }; // Envio do e-mail de recuperação de senha
    //  transporter.sendMail(mailOptions, function (error, info) {
    //    if (error) {
    //      console.log(error); // Em caso de erro
    //      res.status(500).send('Erro ao enviar e-mail de recuperação de senha.'); // Retorna um status 500 em caso de erro no envio do e-mail
    //    } else {
    //      console.log('E-mail de recuperação de senha enviado com sucesso: ' + info.response); // Se o e-mail for enviado com sucesso
    //      res.status(200).send('E-mail de recuperação de senha enviado com sucesso!'); // Retorna um status 200 em caso de sucesso no envio do e-mail
    //    }
    //  });
    // Código para enviar as mensagens geradas pelo back-end para o front-end, permitindo que o script de popup exiba avisos na recuperação de senha

    transporter.sendMail(mailOptions, function (error, info) {
      var mensagem, sucesso;

      if (error) {
        console.error("Erro ao enviar e-mail:", error);
        mensagem = "❌ Não foi possível enviar e-mail de recuperação de senha. <h6>Por favor, contacte-nos para obter assistência.</h6>";
        sucesso = false;
      } else {
        console.log("E-mail enviado com sucesso: " + info.response);
        mensagem = "✅ E-mail de recuperação de senha enviado com sucesso!";
        sucesso = true;
      }

      res.render("esqueceusenha", {
        mensagem: mensagem,
        sucesso: sucesso
      });
    });
  });
});
app.listen(8082, function () {
  console.log('Servidor iniciado na porta 8082!'); // Inicia o servidor na porta 8082 e mostra uma mensagem informando que o servidor foi iniciado com sucesso.
});
module.exports = app;