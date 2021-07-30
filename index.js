// Comfiguracón básica de express
const express = require('express');
var cors = require('cors');
const { dbConection } = require('./database/config');

require('dotenv').config();

//console.log(process.env);  // Permite ver las variables de entorno

// Crear el servidor de expres
const app = express();

// Conexcion a la base de datos mongo
dbConection();

// Configuracion del corrs
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Directorio público
app.use(express.static('public'));

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
