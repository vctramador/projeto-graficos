const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');


app.use(cors());

const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root@localhost',
  password: '123',
  database: 'usuarios1',
});

app.use(express.json());

app.post('/registro', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const usuario = {
      name,
      email,
      password
    };

    conn.query("INSERT INTO usuarios1 SET ?", usuario, (err, result) => {
      if (err) {
        console.error('Erro ao salvar usuário:', err);
        res.status(500).send({ message: 'Erro ao criar usuário' });
        return;
      }
      
      res.send(usuario);
    });
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    res.status(500).send({ message: 'Erro ao criar usuário' });
  }
});

app.listen(3501, () => {
  console.log('Servidor rodando na porta 3501');
});
