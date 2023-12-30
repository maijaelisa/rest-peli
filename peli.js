require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Luo yhteyspooli MySQL-tietokantaan
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// localhost:3000 sanoma

app.get('/', (req, res) => {
  res.send('Tervetuloa peliin! Käytä /questions reittiä nähdäksesi kysymykset.');
});


// REST-endpointit


app.get('/questions', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM kysymykset');
    res.json(results);
  } catch (err) {
    console.error('Virhe tietokantakyselyssä: ' + err.message);
    res.status(500).json({ error: 'Tietokantavirhe' });
  }
});

app.post('/questions', async (req, res) => {
  const { text, answer } = req.body;
  const sql = 'INSERT INTO kysymykset (kysymysteksti, vastaus) VALUES (?, ?)';
  const values = [text, answer];

  try {
    await pool.query(sql, values);
    res.json({ message: 'Kysymys lisätty onnistuneesti' });
  } catch (err) {
    console.error('Virhe tietokantakyselyssä: ' + err.message);
    res.status(500).json({ error: 'Tietokantavirhe' });
  }
});



// Käynnistä Express-sovellus
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
