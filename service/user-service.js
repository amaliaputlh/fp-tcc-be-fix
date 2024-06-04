const express = require('express');
const db = require('../database/connection');
const jwt = require('jsonwebtoken'); // Import library JWT

const router = express.Router();

// Rute untuk registrasi
router.post('/register', (req, res) => {
  const { username, fullname, password } = req.body;
  const sql = 'INSERT INTO users (username, fullname, password) VALUES (?, ?, ?)';
  
  db.query(sql, [username, fullname, password], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Terjadi kesalahan server' });
    }
    res.send({ message: 'Berhasil menambah user' });
  });
});

router.get('/', (req, res) => {
    const { username, fullname, password } = req.body;
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send({ error: 'Terjadi kesalahan server' });
      }
      res.send(result);
    });
  });

  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        res.status(500).send({ error: 'Terjadi kesalahan server' });
      } else {
        res.send({ message: 'Data user berhasil dihapus' });
      }
    });
});

  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { username, fullname, password } = req.body;
    const sql = 'UPDATE users SET username = ?, fullname = ?, password = ? WHERE id = ?';
    db.query(sql, [username, fullname, password, id], (err, result) => {
      if (err) {
        res.status(500).send({ error: 'Terjadi kesalahan server' });
      } else {
        res.send({ message: 'Data user berhasil diupdate' });
      }
    });
});

// Rute untuk login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    
    db.query(sql, [username], async (err, result) => {
      if (err) {
        return res.status(500).send({ error: 'Terjadi kesalahan server' });
      }
      
      if (result.length === 0) {
        return res.status(400).send({ error: 'User tidak ditemukan' });
      }
  
      const user = result[0];
      
      // Lakukan proses autentikasi
      if (user.password !== password) {
        return res.status(400).send({ error: 'Password salah' });
      }
  
      // Jika autentikasi berhasil, buat token JWT
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
      
      // Kirim token sebagai respon
      res.send({ token });
    });
  });
  
  module.exports = router;