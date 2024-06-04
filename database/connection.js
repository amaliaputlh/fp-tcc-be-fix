const mysql = require('mysql');

const db = mysql.createConnection({
    host: '35.223.44.193',
    user: 'root',
    password: '109113',
    database: 'db-prak-tcc'
});

// Membuat koneksi ke database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Terhubung ke database MySQL');
});

module.exports = db;
