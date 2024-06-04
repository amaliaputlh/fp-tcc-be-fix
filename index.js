const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080; // Port server
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Mengimpor route untuk masing-masing service
const userRoute = require('./service/user-service');
const barangRoute = require('./service/barang-service');

// Mengatur rute untuk masing-masing service
app.use('/user', userRoute);
app.use('/barang', barangRoute);

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
