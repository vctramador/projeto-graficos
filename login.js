const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123', // Se você não definiu uma senha para o root, deixe isso vazio
  database: 'crud-finanças'
});

// Conectar ao banco de dados
connection.connect(error => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  console.log('Conectado ao banco de dados com sucesso!');
});

// Rota para processar o login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  const query = 'SELECT * FROM usuarios WHERE email = ?';

  connection.query(query, [email], (error, results) => {
    if (error) {
      return res.status(500).send('Erro ao verificar o email no banco de dados');
    }
    if (results.length > 0) {
      // Usuário encontrado, agora você pode verificar a senha
      // (não esqueça de usar hash e sal para armazenar senhas de forma segura)
      if (senha === results[0].senha) {
        // Senha correta, redirecione para a página principal
        res.redirect('/painel.html');
      } else {
        // Senha incorreta, redirecione de volta para a página de login
        res.send('Email ou senha incorretos');
      }
    } else {
      // Usuário não encontrado
      res.send('Email ou senha incorretos');
    }
  });
});

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
